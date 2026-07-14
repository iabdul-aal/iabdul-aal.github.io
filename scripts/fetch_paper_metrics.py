#!/usr/bin/env python3
"""
Fetch per-paper citation counts from OpenAlex by DOI or arXiv ID.
Writes paper_metrics.json.
"""

import json
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent.parent
PUBS_FILE = ROOT / "publications.json"
OUT_FILE = ROOT / "paper_metrics.json"

OPENALEX_EMAIL = "islam.abdulaal@example.com"  # polite pool


def openalex_by_doi(doi: str) -> dict | None:
    url = f"https://api.openalex.org/works/https://doi.org/{doi}?mailto={OPENALEX_EMAIL}"
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            return json.loads(r.read())
    except Exception:
        return None


def openalex_by_arxiv(arxiv_id: str) -> dict | None:
    clean = arxiv_id.replace("arXiv:", "").strip()
    url = (
        f"https://api.openalex.org/works"
        f"?filter=locations.landing_page_url:https://arxiv.org/abs/{clean}"
        f"&mailto={OPENALEX_EMAIL}"
    )
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            data = json.loads(r.read())
            results = data.get("results", [])
            return results[0] if results else None
    except Exception:
        return None


def extract_arxiv_id(doi: str, url: str) -> str | None:
    prefix = "10.48550/arxiv."
    if doi.lower().startswith(prefix):
        return doi[len(prefix):]
    if "/abs/" in url:
        return url.split("/abs/")[-1].strip()
    return None


def slug(year: str, title: str) -> str:
    import re
    base = f"{year}-{title}".lower()
    return re.sub(r"[^a-z0-9]+", "-", base).strip("-")


def main() -> None:
    pubs = json.loads(PUBS_FILE.read_text())
    metrics: dict[str, dict] = {}

    for pub in pubs:
        title = (pub.get("title") or "").strip()
        if not title:
            continue
        doi = (pub.get("doi") or "").strip()
        url = (pub.get("url") or "").strip()
        year = (pub.get("year") or pub.get("date") or "").strip()
        arxiv_id = extract_arxiv_id(doi, url)
        pub_id = slug(year, title)

        work = None
        if doi and not doi.lower().startswith("10.48550/arxiv."):
            work = openalex_by_doi(doi)
            time.sleep(0.5)
        if work is None and arxiv_id:
            work = openalex_by_arxiv(arxiv_id)
            time.sleep(0.5)

        if work:
            metrics[pub_id] = {
                "cited_by_count": work.get("cited_by_count", 0),
                "referenced_works_count": work.get("referenced_works_count", 0),
                "title": work.get("title", title),
                "openalex_id": work.get("id", ""),
            }
            print(f"  [{pub_id}] citations={metrics[pub_id]['cited_by_count']}")
        else:
            metrics[pub_id] = {
                "cited_by_count": 0,
                "referenced_works_count": 0,
                "title": title,
                "openalex_id": "",
            }
            print(f"  [{pub_id}] not found in OpenAlex")

    out = {
        "papers": metrics,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
    }
    OUT_FILE.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"Wrote {OUT_FILE} ({len(metrics)} papers)")


if __name__ == "__main__":
    main()
