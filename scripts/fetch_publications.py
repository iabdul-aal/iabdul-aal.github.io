#!/usr/bin/env python3
"""Fetch public works from ORCID, enrich with Crossref metadata, and generate data/publications.json."""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

import requests

from config_helper import clean_html_text, get_email, get_orcid_id, infer_preprint_info

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

ORCID_ID = get_orcid_id()
ORCID_WORKS_URL = f"https://pub.orcid.org/v3.0/{ORCID_ID}/works"
CROSSREF_BASE_URL = "https://api.crossref.org/works"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "publications.json"

GENERIC_VENUES = {"", "working paper", "unspecified venue", "posted content"}


def nested_value(data: Any, *keys: str) -> str:
    current = data
    for key in keys:
        if not isinstance(current, dict):
            return ""
        current = current.get(key)

    if current is None:
        return ""

    return str(current).strip()


def extract_doi(external_ids: Any) -> str:
    if not isinstance(external_ids, dict):
        return ""

    for item in external_ids.get("external-id", []):
        ext_type = str(item.get("external-id-type", "")).lower().strip()
        if ext_type == "doi":
            return str(item.get("external-id-value", "")).strip()

    return ""


def extract_external_url(external_ids: Any) -> str:
    if not isinstance(external_ids, dict):
        return ""

    for item in external_ids.get("external-id", []):
        value = nested_value(item, "external-id-url", "value")
        if value:
            return value

    return ""


def pick_best_summary(group: dict[str, Any]) -> dict[str, Any]:
    summaries = group.get("work-summary", [])
    if not summaries:
        return {}

    def key_fn(summary: dict[str, Any]) -> int:
        raw = nested_value(summary, "last-modified-date", "value")
        return int(raw) if raw.isdigit() else 0

    return max(summaries, key=key_fn)


def _format_crossref_date(date_parts: Any) -> tuple[str, str]:
    """Return (year, date_iso) from Crossref `date-parts`."""
    if not isinstance(date_parts, list) or not date_parts or not isinstance(date_parts[0], list):
        return "", ""
    parts = date_parts[0]
    if not parts:
        return "", ""
    year = str(parts[0]).strip()
    if len(parts) >= 3:
        return year, f"{int(parts[0]):04d}-{int(parts[1]):02d}-{int(parts[2]):02d}"
    if len(parts) == 2:
        return year, f"{int(parts[0]):04d}-{int(parts[1]):02d}"
    return year, year


def fetch_crossref_metadata(doi: str) -> dict[str, Any]:
    """Query Crossref for authoritative bibliographic metadata. Returns empty dict on error."""
    if not doi:
        return {}
    lower_doi = doi.lower().strip()
    if lower_doi.startswith(("10.48550/arxiv.", "10.5281/zenodo.", "10.57967/hf/")):
        return {}

    email = get_email()
    try:
        response = requests.get(
            f"{CROSSREF_BASE_URL}/{doi}",
            headers={
                "Accept": "application/json",
                "User-Agent": f"orcid-publications-sync/1.1 (mailto:{email})",
            },
            timeout=15,
        )
        if response.status_code != 200:
            return {}
        payload = response.json()
        msg = payload.get("message", {})
        if not isinstance(msg, dict):
            return {}
    except Exception as exc:  # noqa: BLE001
        print(f"  [warn] Crossref lookup failed for {doi}: {exc}")
        return {}

    result: dict[str, Any] = {}

    titles = msg.get("title") or []
    if isinstance(titles, list) and titles:
        result["title"] = clean_html_text(str(titles[0]), replace_em_dash=True)

    authors: list[str] = []
    for author in msg.get("author", []):
        if not isinstance(author, dict):
            continue
        given = str(author.get("given", "")).strip()
        family = str(author.get("family", "")).strip()
        full = " ".join(part for part in (given, family) if part).strip()
        if full:
            authors.append(full)
    if authors:
        result["authors"] = authors

    date_parts = (
        msg.get("issued", {}).get("date-parts")
        or msg.get("published-print", {}).get("date-parts")
        or msg.get("published-online", {}).get("date-parts")
        or msg.get("created", {}).get("date-parts")
    )
    year, date_iso = _format_crossref_date(date_parts)
    if year:
        result["year"] = year
    if date_iso:
        result["date"] = date_iso

    container = msg.get("container-title") or []
    if isinstance(container, list) and container and str(container[0]).strip():
        result["venue"] = clean_html_text(str(container[0]), replace_em_dash=True)
    elif lower_doi.startswith("10.20944/preprints"):
        result["venue"] = "Preprints.org"
    else:
        institutions = msg.get("institution") or []
        if isinstance(institutions, list) and institutions and isinstance(institutions[0], dict):
            inst_name = str(institutions[0].get("name", "")).strip()
            if inst_name:
                result["venue"] = clean_html_text(inst_name, replace_em_dash=True)

    if msg.get("volume"):
        result["volume"] = str(msg["volume"]).strip()
    if msg.get("issue"):
        result["issue"] = str(msg["issue"]).strip()
    if msg.get("page"):
        result["pages"] = str(msg["page"]).strip()

    cr_type = str(msg.get("type", "")).lower().strip()
    cr_subtype = str(msg.get("subtype", "")).lower().strip()
    if cr_type == "posted-content" or cr_subtype == "preprint":
        result["type"] = "preprint"

    for link_item in msg.get("link") or []:
        if not isinstance(link_item, dict):
            continue
        ct = str(link_item.get("content-type", "")).lower()
        link_url = str(link_item.get("URL", "")).strip()
        if link_url and ("pdf" in ct or link_url.lower().endswith(".pdf")):
            result["pdfUrl"] = link_url
            break

    preprint_info = infer_preprint_info(
        {
            "doi": doi,
            "url": str(msg.get("URL", "")).strip(),
            "venue": result.get("venue", ""),
            "type": result.get("type", ""),
        }
    )
    if preprint_info["is_preprint"]:
        result["type"] = "preprint"
        if not result.get("venue") or result["venue"].lower().strip() in GENERIC_VENUES:
            result["venue"] = preprint_info["server"]

    return result


