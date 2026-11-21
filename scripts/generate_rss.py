#!/usr/bin/env python3
"""
Generate RSS 2.0 feed at public/feed.xml for iabdul-aal.github.io.
Uses Object-Oriented Architecture (BaseFeedItem abstract base class and concrete subclasses).
"""

from __future__ import annotations

import hashlib
import json
import os
from abc import ABC, abstractmethod
from datetime import datetime, timezone
from xml.dom import minidom
import xml.etree.ElementTree as ET

from config_helper import clean_html_text, infer_preprint_info


def format_rfc822(date_str: str) -> str:
    try:
        dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
    except Exception:
        try:
            dt = datetime.strptime(date_str, "%Y-%m-%d")
        except Exception:
            dt = datetime.now(timezone.utc)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.strftime("%a, %d %b %Y %H:%M:%S GMT")


def make_hash(text: str) -> str:
    return hashlib.md5(text.encode("utf-8")).hexdigest()[:12]


class BaseFeedItem(ABC):
    def __init__(self, raw_data: dict):
        self.raw_data = raw_data

    @property
    @abstractmethod
    def title(self) -> str:
        pass

    @property
    @abstractmethod
    def link(self) -> str:
        pass

    @property
    @abstractmethod
    def description(self) -> str:
        pass

    @property
    @abstractmethod
    def pub_date(self) -> str:
        pass

    @property
    @abstractmethod
    def guid(self) -> str:
        pass

    def to_dict(self) -> dict:
        return {
            "title": self.title,
            "link": self.link,
            "description": self.description,
            "pubDate": self.pub_date,
            "guid": self.guid,
        }


class ActivityFeedItem(BaseFeedItem):
    @property
    def title(self) -> str:
        item_type = str(self.raw_data.get("type", "Activity")).capitalize()
        clean_title = clean_html_text(self.raw_data.get("title", ""), replace_em_dash=True)
        return f"[{item_type}] {clean_title}"

    @property
    def link(self) -> str:
        item_type = str(self.raw_data.get("type", "")).lower().strip()
        route_map = {
            "paper": "https://iabdul-aal.me/publications",
            "preprint": "https://iabdul-aal.me/publications",
            "software": "https://iabdul-aal.me/tools",
            "talk": "https://iabdul-aal.me/materials",
            "article": "https://iabdul-aal.me/materials",
            "milestone": "https://iabdul-aal.me/about",
            "position": "https://iabdul-aal.me/cv",
        }
        return route_map.get(item_type, "https://iabdul-aal.me/")

    @property
    def description(self) -> str:
        return clean_html_text(self.raw_data.get("detail", ""), replace_em_dash=True)

    @property
    def pub_date(self) -> str:
        date_raw = self.raw_data.get("date_iso") or self.raw_data.get("date") or ""
        return format_rfc822(date_raw)

    @property
    def guid(self) -> str:
        date_iso = self.raw_data.get("date_iso", "")
        clean_title = clean_html_text(self.raw_data.get("title", ""), replace_em_dash=True)
        t_hash = make_hash(clean_title)
        return f"https://iabdul-aal.me/#activity-{date_iso}-{t_hash}"


