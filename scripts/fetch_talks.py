#!/usr/bin/env python3
"""Fetch talk records from public sources and generate talks.json."""

from __future__ import annotations

import json
import re
import xml.etree.ElementTree as ET
from datetime import datetime
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

import requests

PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCES_PATH = PROJECT_ROOT / "talk_sources.json"
OUTPUT_PATH = PROJECT_ROOT / "talks.json"

USER_AGENT = "talks-sync/1.0"
TIMEOUT = 30

YOUTUBE_CHANNEL_PATTERN = re.compile(r"youtube\.com/channel/(UC[\w-]+)", re.IGNORECASE)
YOUTUBE_EXTERNAL_ID_PATTERN = re.compile(r'"externalId":"(UC[\w-]+)"', re.IGNORECASE)
YOUTUBE_CANONICAL_PATTERN = re.compile(r"youtube\.com/channel/(UC[\w-]+)", re.IGNORECASE)
YOUTUBE_DATE_PATTERN = re.compile(r'"datePublished":"([0-9]{4}-[0-9]{2}-[0-9]{2})"')

ATOM_NS = {"atom": "http://www.w3.org/2005/Atom"}


def request_text(url: str, *, params: dict[str, str] | None = None) -> str:
    response = requests.get(
        url,
        params=params,
        headers={"User-Agent": USER_AGENT},
        timeout=TIMEOUT,
    )
    response.raise_for_status()
    return response.text


def request_json(url: str, *, params: dict[str, str] | None = None) -> dict[str, Any]:
    response = requests.get(
        url,
        params=params,
        headers={"User-Agent": USER_AGENT},
        timeout=TIMEOUT,
    )
    response.raise_for_status()
    return response.json()


def normalize_date(value: str) -> str:
    raw = value.strip()
    if not raw:
        return ""

    for parser in (
        lambda x: datetime.fromisoformat(x.replace("Z", "+00:00")),
        parsedate_to_datetime,
    ):
        try:
            dt = parser(raw)
            return dt.strftime("%Y-%m-%d")
        except Exception:
            continue

    return ""


def extract_video_id(url: str) -> str:
    parsed = urlparse(url)

    if parsed.netloc.endswith("youtu.be"):
        return parsed.path.strip("/")

    if parsed.path == "/watch":
        query = parse_qs(parsed.query)
        return query.get("v", [""])[0].strip()

    if parsed.path.startswith("/shorts/"):
        return parsed.path.split("/", 2)[2].strip()

    return ""


def resolve_channel_id(url: str) -> str:
    match = YOUTUBE_CHANNEL_PATTERN.search(url)
    if match:
        return match.group(1)

    page = request_text(url)

    canonical_match = YOUTUBE_CANONICAL_PATTERN.search(page)
    if canonical_match:
        return canonical_match.group(1)

    external_match = YOUTUBE_EXTERNAL_ID_PATTERN.search(page)
    if external_match:
        return external_match.group(1)

    return ""


def fetch_channel_talks(name: str, channel_url: str, format_name: str) -> list[dict[str, Any]]:
    channel_id = resolve_channel_id(channel_url)
    if not channel_id:
        return []

    feed_url = "https://www.youtube.com/feeds/videos.xml"
    xml_text = request_text(feed_url, params={"channel_id": channel_id})

    root = ET.fromstring(xml_text)
    talks: list[dict[str, Any]] = []

    for entry in root.findall("atom:entry", ATOM_NS):
        title = (entry.findtext("atom:title", default="", namespaces=ATOM_NS) or "").strip()
        link_element = entry.find("atom:link", ATOM_NS)
        link = (link_element.get("href", "") if link_element is not None else "").strip()
        published = (entry.findtext("atom:published", default="", namespaces=ATOM_NS) or "").strip()
        author = (entry.findtext("atom:author/atom:name", default=name, namespaces=ATOM_NS) or name).strip()

        if not title or not link:
            continue

        date = normalize_date(published)
        talks.append(
            {
                "title": title,
                "event": f"{name} Session",
                "date": date,
                "year": date[:4] if date else "",
                "url": link,
                "source": author,
                "format": format_name or "Talk and Workshop",
                "featured": False,
            }
        )

    return talks


def fetch_featured_talk(url: str, event: str, format_name: str) -> dict[str, Any] | None:
    video_id = extract_video_id(url)
    if not video_id:
        return None

    watch_url = f"https://www.youtube.com/watch?v={video_id}"

    title = "Featured Public Talk"
    source = "YouTube"
    date = ""

    try:
        oembed = request_json("https://www.youtube.com/oembed", params={"url": watch_url, "format": "json"})
        title = str(oembed.get("title", title)).strip() or title
        source = str(oembed.get("author_name", source)).strip() or source
    except requests.RequestException:
        pass

    try:
        video_page = request_text(watch_url)
        date_match = YOUTUBE_DATE_PATTERN.search(video_page)
        if date_match:
            date = date_match.group(1)
    except requests.RequestException:
        pass

    return {
        "title": title,
        "event": event or "Featured Public Talk",
        "date": date,
        "year": date[:4] if date else "",
        "url": watch_url,
        "source": source,
        "format": format_name or "Technical Talk",
        "featured": True,
    }


def load_sources() -> dict[str, Any]:
    raw = SOURCES_PATH.read_text(encoding="utf-8-sig")
    parsed = json.loads(raw)
    if not isinstance(parsed, dict):
        raise ValueError("talk_sources.json must be a JSON object")
    return parsed


def sort_talks(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    def sort_key(item: dict[str, Any]) -> tuple[str, int, str]:
        date = item.get("date", "")
        year = item.get("year", "")

        if date:
            date_key = date
        elif year.isdigit():
            date_key = f"{year}-01-01"
        else:
            date_key = "0000-00-00"

        featured_rank = 0 if item.get("featured") else 1
        return (date_key, featured_rank, item.get("title", "").lower())

    return sorted(items, key=sort_key, reverse=True)


def main() -> None:
    sources = load_sources()

    talks: list[dict[str, Any]] = []

    for item in sources.get("youtubeChannels", []):
        if not isinstance(item, dict):
            continue

        name = str(item.get("name", "YouTube")).strip() or "YouTube"
        url = str(item.get("url", "")).strip()
        format_name = str(item.get("format", "Talk and Workshop")).strip()

        if not url:
            continue

        try:
            talks.extend(fetch_channel_talks(name, url, format_name))
        except requests.RequestException:
            continue
        except ET.ParseError:
            continue

    for item in sources.get("featured", []):
        if not isinstance(item, dict):
            continue

        url = str(item.get("url", "")).strip()
        if not url:
            continue

        talk = fetch_featured_talk(
            url=url,
            event=str(item.get("event", "Featured Public Talk")).strip(),
            format_name=str(item.get("format", "Technical Talk")).strip(),
        )
        if talk:
            talks.append(talk)

    deduped: list[dict[str, Any]] = []
    seen_urls: set[str] = set()

    for talk in talks:
        url = talk.get("url", "").strip()
        if not url or url in seen_urls:
            continue
        seen_urls.add(url)
        deduped.append(talk)

    output = sort_talks(deduped)
    OUTPUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(output)} talks to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
