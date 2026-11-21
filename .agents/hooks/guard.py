#!/usr/bin/env python3
"""
PreToolUse guard hook for run_command:
1. Blocks force-pushes to main/master and destructive origin resets.
2. Blocks commits containing [skip ci] when CV or data files are staged.
3. Validates check_tools_sync.py and verify_site.py --ci before allowing git push.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys


FORCE_PUSH_RE = re.compile(
    r"\bgit\s+push\b[^\n]*(?:--force(?:-with-lease)?|\s-f\b|\+[\w./-]+)",
    re.IGNORECASE,
)
HARD_ORIGIN_RESET_RE = re.compile(r"\bgit\s+reset\s+--hard\s+origin/", re.IGNORECASE)
SKIP_CI_RE = re.compile(r"\[\s*skip\s+ci\s*\]", re.IGNORECASE)
GIT_PUSH_RE = re.compile(r"\bgit\s+push\b", re.IGNORECASE)
GIT_COMMIT_RE = re.compile(r"\bgit\s+commit\b", re.IGNORECASE)


def _reply(decision: str, reason: str = "") -> int:
    payload = {"decision": decision}
    if reason:
        payload["reason"] = reason
    sys.stdout.write(json.dumps(payload))
    return 0


def _run_py(script_rel: str, args: list[str], cwd: str) -> tuple[bool, str]:
    script_path = os.path.join(cwd, script_rel)
    if not os.path.isfile(script_path):
        return True, ""
    proc = subprocess.run(
        [sys.executable, script_path, *args],
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    output = (proc.stdout or "") + (proc.stderr or "")
    return proc.returncode == 0, output.strip()


def _staged_files(cwd: str) -> list[str]:
    proc = subprocess.run(
        ["git", "diff", "--cached", "--name-only"],
        cwd=cwd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if proc.returncode != 0:
        return []
    return [line.strip() for line in proc.stdout.splitlines() if line.strip()]


def main() -> int:
    try:
        raw = sys.stdin.read()
        data = json.loads(raw) if raw.strip() else {}
    except Exception:
        return _reply("allow")

    tool_call = data.get("toolCall") or {}
    if tool_call.get("name") != "run_command":
        return _reply("allow")

    args = tool_call.get("args") or {}
    cmd = str(args.get("CommandLine") or "")
    if not cmd:
        return _reply("allow")

    workspace_paths = data.get("workspacePaths") or []
    cwd = str(data.get("cwd") or (workspace_paths[0] if workspace_paths else os.getcwd()))

    if FORCE_PUSH_RE.search(cmd):
        return _reply(
            "deny",
            "Blocked by workspace policy: force-pushing is disabled on this repository. Sync with git pull --rebase origin main instead.",
        )

    if HARD_ORIGIN_RESET_RE.search(cmd):
        return _reply(
            "deny",
            "Blocked by safety guard: avoid destructive hard resets onto remote branches when integrating work.",
        )

    if GIT_COMMIT_RE.search(cmd) and SKIP_CI_RE.search(cmd):
        staged = _staged_files(cwd)
        if any(p.startswith("data/") or p.startswith("public/cv") for p in staged):
            return _reply(
                "deny",
                "Blocked by CI pipeline policy: do not use [skip ci] on commits touching data/ or CV files because it suppresses downstream deployment.",
            )

    if GIT_PUSH_RE.search(cmd) and "--dry-run" not in cmd:
        for script_rel, script_args in (
            ("scripts/check_tools_sync.py", []),
            ("scripts/verify_site.py", ["--ci"]),
        ):
            ok, out = _run_py(script_rel, script_args, cwd)
            if not ok:
                snippet = "\n".join(out.splitlines()[:15])
                return _reply(
                    "deny",
                    f"Blocked git push: pre-push gate `{script_rel}` failed:\n{snippet}",
                )

    return _reply("allow")


if __name__ == "__main__":
    sys.exit(main())