def normalize_publication(group: dict[str, Any]) -> dict[str, Any]:
    summary = pick_best_summary(group)

    title = clean_html_text(nested_value(summary, "title", "title", "value"), replace_em_dash=True)
    venue = clean_html_text(nested_value(summary, "journal-title", "value"), replace_em_dash=True)
    work_type = str(summary.get("type", "")).lower().strip()
    if not venue:
        readable_type = work_type.replace("-", " ").strip()
        venue = readable_type.title() if readable_type else "Unspecified venue"

    year = nested_value(summary, "publication-date", "year", "value")
    month = nested_value(summary, "publication-date", "month", "value")
    day = nested_value(summary, "publication-date", "day", "value")
    date_str = ""
    if year and month and day:
        date_str = f"{year}-{int(month):02d}-{int(day):02d}"
    elif year and month:
        date_str = f"{year}-{int(month):02d}"

    doi = extract_doi(summary.get("external-ids")) or extract_doi(group.get("external-ids"))

    url = nested_value(summary, "url", "value")
    if not url:
        url = extract_external_url(summary.get("external-ids")) or extract_external_url(group.get("external-ids"))
    if not url and doi:
        url = f"https://doi.org/{doi}"

    record: dict[str, Any] = {
        "title": title or "Untitled",
        "venue": venue,
        "year": year,
        "doi": doi,
        "url": url,
    }
    if date_str:
        record["date"] = date_str

    preprint_info = infer_preprint_info(
        {
            "doi": doi,
            "url": url,
            "venue": venue,
            "type": work_type,
        }
    )
    if preprint_info["is_preprint"]:
        record["type"] = "preprint"
        if not record["venue"] or record["venue"].lower().strip() in GENERIC_VENUES or work_type in ("working-paper", "preprint"):
            record["venue"] = preprint_info["server"]
        if preprint_info["arxiv"]:
            record["arxiv"] = preprint_info["arxiv"]

    return record


def _normalize_entry_fields(pub: dict[str, Any]) -> dict[str, Any]:
    cleaned = dict(pub)
    if "title" in cleaned and cleaned["title"]:
        cleaned["title"] = clean_html_text(str(cleaned["title"]), replace_em_dash=True)
    if "venue" in cleaned and cleaned["venue"]:
        cleaned["venue"] = clean_html_text(str(cleaned["venue"]), replace_em_dash=True)
    if "abstract" in cleaned and cleaned["abstract"]:
        cleaned["abstract"] = clean_html_text(str(cleaned["abstract"]), replace_em_dash=True)
    return cleaned


