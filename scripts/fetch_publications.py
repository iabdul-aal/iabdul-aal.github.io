#!/usr/bin/env python3
"""Fetch public works from ORCID and generate publications.json."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import requests

ORCID_ID = "0009-0004-9300-3936"
ORCID_WORKS_URL = f"https://pub.orcid.org/v3.0/{ORCID_ID}/works"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "publications.json"


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


def normalize_publication(group: dict[str, Any]) -> dict[str, str]:
    summary = pick_best_summary(group)

    title = nested_value(summary, "title", "title", "value")
    venue = nested_value(summary, "journal-title", "value")
    if not venue:
        work_type = str(summary.get("type", "")).replace("-", " ").strip()
        venue = work_type.title() if work_type else "Unspecified venue"

    year = nested_value(summary, "publication-date", "year", "value")
    doi = extract_doi(summary.get("external-ids")) or extract_doi(group.get("external-ids"))

    url = nested_value(summary, "url", "value")
    if not url:
        url = extract_external_url(summary.get("external-ids")) or extract_external_url(group.get("external-ids"))
    if not url and doi:
        url = f"https://doi.org/{doi}"

    return {
        "title": title or "Untitled",
        "venue": venue,
        "year": year,
        "doi": doi,
        "url": url,
    }


def sort_publications(publications: list[dict[str, str]]) -> list[dict[str, str]]:
    def key_fn(item: dict[str, str]) -> tuple[int, str]:
        year = item.get("year", "")
        year_num = int(year) if year.isdigit() else 0
        return (-year_num, item.get("title", "").lower())

    return sorted(publications, key=key_fn)


def fetch_works() -> list[dict[str, Any]]:
    response = requests.get(
        ORCID_WORKS_URL,
        headers={
            "Accept": "application/json",
            "User-Agent": "orcid-publications-sync/1.0",
        },
        timeout=30,
    )
    response.raise_for_status()
    payload = response.json()
    return payload.get("group", [])


def main() -> None:
    groups = fetch_works()

    publications: list[dict[str, str]] = []
    seen: set[tuple[str, str, str]] = set()

    for group in groups:
        publication = normalize_publication(group)
        fingerprint = (
            publication["title"].casefold(),
            publication["year"],
            publication["doi"].casefold(),
        )
        if fingerprint in seen:
            continue
        seen.add(fingerprint)
        publications.append(publication)

    publications = sort_publications(publications)
    OUTPUT_PATH.write_text(json.dumps(publications, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(publications)} publications to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
