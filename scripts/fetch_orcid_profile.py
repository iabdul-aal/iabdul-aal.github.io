#!/usr/bin/env python3
"""Fetch public ORCID profile data and generate orcid_profile.json."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

ORCID_ID = "0009-0004-9300-3936"
ORCID_BASE_URL = f"https://pub.orcid.org/v3.0/{ORCID_ID}"
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "orcid_profile.json"


def nested_value(data: Any, *keys: str) -> str:
    current = data
    for key in keys:
        if not isinstance(current, dict):
            return ""
        current = current.get(key)

    if current is None:
        return ""

    return str(current).strip()


def fetch_json(endpoint: str) -> dict[str, Any]:
    response = requests.get(
        f"{ORCID_BASE_URL}/{endpoint}",
        headers={
            "Accept": "application/json",
            "User-Agent": "orcid-profile-sync/1.0",
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def compact_whitespace(text: str) -> str:
    # Some records may contain mojibake (UTF-8 bytes decoded as Latin-1).
    # Attempt a reversible repair pass before normalizing whitespace.
    try:
        repaired = text.encode("latin-1").decode("utf-8")
        if repaired.count("�") <= text.count("�"):
            text = repaired
    except UnicodeError:
        pass

    normalized_lines = [" ".join(line.split()) for line in text.splitlines()]
    return "\n".join(line for line in normalized_lines if line).strip()


def format_period(start: Any, end: Any) -> str:
    start_year = nested_value(start, "year", "value")
    end_year = nested_value(end, "year", "value")
    if start_year and end_year:
        return f"{start_year} - {end_year}"
    if start_year and not end_year:
        return f"{start_year} - Present"
    if end_year and not start_year:
        return end_year
    return ""


def extract_profile(person: dict[str, Any]) -> dict[str, Any]:
    credit_name = nested_value(person, "name", "credit-name", "value")
    given_names = nested_value(person, "name", "given-names", "value")
    family_name = nested_value(person, "name", "family-name", "value")
    full_name = credit_name or " ".join(part for part in [given_names, family_name] if part)

    biography = compact_whitespace(nested_value(person, "biography", "content"))

    keywords = []
    for item in person.get("keywords", {}).get("keyword", []):
        content = nested_value(item, "content")
        if content and content not in keywords:
            keywords.append(content)

    researcher_urls = []
    for item in person.get("researcher-urls", {}).get("researcher-url", []):
        name = nested_value(item, "url-name")
        url = nested_value(item, "url", "value")
        if url:
            researcher_urls.append(
                {
                    "name": name or "Profile",
                    "url": url,
                }
            )

    return {
        "name": full_name,
        "biography": biography,
        "keywords": keywords,
        "researcherUrls": researcher_urls,
    }


def extract_educations(educations: dict[str, Any]) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []

    for group in educations.get("affiliation-group", []):
        for summary in group.get("summaries", []):
            edu = summary.get("education-summary", {})
            role = nested_value(edu, "role-title")
            department = nested_value(edu, "department-name")
            org = nested_value(edu, "organization", "name")
            period = format_period(edu.get("start-date"), edu.get("end-date"))

            degree = role
            if department:
                degree = f"{role} in {department}" if role else department

            items.append(
                {
                    "degree": degree or "Education",
                    "org": org or "Unknown institution",
                    "period": period,
                    "summary": "",
                }
            )

    def sort_key(item: dict[str, str]) -> tuple[int, str]:
        period = item.get("period", "")
        start = period.split(" - ")[0].strip()
        return (int(start) if start.isdigit() else 0, item.get("degree", ""))

    return sorted(items, key=sort_key, reverse=True)


def extract_memberships(memberships: dict[str, Any]) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []

    for group in memberships.get("affiliation-group", []):
        for summary in group.get("summaries", []):
            membership = summary.get("membership-summary", {})
            org = nested_value(membership, "organization", "name")
            role = nested_value(membership, "role-title")
            period = format_period(membership.get("start-date"), membership.get("end-date"))

            detail_parts = [part for part in [role or "Member", period] if part]
            items.append(
                {
                    "organization": org or "Professional Organization",
                    "detail": " | ".join(detail_parts),
                }
            )

    return items


def main() -> None:
    person = fetch_json("person")
    educations = fetch_json("educations")
    memberships = fetch_json("memberships")

    payload = {
        "orcid": ORCID_ID,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
        "profile": extract_profile(person),
        "educations": extract_educations(educations),
        "memberships": extract_memberships(memberships),
    }

    OUTPUT_PATH.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote ORCID profile snapshot to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
