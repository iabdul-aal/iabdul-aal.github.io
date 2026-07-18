#!/usr/bin/env python3
"""
Fetch project engagement metrics from GitHub (stars, forks, watchers)
and Zenodo (downloads) for each project that has links.
Writes project_metrics.json.
"""

import json
import os
import re
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).parent.parent
OUT_FILE = ROOT / "data" / "project_metrics.json"

from config_helper import get_projects

PROJECTS = get_projects()


def github_stats(repo: str, token: str | None) -> dict:
    url = f"https://api.github.com/repos/{repo}"
    req = urllib.request.Request(url)
    req.add_header("Accept", "application/vnd.github+json")
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            data = json.loads(r.read())
            return {
                "stars": data.get("stargazers_count", 0),
                "forks": data.get("forks_count", 0),
                "watchers": data.get("watchers_count", 0),
                "open_issues": data.get("open_issues_count", 0),
                "pushed_at": data.get("pushed_at", ""),
            }
    except Exception as e:
        print(f"  GitHub error for {repo}: {e}")
        return {"stars": 0, "forks": 0, "watchers": 0, "open_issues": 0, "pushed_at": ""}


def zenodo_stats(record_id: str) -> dict:
    url = f"https://zenodo.org/api/records/{record_id}"
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            data = json.loads(r.read())
            stats = data.get("stats", {})
            return {
                "downloads": stats.get("downloads", 0),
                "unique_downloads": stats.get("unique_downloads", 0),
                "views": stats.get("views", 0),
                "unique_views": stats.get("unique_views", 0),
            }
    except Exception as e:
        print(f"  Zenodo error for record {record_id}: {e}")
        return {"downloads": 0, "unique_downloads": 0, "views": 0, "unique_views": 0}


def main() -> None:
    token = os.environ.get("GITHUB_TOKEN")
    metrics: dict[str, dict] = {}

    for project in PROJECTS:
        pid = project["id"]
        print(f"Fetching metrics for {pid}...")
        entry: dict = {}

        if project.get("github"):
            gh = github_stats(project["github"], token)
            entry.update(gh)
            print(f"  GitHub: stars={gh['stars']}, forks={gh['forks']}")
            time.sleep(0.3)

        if project.get("zenodo_id"):
            zn = zenodo_stats(project["zenodo_id"])
            entry["zenodo"] = zn
            print(f"  Zenodo: downloads={zn['downloads']}, views={zn['views']}")
            time.sleep(0.3)

        # Composite engagement score for ranking
        entry["score"] = (
            entry.get("stars", 0) * 10
            + entry.get("forks", 0) * 5
            + entry.get("zenodo", {}).get("downloads", 0) * 2
            + entry.get("zenodo", {}).get("views", 0)
        )

        metrics[pid] = entry

    out = {
        "projects": metrics,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
    }
    OUT_FILE.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"Wrote {OUT_FILE}")


if __name__ == "__main__":
    main()