class PublicationFeedItem(BaseFeedItem):
    @property
    def title(self) -> str:
        clean_title = clean_html_text(self.raw_data.get("title", ""), replace_em_dash=True)
        return f"[Publication] {clean_title}"

    @property
    def link(self) -> str:
        doi = self.raw_data.get("doi")
        if doi:
            return f"https://doi.org/{doi}"
        return self.raw_data.get("url") or "https://iabdul-aal.me/publications"

    @property
    def description(self) -> str:
        abstract = clean_html_text(self.raw_data.get("abstract") or "", replace_em_dash=True)
        if abstract:
            return abstract
        venue = clean_html_text(self.raw_data.get("journal") or self.raw_data.get("venue") or "", replace_em_dash=True)
        year = str(self.raw_data.get("year") or "").strip()
        if not year:
            date = str(self.raw_data.get("date") or "").strip()
            year = date[:4] if len(date) >= 4 else "2026"
        preprint_info = infer_preprint_info(self.raw_data)
        arxiv_id = preprint_info["arxiv"] or str(self.raw_data.get("arxiv") or "").strip()
        if preprint_info["is_preprint"]:
            server = preprint_info["server"]
            if server == "arXiv" and arxiv_id:
                return f"Posted on arXiv:{arxiv_id} ({year})."
            if server and server.lower() != "preprint":
                return f"Posted on {server} ({year})."
            return f"Posted as preprint ({year})."
        if venue:
            return f"Published in {venue} ({year})."
        return f"Published manuscript ({year})."

    @property
    def pub_date(self) -> str:
        year = str(self.raw_data.get("year") or "2026").strip() or "2026"
        date_raw = self.raw_data.get("date") or f"{year}-01-01"
        return format_rfc822(date_raw)

    @property
    def guid(self) -> str:
        clean_title = clean_html_text(self.raw_data.get("title", ""), replace_em_dash=True)
        guid_id = self.raw_data.get("arxiv") or self.raw_data.get("doi") or make_hash(clean_title)
        return f"https://iabdul-aal.me/publications#{guid_id}"


class RSSFeedGenerator:
    def __init__(self, root_dir: str):
        self.root_dir = root_dir
        self.items: list[BaseFeedItem] = []

    def load_activity(self, filepath: str) -> None:
        if not os.path.exists(filepath):
            return
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data.get("items", []):
                # Publications are emitted once via load_publications() with DOI/arXiv links.
                if str(item.get("type", "")).lower().strip() in ("paper", "preprint"):
                    continue
                self.items.append(ActivityFeedItem(item))

    def load_publications(self, filepath: str) -> None:
        if not os.path.exists(filepath):
            return
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                self.items.append(PublicationFeedItem(item))

    def generate(self, output_path: str) -> None:
        ET.register_namespace("atom", "http://www.w3.org/2005/Atom")
        rss = ET.Element("rss", version="2.0")
        channel = ET.SubElement(rss, "channel")

        ET.SubElement(channel, "title").text = "Islam I. Abdulaal: Research Activity Feed"
        ET.SubElement(channel, "link").text = "https://iabdul-aal.me"
        ET.SubElement(channel, "description").text = (
            "Updates on research publications, preprints, software tools, and academic milestones in integrated nanophotonics."
        )
        ET.SubElement(channel, "language").text = "en-us"
        ET.SubElement(channel, "pubDate").text = datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")

        atom_link = ET.SubElement(channel, "{http://www.w3.org/2005/Atom}link")
        atom_link.set("href", "https://iabdul-aal.me/feed.xml")
        atom_link.set("rel", "self")
        atom_link.set("type", "application/rss+xml")

        for item in self.items:
            data = item.to_dict()
            item_elem = ET.SubElement(channel, "item")
            ET.SubElement(item_elem, "title").text = data["title"]
            ET.SubElement(item_elem, "link").text = data["link"]
            ET.SubElement(item_elem, "description").text = data["description"]
            ET.SubElement(item_elem, "pubDate").text = data["pubDate"]
            guid_elem = ET.SubElement(item_elem, "guid", isPermaLink="false")
            guid_elem.text = data["guid"]

        xml_str = ET.tostring(rss, encoding="utf-8")
        parsed = minidom.parseString(xml_str)
        pretty_xml = parsed.toprettyxml(indent="  ")

        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, "w", encoding="utf-8", newline="\n") as f:
            f.write(pretty_xml)

        print(f"Successfully generated RSS feed with {len(self.items)} items at {output_path}")


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    activity_file = os.path.join(root, "data", "activity.json")
    publications_file = os.path.join(root, "data", "publications.json")
    output_file = os.path.join(root, "public", "feed.xml")

    generator = RSSFeedGenerator(root)
    generator.load_activity(activity_file)
    generator.load_publications(publications_file)
    generator.generate(output_file)


if __name__ == "__main__":
    main()
