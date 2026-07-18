#!/usr/bin/env python3
"""Fetch Medium articles via RSS and save to medium_articles.json.

Medium provides a public RSS feed at https://medium.com/feed/@<username>
which is parsed without any API key or authentication.
"""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

import requests

try:
    sys.stdout.reconfigure(encoding='utf-8')
except AttributeError:
    pass

from config_helper import get_github_username

MEDIUM_RSS = f"https://medium.com/feed/@{get_github_username()}"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "data" / "medium_articles.json"

HEADERS = {
    "User-Agent": "medium-articles-sync/1.0 (academic-website)",
    "Accept": "application/rss+xml, application/xml, text/xml",
}

NS = {
    "dc": "http://purl.org/dc/elements/1.1/",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "atom": "http://www.w3.org/2005/Atom",
}


def strip_html(html: str) -> str:
    """Return plain text with HTML tags removed."""
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def first_image(html: str) -> str:
    """Extract the first <img src="..."> from HTML content."""
    match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', html)
    return match.group(1) if match else ""


def canonical_url(raw: str) -> str:
    """Strip Medium tracking query parameters from a URL."""
    return raw.split("?")[0]


def load_existing() -> dict:
    if OUTPUT_PATH.exists():
        try:
            return json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            pass
    return {}


def fetch_rss() -> str:
    resp = requests.get(MEDIUM_RSS, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    return resp.text


def clean_em_dashes(text: str) -> str:
    if not text:
        return ""
    text = text.replace("\u200a\u2014\u200a", ": ")
    text = text.replace(" — ", ": ")
    text = text.replace("—", ": ")
    return text


def parse_articles(xml_text: str) -> list[dict]:
    root = ET.fromstring(xml_text)
    channel = root.find("channel")
    if channel is None:
        return []

    articles = []
    for item in channel.findall("item"):
        title_el = item.find("title")
        link_el = item.find("link")
        pub_date_el = item.find("pubDate")
        desc_el = item.find("description")
        content_el = item.find("content:encoded", NS)

        title = title_el.text.strip() if title_el is not None and title_el.text else ""
        title = clean_em_dashes(title)
        link = canonical_url(link_el.text.strip()) if link_el is not None and link_el.text else ""

        # Parse publication date
        pub_iso = ""
        pub_year = ""
        if pub_date_el is not None and pub_date_el.text:
            try:
                dt = parsedate_to_datetime(pub_date_el.text)
                pub_iso = dt.isoformat()
                pub_year = str(dt.year)
            except Exception:  # noqa: BLE001
                pass

        # Build a short excerpt from description or content
        raw_content = ""
        if content_el is not None and content_el.text:
            raw_content = content_el.text
        elif desc_el is not None and desc_el.text:
            raw_content = desc_el.text

        plain = strip_html(raw_content)
        plain = clean_em_dashes(plain)
        excerpt = plain[:220].rsplit(" ", 1)[0] + "…" if len(plain) > 220 else plain

        # Tags / categories
        tags = [
            c.text.strip()
            for c in item.findall("category")
            if c.text
        ]

        # Thumbnail from article image
        thumbnail = first_image(raw_content)

        articles.append(
            {
                "title": title,
                "url": link,
                "publishedAt": pub_iso,
                "year": pub_year,
                "excerpt": excerpt,
                "tags": tags,
                "thumbnail": thumbnail,
            }
        )

    return articles


def main() -> None:
    print(f"Fetching Medium articles from {MEDIUM_RSS} …")
    existing = load_existing()

    try:
        xml_text = fetch_rss()
        articles = parse_articles(xml_text)
        data = {
            "articles": articles,
            "fetchedAt": datetime.now(timezone.utc).isoformat(),
        }
    except Exception as exc:  # noqa: BLE001
        print(f"[warn] Fetch failed ({exc}). Keeping existing data.")
        data = {**existing, "fetchedAt": datetime.now(timezone.utc).isoformat()}

    OUTPUT_PATH.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    count = len(data.get("articles", []))
    print(f"Saved {count} article(s) to {OUTPUT_PATH}")
    for a in data.get("articles", []):
        print(f"  • {a['year']}  {a['title']}")


if __name__ == "__main__":
    main()
