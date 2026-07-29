#!/usr/bin/env python3
"""
Generate RSS 2.0 feed for iabdul-aal.github.io.
Uses Object-Oriented Architecture (BaseFeedItem Mother class & Child Subclasses).
"""
import hashlib
import json
import os
from abc import ABC, abstractmethod
from datetime import datetime, timezone
import xml.etree.ElementTree as ET
from xml.dom import minidom


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


# ── 1. MOTHER ABSTRACT FEED ITEM CLASS (Base Contract) ──
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


# ── 2. CONCRETE CHILD SUBCLASSES (Inheritance Variety) ──
class ActivityFeedItem(BaseFeedItem):
    @property
    def title(self) -> str:
        item_type = self.raw_data.get("type", "Activity").capitalize()
        return f"[{item_type}] {self.raw_data.get('title', '')}"

    @property
    def link(self) -> str:
        return "https://iabdul-aal.me/"

    @property
    def description(self) -> str:
        return self.raw_data.get("detail", "")

    @property
    def pub_date(self) -> str:
        date_raw = self.raw_data.get("date_iso") or self.raw_data.get("date") or ""
        return format_rfc822(date_raw)

    @property
    def guid(self) -> str:
        date_iso = self.raw_data.get("date_iso", "")
        t_hash = make_hash(self.raw_data.get("title", ""))
        return f"https://iabdul-aal.me/#activity-{date_iso}-{t_hash}"


class PublicationFeedItem(BaseFeedItem):
    @property
    def title(self) -> str:
        return f"[Publication] {self.raw_data.get('title', '')}"

    @property
    def link(self) -> str:
        doi = self.raw_data.get("doi")
        if doi:
            return f"https://doi.org/{doi}"
        return self.raw_data.get("url") or "https://iabdul-aal.me/publications"

    @property
    def description(self) -> str:
        abstract = self.raw_data.get("abstract")
        venue = self.raw_data.get("venue", "")
        year = self.raw_data.get("year", "2026")
        return abstract or f"Published in {venue} ({year})."

    @property
    def pub_date(self) -> str:
        date_raw = self.raw_data.get("date") or f"{self.raw_data.get('year', '2026')}-01-01"
        return format_rfc822(date_raw)

    @property
    def guid(self) -> str:
        guid_id = self.raw_data.get("arxiv") or self.raw_data.get("doi") or make_hash(self.raw_data.get("title", ""))
        return f"https://iabdul-aal.me/publications#{guid_id}"


# ── 3. FEED GENERATOR BUILDER OBJECT ──
class RSSFeedGenerator:
    def __init__(self, root_dir: str):
        self.root_dir = root_dir
        self.items: list[BaseFeedItem] = []

    def load_activity(self, filepath: str):
        if not os.path.exists(filepath):
            return
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data.get("items", []):
                self.items.append(ActivityFeedItem(item))

    def load_publications(self, filepath: str):
        if not os.path.exists(filepath):
            return
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            for item in data:
                self.items.append(PublicationFeedItem(item))

    def generate(self, output_path: str):
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

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(pretty_xml)

        print(f"Successfully generated RSS feed with {len(self.items)} items at {output_path}")


def main():
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
