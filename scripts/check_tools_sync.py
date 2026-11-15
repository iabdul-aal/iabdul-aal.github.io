#!/usr/bin/env python3
"""
Verify sync between cv_data.json -> tools and lib/academic-content.ts -> projects.
Exits 0 if synced, 1 if out of sync.
"""
import json
import os
import sys

from config_helper import get_project_records


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cv_data_path = os.path.join(root, "data", "cv_data.json")

    with open(cv_data_path, "r", encoding="utf-8") as f:
        cv_data = json.load(f)

    tools_in_cv = {tool.get("id") for tool in cv_data.get("tools", []) if tool.get("id")}

    project_records = get_project_records()
    if not project_records:
        print("ERROR: Could not locate export const projects in academic-content.ts")
        sys.exit(1)

    projects_in_code = {proj.get("id") for proj in project_records if proj.get("id")}

    diff_cv = tools_in_cv - projects_in_code
    diff_code = projects_in_code - tools_in_cv

    if diff_cv or diff_code:
        print("ERROR: Tools/Projects sync mismatch between cv_data.json and academic-content.ts!")
        if diff_cv:
            print(f"  In cv_data.json but missing in academic-content.ts: {sorted(diff_cv)}")
        if diff_code:
            print(f"  In academic-content.ts but missing in cv_data.json: {sorted(diff_code)}")
        sys.exit(1)

    print(f"SUCCESS: Tools/Projects in sync ({len(tools_in_cv)} items matched).")
    sys.exit(0)


if __name__ == "__main__":
    main()
