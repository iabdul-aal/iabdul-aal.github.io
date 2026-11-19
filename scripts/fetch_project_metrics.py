#!/usr/bin/env python3
"""
Fetch project engagement metrics from GitHub (stars, forks, watchers),
Zenodo (downloads, views), and HuggingFace (model/dataset downloads, likes)
for each project that has links. Writes data/project_metrics.json.
"""

from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from config_helper import get_projects

ROOT = Path(__file__).parent.parent
OUT_FILE = ROOT / "data" / "project_metrics.json"


def _fetch_json(url: str, headers: dict[str, str] | None = None) -> dict:
    req = urllib.request.Request(url)
    req.add_header("User-Agent", "academic-project-metrics/1.1")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read().decode("utf-8"))


def github_stats(repo: str, token: str | None) -> dict:
    url = f"https://api.github.com/repos/{repo}"
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    try:
        data = _fetch_json(url, headers=headers)
        return {
            "stars": data.get("stargazers_count", 0),
            "forks": data.get("forks_count", 0),
            "watchers": data.get("watchers_count", 0),
            "open_issues": data.get("open_issues_count", 0),
            "pushed_at": data.get("pushed_at", ""),
        }
    except urllib.error.HTTPError as e:
        print(f"  [warn] GitHub HTTP {e.code} for {repo}; using zero defaults.")
    except Exception as e:
        print(f"  [warn] GitHub error for {repo}: {e}")
    return {"stars": 0, "forks": 0, "watchers": 0, "open_issues": 0, "pushed_at": ""}


def zenodo_stats(record_id: str) -> dict:
    url = f"https://zenodo.org/api/records/{record_id}"
    try:
        data = _fetch_json(url)
        stats = data.get("stats", {})
        return {
            "downloads": stats.get("downloads", 0),
            "unique_downloads": stats.get("unique_downloads", 0),
            "views": stats.get("views", 0),
            "unique_views": stats.get("unique_views", 0),
        }
    except urllib.error.HTTPError as e:
        print(f"  [warn] Zenodo HTTP {e.code} for record {record_id}.")
    except Exception as e:
        print(f"  [warn] Zenodo error for record {record_id}: {e}")
    return {"downloads": 0, "unique_downloads": 0, "views": 0, "unique_views": 0}


def huggingface_stats(kind: str, repo_id: str) -> dict:
    """Fetch stats for HuggingFace `models` or `datasets`."""
    url = f"https://huggingface.co/api/{kind}/{repo_id}"
    try:
        data = _fetch_json(url)
        downloads = data.get("downloadsAllTime")
        if downloads is None:
            downloads = data.get("downloads", 0)
        return {
            "id": repo_id,
            "downloads": int(downloads or 0),
            "likes": int(data.get("likes", 0) or 0),
        }
    except urllib.error.HTTPError as e:
        print(f"  [warn] HuggingFace {kind} HTTP {e.code} for {repo_id}.")
    except Exception as e:
        print(f"  [warn] HuggingFace {kind} error for {repo_id}: {e}")
    return {"id": repo_id, "downloads": 0, "likes": 0}


def main() -> None:
    token = os.environ.get("GITHUB_TOKEN")
    projects = get_projects()
    existing_projects: dict[str, dict] = {}
    if OUT_FILE.exists():
        try:
            existing_projects = json.loads(OUT_FILE.read_text(encoding="utf-8")).get("projects", {})
        except Exception:
            existing_projects = {}
    metrics: dict[str, dict] = {}

    for project in projects:
        pid = project["id"]
        prev = existing_projects.get(pid, {})
        print(f"Fetching metrics for {pid}...")
        entry: dict = {
            "stars": prev.get("stars", 0),
            "forks": prev.get("forks", 0),
            "watchers": prev.get("watchers", 0),
            "open_issues": prev.get("open_issues", 0),
            "pushed_at": prev.get("pushed_at", ""),
        }

        if project.get("github"):
            gh = github_stats(project["github"], token)
            if gh.get("pushed_at") or gh.get("stars") or not prev:
                entry.update(gh)
            print(f"  GitHub: stars={entry['stars']}, forks={entry['forks']}")
            time.sleep(0.3)

        if project.get("zenodo_id"):
            zn = zenodo_stats(project["zenodo_id"])
            if zn.get("views") or zn.get("downloads") or "zenodo" not in prev:
                entry["zenodo"] = zn
            else:
                entry["zenodo"] = prev["zenodo"]
            print(f"  Zenodo: downloads={entry['zenodo']['downloads']}, views={entry['zenodo']['views']}")
            time.sleep(0.3)

        hf_entry: dict = {}
        prev_hf = prev.get("huggingface", {}) if isinstance(prev.get("huggingface"), dict) else {}
        if project.get("huggingface"):
            hf_model = huggingface_stats("models", project["huggingface"])
            if not hf_model.get("downloads") and not hf_model.get("likes") and isinstance(prev_hf.get("model"), dict):
                hf_model = prev_hf["model"]
            hf_entry["model"] = hf_model
            print(f"  HF Model: downloads={hf_model['downloads']}, likes={hf_model['likes']}")
            time.sleep(0.2)

        if project.get("huggingfaceDataset"):
            hf_ds = huggingface_stats("datasets", project["huggingfaceDataset"])
            if not hf_ds.get("downloads") and not hf_ds.get("likes") and isinstance(prev_hf.get("dataset"), dict):
                hf_ds = prev_hf["dataset"]
            hf_entry["dataset"] = hf_ds
            print(f"  HF Dataset: downloads={hf_ds['downloads']}, likes={hf_ds['likes']}")
            time.sleep(0.2)

        if hf_entry:
            hf_downloads = sum(v.get("downloads", 0) for v in hf_entry.values())
            hf_likes = sum(v.get("likes", 0) for v in hf_entry.values())
            entry["huggingface"] = {
                **hf_entry,
                "downloads": hf_downloads,
                "likes": hf_likes,
            }

        hf_stats = entry.get("huggingface", {})
        entry["score"] = (
            entry.get("stars", 0) * 10
            + entry.get("forks", 0) * 5
            + entry.get("zenodo", {}).get("downloads", 0) * 2
            + entry.get("zenodo", {}).get("views", 0)
            + hf_stats.get("downloads", 0) * 2
            + hf_stats.get("likes", 0) * 5
        )

        metrics[pid] = entry

    out = {
        "projects": metrics,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
    }
    OUT_FILE.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_FILE}")


if __name__ == "__main__":
    main()
