#!/usr/bin/env python3
"""Fetch Google Scholar citation metrics and save to scholar_metrics.json.

Uses direct HTTP scraping of the public Scholar profile page.
No API key required. Runs once per day via GitHub Actions.
"""

from __future__ import annotations

import json
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

SCHOLAR_ID = "CPmqNv4AAAAJ"
SCHOLAR_URL = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "scholar_metrics.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/126.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

FALLBACK_PATH = OUTPUT_PATH  # same file — read existing as fallback


def fetch_html() -> str:
    """Fetch the Scholar profile page HTML."""
    response = requests.get(SCHOLAR_URL, headers=HEADERS, timeout=30)
    response.raise_for_status()
    return response.text


def load_existing() -> dict:
    """Return the previously saved metrics as a fallback."""
    if OUTPUT_PATH.exists():
        try:
            return json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            pass
    return {}


def parse_metrics(html: str, existing: dict) -> dict:
    """Parse citation metrics from the Scholar profile HTML."""
    soup = BeautifulSoup(html, "html.parser")

    metrics = {
        "citations": existing.get("citations", {"all": 0, "since2021": 0}),
        "hIndex": existing.get("hIndex", {"all": 0, "since2021": 0}),
        "i10Index": existing.get("i10Index", {"all": 0, "since2021": 0}),
        "citationsPerYear": existing.get("citationsPerYear", []),
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
    }

    # ── Summary metrics table ────────────────────────────────────────────────
    table = soup.find("table", id="gsc_rsb_st")
    if table:
        rows = table.find_all("tr")
        row_keys = ["citations", "hIndex", "i10Index"]
        data_row_idx = 0
        for row in rows:
            cells = row.find_all("td", class_="gsc_rsb_std")
            if len(cells) >= 2:
                if data_row_idx < len(row_keys):
                    try:
                        metrics[row_keys[data_row_idx]] = {
                            "all": int(cells[0].get_text(strip=True)),
                            "since2021": int(cells[1].get_text(strip=True)),
                        }
                    except (ValueError, IndexError):
                        pass
                    data_row_idx += 1

    # ── Citations per year histogram ─────────────────────────────────────────
    year_spans = soup.find_all("span", class_="gsc_g_t")
    bar_links = soup.find_all("a", class_="gsc_g_a")

    if year_spans and bar_links:
        per_year = []
        for year_el, bar_el in zip(year_spans, bar_links):
            try:
                year = int(year_el.get_text(strip=True))
                count_el = bar_el.find("span", class_="gsc_g_al")
                count = int(count_el.get_text(strip=True)) if count_el else 0
                per_year.append({"year": year, "count": count})
            except (ValueError, AttributeError):
                pass
        if per_year:
            metrics["citationsPerYear"] = per_year

    return metrics


def main() -> None:
    print(f"Fetching Google Scholar metrics for user {SCHOLAR_ID} …")
    existing = load_existing()

    try:
        html = fetch_html()
        time.sleep(1)
        metrics = parse_metrics(html, existing)
    except Exception as exc:  # noqa: BLE001
        print(f"[warn] Fetch failed ({exc}). Keeping existing data with updated timestamp.")
        metrics = {**existing, "fetchedAt": datetime.now(timezone.utc).isoformat()}

    OUTPUT_PATH.write_text(
        json.dumps(metrics, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Saved to {OUTPUT_PATH}")
    print(f"  Citations : {metrics.get('citations', {}).get('all', '—')}")
    print(f"  h-index   : {metrics.get('hIndex', {}).get('all', '—')}")
    print(f"  i10-index : {metrics.get('i10Index', {}).get('all', '—')}")


if __name__ == "__main__":
    main()
