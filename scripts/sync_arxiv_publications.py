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

# Force UTF-8 encoding for stdout
sys.stdout.reconfigure(encoding='utf-8')

from config_helper import get_arxiv_url

ROOT = Path(__file__).parent.parent
PUBS_FILE = ROOT / "data" / "publications.json"
ARXIV_PROFILE_URL = get_arxiv_url()


def clean_html(text: str) -> str:
    # Remove HTML tags, collapse spaces
    text = re.sub(r'<[^>]*>', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def parse_arxiv_profile() -> list[dict]:
    print(f"Fetching arXiv profile from {ARXIV_PROFILE_URL}...")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    req = urllib.request.Request(ARXIV_PROFILE_URL, headers=headers)
    
    try:
        html = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching arXiv profile: {e}")
        return []

    # Find each mathjax div which represents a publication card on arXiv
    # e.g., <div class="mathjax"><dt>[1] ... </dt> <dd> ... </dd> </div>
    blocks = re.findall(r'<div class="mathjax">.*?</div>\s*</dd>\s*</div>', html, re.DOTALL)
    if not blocks:
        # Fallback to general dt/dd search if wrapping layout changes
        blocks = re.findall(r'<dt>.*?</dt>\s*<dd>.*?</dd>', html, re.DOTALL)

    papers = []
    for block in blocks:
        # Extract arXiv ID
        arxiv_match = re.search(r'/abs/(\d{4}\.\d{4,5})', block)
        if not arxiv_match:
            continue
        arxiv_id = arxiv_match.group(1)

        # Extract Title
        title_match = re.search(r'<div class="list-title mathjax">\s*<span class="descriptor">Title:</span>\s*(.*?)\s*</div>', block, re.DOTALL)
        if not title_match:
            continue
        title = clean_html(title_match.group(1))

        # Extract Authors
        authors_block_match = re.search(r'<div class="list-authors">.*?<span class="descriptor">Authors:</span>\s*(.*?)\s*</div>', block, re.DOTALL)
        authors = []
        if authors_block_match:
            authors_html = authors_block_match.group(1)
            # Find all author names inside <a> tags
            author_names = re.findall(r'<a[^>]*>(.*?)</a>', authors_html)
            authors = [clean_html(name) for name in author_names]

        # Year is determined by arXiv ID prefix (e.g. 2510.00357 -> 2025)
        year_prefix = arxiv_id.split('.')[0]
        year = f"20{year_prefix[:2]}" if len(year_prefix) >= 2 else "2026"

        papers.append({
            "title": title,
            "authors": authors,
            "arxiv": arxiv_id,
            "year": year
        })
        print(f"  Parsed from arXiv: [{arxiv_id}] {title}")

    return papers


# Mapping of known journal DOIs to their corresponding arXiv IDs
DOI_TO_ARXIV_MAP = {
    "10.1088/2040-8986/ae8605": "2510.00357",
}


def extract_arxiv_id(doi: str, url: str) -> str | None:
    prefix = "10.48550/arxiv."
    if doi.lower().startswith(prefix):
        return doi[len(prefix):].strip()
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

    # Step 1: Merge or update existing items in publications.json
    for pub in current_pubs:
        doi = pub.get("doi") or ""
        url = pub.get("url") or ""
        arxiv_id = pub.get("arxiv") or DOI_TO_ARXIV_MAP.get(doi) or extract_arxiv_id(doi, url)
        
        if arxiv_id:
            # Ensure the arxiv key is set
            pub["arxiv"] = arxiv_id
            
            # Look for matches in the scraped arXiv papers
            scraped = next((p for p in arxiv_papers if p["arxiv"] == arxiv_id), None)
            if scraped:
                # Update authors list only if missing in publications.json
                if not pub.get("authors") and scraped["authors"]:
                    pub["authors"] = scraped["authors"]
                
                # We preserve the existing title (like the journal title) and do not overwrite it with preprint title
                matched_arxiv_ids.add(arxiv_id)
                print(f"  [Sync] Matched existing publication: {arxiv_id}")
            
        updated_pubs.append(pub)

    # Step 2: Append newly found arXiv preprints that are not yet in publications.json
    for scraped in arxiv_papers:
        arxiv_id = scraped["arxiv"]
        if arxiv_id not in matched_arxiv_ids:
            new_entry = {
                "title": scraped["title"],
                "venue": "Preprint",
                "year": scraped["year"],
                "doi": f"10.48550/arXiv.{arxiv_id}",
                "url": f"https://arxiv.org/abs/{arxiv_id}",
                "arxiv": arxiv_id
            }
            if scraped["authors"]:
                new_entry["authors"] = scraped["authors"]
            updated_pubs.append(new_entry)
            print(f"  [Sync] Added new preprint from arXiv: {arxiv_id}")

    # Write back to publications.json
    PUBS_FILE.write_text(json.dumps(updated_pubs, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Sync complete. publications.json updated ({len(updated_pubs)} total papers).")


if __name__ == "__main__":
    main()
