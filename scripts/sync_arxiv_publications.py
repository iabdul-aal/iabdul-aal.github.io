#!/usr/bin/env python3
"""
Sync publications from your arXiv author profile page.
Parses all listed preprints, merges them into publications.json,
and adds any new ones automatically with correct metadata.
"""

import json
import re
import sys
import urllib.request
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

from config_helper import clean_html_text, get_arxiv_url

ROOT = Path(__file__).parent.parent
PUBS_FILE = ROOT / "data" / "publications.json"
ARXIV_PROFILE_URL = get_arxiv_url()


def clean_html(text: str) -> str:
    return clean_html_text(text, replace_em_dash=True)


def parse_arxiv_profile() -> list[dict]:
    print(f"Fetching arXiv profile from {ARXIV_PROFILE_URL}...")
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    req = urllib.request.Request(ARXIV_PROFILE_URL, headers=headers)

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            html_doc = resp.read().decode("utf-8")
    except Exception as e:
        print(f"Error fetching arXiv profile: {e}")
        return []

    blocks = re.findall(r'<div class="mathjax">.*?</div>\s*</dd>\s*</div>', html_doc, re.DOTALL)
    if not blocks:
        blocks = re.findall(r"<dt>.*?</dt>\s*<dd>.*?</dd>", html_doc, re.DOTALL)

    papers = []
    for block in blocks:
        arxiv_match = re.search(r"/abs/(\d{4}\.\d{4,5})", block)
        if not arxiv_match:
            continue
        arxiv_id = arxiv_match.group(1)

        title_match = re.search(
            r'<div class="list-title mathjax">\s*<span class="descriptor">Title:</span>\s*(.*?)\s*</div>',
            block,
            re.DOTALL,
        )
        if not title_match:
            continue
        title = clean_html(title_match.group(1))

        authors_block_match = re.search(
            r'<div class="list-authors">.*?<span class="descriptor">Authors:</span>\s*(.*?)\s*</div>',
            block,
            re.DOTALL,
        )
        authors = []
        if authors_block_match:
            authors_html = authors_block_match.group(1)
            author_names = re.findall(r"<a[^>]*>(.*?)</a>", authors_html)
            authors = [clean_html(name) for name in author_names]

        year_prefix = arxiv_id.split(".")[0]
        year = f"20{year_prefix[:2]}" if len(year_prefix) >= 2 else "2026"

        papers.append(
            {
                "title": title,
                "authors": authors,
                "arxiv": arxiv_id,
                "year": year,
            }
        )
        print(f"  Parsed from arXiv: [{arxiv_id}] {title}")

    return papers


DOI_TO_ARXIV_MAP = {
    "10.1088/2040-8986/ae8605": "2510.00357",
}


def extract_arxiv_id(doi: str, url: str) -> str | None:
    prefix = "10.48550/arxiv."
    if doi.lower().startswith(prefix):
        return doi[len(prefix) :].strip()
    if "/abs/" in url:
        return url.split("/abs/")[-1].strip()
    return None


def main() -> None:
    if PUBS_FILE.exists():
        try:
            current_pubs = json.loads(PUBS_FILE.read_text(encoding="utf-8"))
        except Exception:
            current_pubs = []
    else:
        current_pubs = []

    arxiv_papers = parse_arxiv_profile()
    if not arxiv_papers:
        print("No papers found or error fetching profile. Aborting sync.")
        return

    updated_pubs = []
    matched_arxiv_ids = set()

    for pub in current_pubs:
        doi = pub.get("doi") or ""
        url = pub.get("url") or ""
        arxiv_id = pub.get("arxiv") or DOI_TO_ARXIV_MAP.get(doi.lower()) or extract_arxiv_id(doi, url)

        if arxiv_id:
            pub["arxiv"] = arxiv_id
            scraped = next((p for p in arxiv_papers if p["arxiv"] == arxiv_id), None)
            if scraped:
                if not pub.get("authors") and scraped["authors"]:
                    pub["authors"] = scraped["authors"]
                matched_arxiv_ids.add(arxiv_id)
                print(f"  [Sync] Matched existing publication: {arxiv_id}")

        updated_pubs.append(pub)

    for scraped in arxiv_papers:
        arxiv_id = scraped["arxiv"]
        if arxiv_id not in matched_arxiv_ids:
            new_entry = {
                "title": scraped["title"],
                "venue": "Preprint",
                "year": scraped["year"],
                "doi": f"10.48550/arXiv.{arxiv_id}",
                "url": f"https://arxiv.org/abs/{arxiv_id}",
                "arxiv": arxiv_id,
                "type": "preprint",
            }
            if scraped["authors"]:
                new_entry["authors"] = scraped["authors"]
            updated_pubs.append(new_entry)
            print(f"  [Sync] Added new preprint from arXiv: {arxiv_id}")

    PUBS_FILE.write_text(json.dumps(updated_pubs, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Sync complete. publications.json updated ({len(updated_pubs)} total papers).")


if __name__ == "__main__":
    main()