def _merge_publication(base: dict[str, Any], crossref: dict[str, Any], existing: dict[str, Any] | None) -> dict[str, Any]:
    merged = dict(base)

    # Apply Crossref metadata to fill missing or generic ORCID fields
    if crossref:
        if (not merged.get("title") or merged["title"] == "Untitled") and crossref.get("title"):
            merged["title"] = crossref["title"]
        if crossref.get("authors") and not merged.get("authors"):
            merged["authors"] = crossref["authors"]
        if crossref.get("year") and not merged.get("year"):
            merged["year"] = crossref["year"]
        if crossref.get("date") and not merged.get("date"):
            merged["date"] = crossref["date"]
        if crossref.get("venue") and merged.get("venue", "").lower().strip() in GENERIC_VENUES:
            merged["venue"] = crossref["venue"]
        for opt_key in ("volume", "issue", "pages", "type"):
            if crossref.get(opt_key) and not merged.get(opt_key):
                merged[opt_key] = crossref[opt_key]

    # Preserve curated fields from existing publications.json
    if existing:
        if existing.get("authors") and not merged.get("authors"):
            merged["authors"] = existing["authors"]
        if existing.get("year") and not merged.get("year"):
            merged["year"] = existing["year"]
        if existing.get("date"):
            merged["date"] = existing["date"]
        existing_venue = str(existing.get("venue", "")).strip()
        if existing_venue and existing_venue.lower() not in GENERIC_VENUES:
            if merged.get("venue", "").lower().strip() in GENERIC_VENUES:
                merged["venue"] = existing_venue
        for opt_key in ("arxiv", "volume", "issue", "pages", "abstract", "pdfUrl", "badges", "type"):
            if existing.get(opt_key) and not merged.get(opt_key):
                merged[opt_key] = existing[opt_key]

    final_preprint = infer_preprint_info(merged)
    if final_preprint["is_preprint"]:
        merged["type"] = "preprint"
        if merged.get("venue", "").lower().strip() in GENERIC_VENUES:
            merged["venue"] = final_preprint["server"]
        if final_preprint["arxiv"] and not merged.get("arxiv"):
            merged["arxiv"] = final_preprint["arxiv"]

    return _normalize_entry_fields(merged)


def sort_publications(publications: list[dict[str, Any]]) -> list[dict[str, Any]]:
    def key_fn(item: dict[str, Any]) -> tuple[int, str, str]:
        year = str(item.get("year", "")).strip()
        year_num = int(year) if year.isdigit() else 0
        date_val = str(item.get("date", "")).strip()
        # Sort year desc, date desc (invert string via simple negation not needed if sorted in 2 steps or tuple)
        return (year_num, date_val, "")

    # Sort title ascending first (stable), then date/year descending
    by_title = sorted(publications, key=lambda item: str(item.get("title", "")).lower())
    return sorted(by_title, key=key_fn, reverse=True)


def fetch_works() -> list[dict[str, Any]]:
    response = requests.get(
        ORCID_WORKS_URL,
        headers={
            "Accept": "application/json",
            "User-Agent": "orcid-publications-sync/1.1",
        },
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    return payload.get("group", [])


def main() -> None:
    existing_pubs: list[dict[str, Any]] = []
    existing_by_doi: dict[str, dict[str, Any]] = {}
    existing_by_title: dict[str, dict[str, Any]] = {}

    if OUTPUT_PATH.exists():
        try:
            loaded = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
            if isinstance(loaded, list):
                existing_pubs = [_normalize_entry_fields(p) for p in loaded if isinstance(p, dict)]
                for p in existing_pubs:
                    doi_k = str(p.get("doi", "")).lower().strip()
                    title_k = clean_html_text(str(p.get("title", "")), replace_em_dash=True).casefold()
                    if doi_k:
                        existing_by_doi[doi_k] = p
                    if title_k:
                        existing_by_title[title_k] = p
        except Exception:
            pass

    groups = fetch_works()

    publications: list[dict[str, Any]] = []
    seen_keys: set[str] = set()
    matched_existing_titles: set[str] = set()
    matched_existing_dois: set[str] = set()

    for group in groups:
        publication = normalize_publication(group)
        doi_key = str(publication.get("doi", "")).lower().strip()
        title_key = clean_html_text(str(publication.get("title", "")), replace_em_dash=True).casefold()

        existing = existing_by_doi.get(doi_key) if doi_key else None
        if existing is None and title_key:
            existing = existing_by_title.get(title_key)

        needs_crossref = bool(
            doi_key
            and (
                not (existing and existing.get("authors"))
                or not publication.get("year")
                or publication.get("venue", "").lower().strip() in GENERIC_VENUES
                or publication.get("type") == "preprint"
                or not (existing and existing.get("volume"))
            )
        )
        crossref = fetch_crossref_metadata(publication["doi"]) if needs_crossref else {}
        merged = _merge_publication(publication, crossref, existing)

        dedup_key = doi_key or clean_html_text(str(merged.get("title", ""))).casefold()
        if dedup_key in seen_keys:
            continue
        seen_keys.add(dedup_key)
        if doi_key:
            matched_existing_dois.add(doi_key)
        if title_key:
            matched_existing_titles.add(title_key)
        publications.append(merged)

    # Preserve non-ORCID curated/arXiv publications already present in publications.json
    for existing in existing_pubs:
        doi_key = str(existing.get("doi", "")).lower().strip()
        title_key = clean_html_text(str(existing.get("title", "")), replace_em_dash=True).casefold()
        if (doi_key and doi_key in matched_existing_dois) or (title_key and title_key in matched_existing_titles):
            continue
        dedup_key = doi_key or title_key
        if not dedup_key or dedup_key in seen_keys:
            continue
        seen_keys.add(dedup_key)
        publications.append(_normalize_entry_fields(existing))

    publications = sort_publications(publications)
    OUTPUT_PATH.write_text(json.dumps(publications, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(publications)} publications to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
