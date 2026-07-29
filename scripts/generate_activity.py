#!/usr/bin/env python3
"""
Generate activity.json by merging events from:
  - publications.json        (paper accepted / published)
  - talks.json               (talks / sessions)
  - medium_articles.json     (articles published)
  - milestones.json          (static: positions, degrees, awards)

Output: activity.json: sorted by date descending, top MAX_ITEMS entries.
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent.parent
MAX_ITEMS = 10

SOURCES = {
    "pubs": ROOT / "data" / "publications.json",
    "talks": ROOT / "data" / "talks.json",
    "articles": ROOT / "data" / "medium_articles.json",
    "milestones": ROOT / "data" / "milestones.json",
}
OUT_FILE = ROOT / "data" / "activity.json"

ISO_FMT = "%Y-%m-%dT%H:%M:%SZ"
DATE_FMT = "%Y-%m-%d"


def parse_date(raw: str) -> datetime | None:
    """Try several common date formats and return a UTC datetime or None."""
    if not raw:
        return None
    raw = raw.strip()
    
    if any(x in raw.lower() for x in ('+', 'z', 't')):
        try:
            clean = raw.replace("Z", "+00:00")
            return datetime.fromisoformat(clean).astimezone(timezone.utc)
        except ValueError:
            pass

    for fmt in ("%Y-%m-%d", "%Y-%m", "%Y", "%Y-%m-%dT%H:%M:%S"):
        try:
            return datetime.strptime(raw, fmt).replace(tzinfo=timezone.utc)
        except ValueError:
            pass
    return None


def fmt_display(dt: datetime) -> str:
    return dt.strftime("%b %Y")


def load_json(path: Path) -> list | dict:
    if not path.exists():
        return []
    return json.loads(path.read_text())


def events_from_publications(pubs: list) -> list[dict]:
    events = []
    for pub in pubs:
        title = (pub.get("title") or "").strip()
        if not title:
            continue
        year = (pub.get("date") or pub.get("year") or "").strip()
        venue = (pub.get("venue") or "").strip()
        doi = (pub.get("doi") or "").strip()
        arxiv_prefix = "10.48550/arxiv."
        is_preprint = doi.lower().startswith(arxiv_prefix) if doi else not bool(venue)

        dt = parse_date(year)
        if not dt:
            continue

        event_type = "preprint" if is_preprint else "paper"
        verb = "Preprint posted" if is_preprint else "Paper accepted"
        detail = f"{verb} in {venue}." if venue and not is_preprint else f"{verb} on arXiv." if is_preprint else f"{verb}."

        events.append({
            "date_iso": dt.strftime(DATE_FMT),
            "date": fmt_display(dt),
            "type": event_type,
            "title": title,
            "detail": detail,
        })
    return events


def events_from_talks(talks: list) -> list[dict]:
    events = []
    for talk in talks:
        title = (talk.get("title") or "").strip()
        if not title:
            continue
        raw_date = (talk.get("date") or talk.get("year") or "").strip()
        dt = parse_date(raw_date)
        if not dt:
            continue
        source = (talk.get("source") or talk.get("event") or "").strip()
        detail = f"Talk at {source}." if source else "Technical talk."
        events.append({
            "date_iso": dt.strftime(DATE_FMT),
            "date": fmt_display(dt),
            "type": "talk",
            "title": title,
            "detail": detail,
        })
    return events


def events_from_articles(articles: list) -> list[dict]:
    events = []
    for article in articles:
        title = (article.get("title") or "").strip()
        if not title:
            continue
        raw_date = (article.get("publishedAt") or article.get("pubDate") or "").strip()
        dt = parse_date(raw_date)
        if not dt:
            continue
        events.append({
            "date_iso": dt.strftime(DATE_FMT),
            "date": fmt_display(dt),
            "type": "article",
            "title": title,
            "detail": "Published on Medium.",
        })
    return events


def events_from_milestones(milestones: list) -> list[dict]:
    events = []
    for m in milestones:
        dt = parse_date(m.get("date", ""))
        if not dt:
            continue
        events.append({
            "date_iso": dt.strftime(DATE_FMT),
            "date": fmt_display(dt),
            "type": m.get("type", "milestone"),
            "title": m.get("title", ""),
            "detail": m.get("detail", ""),
        })
    return events


def main() -> None:
    import sys
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

    pubs = load_json(SOURCES["pubs"])
    talks = load_json(SOURCES["talks"])
    articles_data = load_json(SOURCES["articles"])
    milestones = load_json(SOURCES["milestones"])

    # Extract articles list from wrapper object if present
    if isinstance(articles_data, dict):
        articles_list = articles_data.get("articles", [])
    elif isinstance(articles_data, list):
        articles_list = articles_data
    else:
        articles_list = []

    all_events = (
        events_from_publications(pubs if isinstance(pubs, list) else [])
        + events_from_talks(talks if isinstance(talks, list) else [])
        + events_from_articles(articles_list)
        + events_from_milestones(milestones if isinstance(milestones, list) else [])
    )

    # Sort descending by date, then alphabetically by title for stable output
    all_events.sort(key=lambda e: (e["date_iso"], e["title"]), reverse=True)

    # Deduplicate by title (keep most recent)
    seen: set[str] = set()
    unique: list[dict] = []
    for e in all_events:
        key = e["title"].lower()
        if key not in seen:
            seen.add(key)
            unique.append(e)

    top = unique[:MAX_ITEMS]

    out = {
        "items": top,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
    }
    OUT_FILE.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"Wrote {OUT_FILE} ({len(top)} events from {len(all_events)} total)")


if __name__ == "__main__":
    main()
