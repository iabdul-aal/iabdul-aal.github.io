#!/usr/bin/env python3
"""
Deterministic agentic pre-push and CI site validator for iabdul-aal.github.io.

Validates character rules, content governance, PII/link hygiene, data sync,
and cross-references across data/, lib/, app/, components/, docs/, and public/feed.xml.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Any

from config_helper import (
    _decode_ts_string,
    _skip_comment,
    _skip_string,
    extract_ts_array_block,
    get_project_records,
    get_research_themes,
    parse_ts_top_level_fields,
    split_top_level_objects,
)

try:
    sys.stdout.reconfigure(encoding="utf-8")
except AttributeError:
    pass

ROOT = Path(__file__).resolve().parents[1]

COMMERCIAL_SOFTWARE_RE = re.compile(r"\b(MATLAB|COMSOL|Lumerical|ANSYS)\b", re.IGNORECASE)
STANDALONE_AMP_RE = re.compile(r"(?<![&\w])&(?![&\w])")
URL_RE = re.compile(r"https?://[^\s\"'<>`]+")
RAW_SUB_RE = re.compile(r"<\s*/?\s*sub\s*>|&lt;\s*/?\s*sub\s*&gt;", re.IGNORECASE)
S3_PRESIGNED_RE = re.compile(r"X-Amz-(?:Date|Expires|Signature)\b", re.IGNORECASE)
PHONE_PII_RE = re.compile(r"(?:\+?49[\s\-]*163\b|\b0163[\s\-]*\d{5,})")
MATRIKEL_RE = re.compile(r"\bMatrikel[- ]?(?:Nr\.?|Nummer)?\b", re.IGNORECASE)
STREET_PII_RE = re.compile(
    r"\b[A-Z\u00c4\u00d6\u00dc][a-z\u00e4\u00f6\u00fc\u00df]{2,}(?:stra\u00dfe|strasse|str\.|weg|gasse|allee)\s+\d+[a-z]?\b"
)
AI_SLOP_CLASSES = ("hero-glow-bg", "glass-card", "animate-ping")
BANNED_COPY_RE = re.compile(r"\bMentor(?:ship|ing)\b", re.IGNORECASE)
DISALLOWED_SECURITY_RE = re.compile(
    r"(?:mailto:contact@iabdul-aal\.me|https?://iabdul-aal\.me/contact)\b",
    re.IGNORECASE,
)
LATEX_BULLET_RE = re.compile(r"\\begin\{itemize\}|\\item\b")
LATEX_SOFTWARE_SECTION_RE = re.compile(
    r"\\section\{(?:Featured Software|Ausgew[^\}]*Software)\}",
    re.IGNORECASE,
)
KNOWN_DEAD_LINKS = (
    "github.com/iabdul-aal/NanoPhotoNet-MPM",
    "10.5281/zenodo.19652934",
)


def _rel(path: Path) -> str:
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return str(path)


def _iter_json_strings(node: Any, prefix: str = "$") -> list[tuple[str, str]]:
    found: list[tuple[str, str]] = []
    if isinstance(node, str):
        found.append((prefix, node))
    elif isinstance(node, list):
        for idx, item in enumerate(node):
            found.extend(_iter_json_strings(item, f"{prefix}[{idx}]"))
    elif isinstance(node, dict):
        for key, val in node.items():
            found.extend(_iter_json_strings(val, f"{prefix}.{key}"))
    return found


def _extract_ts_string_literals(content: str) -> list[tuple[int, str]]:
    """Extract (line_number, decoded_text) for TS string literals, skipping comments and ${...}."""
    literals: list[tuple[int, str]] = []
    i = 0
    n = len(content)
    while i < n:
        ch = content[i]
        if ch == "/":
            next_i = _skip_comment(content, i)
            if next_i != i:
                i = next_i
                continue
        if ch in ('"', "'", "`"):
            line_no = content.count("\n", 0, i) + 1
            end = _skip_string(content, i)
            raw_token = content[i:end]
            decoded = _decode_ts_string(raw_token)
            if ch == "`":
                decoded = re.sub(r"\$\{[^}]*\}", " ", decoded)
            literals.append((line_no, decoded))
            i = end
            continue
        i += 1
    return literals


def _strip_urls(text: str) -> str:
    without_urls = URL_RE.sub(" ", text)
    return re.sub(r"\?[^\s\"'<>`]+", " ", without_urls)


def _collect_scan_files() -> dict[str, list[Path]]:
    data_json = sorted((ROOT / "data").glob("*.json")) if (ROOT / "data").exists() else []
    data_tex = sorted((ROOT / "data").glob("*.tex")) if (ROOT / "data").exists() else []
    lib_ts = sorted((ROOT / "lib").rglob("*.ts")) if (ROOT / "lib").exists() else []
    app_tsx = sorted((ROOT / "app").rglob("*.tsx")) if (ROOT / "app").exists() else []
    app_ts = sorted((ROOT / "app").rglob("*.ts")) if (ROOT / "app").exists() else []
    app_css = sorted((ROOT / "app").rglob("*.css")) if (ROOT / "app").exists() else []
    comp_tsx = sorted((ROOT / "components").rglob("*.tsx")) if (ROOT / "components").exists() else []
    comp_ts = sorted((ROOT / "components").rglob("*.ts")) if (ROOT / "components").exists() else []
    docs_md = sorted((ROOT / "docs").glob("*.md")) if (ROOT / "docs").exists() else []
    extra_docs = [
        p
        for p in (
            ROOT / "README.md",
            ROOT / ".github" / "SECURITY.md",
            ROOT / "public" / ".well-known" / "security.txt",
        )
        if p.exists()
    ]
    feed_xml = [ROOT / "public" / "feed.xml"] if (ROOT / "public" / "feed.xml").exists() else []
    return {
        "data_json": data_json,
        "data_tex": data_tex,
        "lib_ts": lib_ts,
        "app_tsx": app_tsx,
        "app_ts": app_ts,
        "app_css": app_css,
        "comp_tsx": comp_tsx,
        "comp_ts": comp_ts,
        "docs_md": docs_md,
        "extra_docs": extra_docs,
        "feed_xml": feed_xml,
    }


def check_em_dash(files: dict[str, list[Path]], errors: list[str]) -> None:
    targets = (
        files["data_json"]
        + files["data_tex"]
        + files["lib_ts"]
        + files["app_tsx"]
        + files["app_ts"]
        + files["app_css"]
        + files["comp_tsx"]
        + files["comp_ts"]
        + files["docs_md"]
        + files["extra_docs"]
        + files["feed_xml"]
    )
    for path in targets:
        text = path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), 1):
            if "\u2014" in line:
                errors.append(f"[em-dash] {_rel(path)}:{lineno}: forbidden Unicode em-dash U+2014 found.")


DOT_DIVIDER_RE = re.compile(r"[\u00b7\u2022\u22c5\u2027]|&middot;|&bull;", re.IGNORECASE)


def check_dot_dividers(files: dict[str, list[Path]], errors: list[str]) -> None:
    targets = (
        files["data_json"]
        + files["data_tex"]
        + files["lib_ts"]
        + files["app_tsx"]
        + files["app_ts"]
        + files["comp_tsx"]
        + files["comp_ts"]
        + files["feed_xml"]
    )
    for path in targets:
        text = path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), 1):
            if DOT_DIVIDER_RE.search(line):
                errors.append(f"[dot-divider] {_rel(path)}:{lineno}: forbidden dot/bullet divider found; use comma or hyphen instead.")


def check_standalone_ampersands(errors: list[str]) -> None:
    json_targets = [
        ROOT / "data" / "cv_data.json",
        ROOT / "data" / "publications.json",
        ROOT / "data" / "milestones.json",
    ]
    for path in json_targets:
        if not path.exists():
            continue
        try:
            payload = json.loads(path.read_text(encoding="utf-8-sig"))
        except json.JSONDecodeError as exc:
            errors.append(f"[json] {_rel(path)}: invalid JSON ({exc}).")
            continue
        for jpath, val in _iter_json_strings(payload):
            cleaned = _strip_urls(val)
            if STANDALONE_AMP_RE.search(cleaned):
                errors.append(f"[ampersand] {_rel(path)} ({jpath}): standalone '&' connective in value {val!r}.")

    ts_targets = [
        ROOT / "lib" / "academic-content.ts",
        ROOT / "lib" / "i18n.ts",
    ]
    for path in ts_targets:
        if not path.exists():
            continue
        content = path.read_text(encoding="utf-8")
        for lineno, literal in _extract_ts_string_literals(content):
            cleaned = _strip_urls(literal)
            if STANDALONE_AMP_RE.search(cleaned):
                errors.append(f"[ampersand] {_rel(path)}:{lineno}: standalone '&' connective in string {literal!r}.")


def check_commercial_software(files: dict[str, list[Path]], errors: list[str]) -> None:
    json_targets = [
        ROOT / "data" / "cv_data.json",
        ROOT / "data" / "publications.json",
        ROOT / "data" / "milestones.json",
    ]
    for path in json_targets:
        if not path.exists():
            continue
        try:
            payload = json.loads(path.read_text(encoding="utf-8-sig"))
        except json.JSONDecodeError:
            continue
        for jpath, val in _iter_json_strings(payload):
            m = COMMERCIAL_SOFTWARE_RE.search(val)
            if m:
                errors.append(f"[software-brand] {_rel(path)} ({jpath}): commercial software name '{m.group(0)}' found.")

    code_targets = [
        ROOT / "lib" / "academic-content.ts",
        ROOT / "lib" / "i18n.ts",
    ] + files["data_tex"] + files["app_tsx"] + files["comp_tsx"] + files["extra_docs"]
    for path in code_targets:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        for lineno, line in enumerate(text.splitlines(), 1):
            m = COMMERCIAL_SOFTWARE_RE.search(line)
            if m:
                errors.append(f"[software-brand] {_rel(path)}:{lineno}: commercial software name '{m.group(0)}' found.")


def check_pii_s3_and_ai_slop(files: dict[str, list[Path]], errors: list[str]) -> None:
    cv_path = ROOT / "data" / "cv_data.json"
    if cv_path.exists():
        try:
            cv_data = json.loads(cv_path.read_text(encoding="utf-8-sig"))
            phone = str(cv_data.get("personalInfo", {}).get("phone", "") or "").strip()
            if phone:
                errors.append(f"[pii] data/cv_data.json: personalInfo.phone must be empty/omitted (found {phone!r}).")
        except json.JSONDecodeError:
            pass

    pii_targets = (
        files["data_json"]
        + files["data_tex"]
        + files["lib_ts"]
        + files["app_tsx"]
        + files["comp_tsx"]
        + files["docs_md"]
        + files["extra_docs"]
        + files["feed_xml"]
    )
    for path in pii_targets:
        text = path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), 1):
            if PHONE_PII_RE.search(line):
                errors.append(f"[pii] {_rel(path)}:{lineno}: personal mobile phone pattern found.")
            if MATRIKEL_RE.search(line):
                errors.append(f"[pii] {_rel(path)}:{lineno}: Matrikel-Nr pattern found.")
            if STREET_PII_RE.search(line):
                errors.append(f"[pii] {_rel(path)}:{lineno}: personal street address pattern found.")
            if S3_PRESIGNED_RE.search(line):
                errors.append(f"[presigned-url] {_rel(path)}:{lineno}: AWS S3 presigned URL parameter found.")

    sec_path = ROOT / "public" / ".well-known" / "security.txt"
    if sec_path.exists():
        sec_text = sec_path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(sec_text.splitlines(), 1):
            if DISALLOWED_SECURITY_RE.search(line):
                errors.append(f"[security-txt] {_rel(sec_path)}:{lineno}: stale non-existent contact reference found.")

    banned_copy_targets = (
        [ROOT / "data" / "cv_data.json", ROOT / "lib" / "academic-content.ts", ROOT / "lib" / "i18n.ts"]
        + files["data_tex"]
        + files["app_tsx"]
        + files["comp_tsx"]
    )
    for path in banned_copy_targets:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), 1):
            m = BANNED_COPY_RE.search(line)
            if m:
                errors.append(f"[banned-copy] {_rel(path)}:{lineno}: banned term '{m.group(0)}' found.")

    ui_targets = files["app_tsx"] + files["app_ts"] + files["app_css"] + files["comp_tsx"] + files["comp_ts"]
    for path in ui_targets:
        text = path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), 1):
            for cls in AI_SLOP_CLASSES:
                if cls in line:
                    errors.append(f"[ai-slop] {_rel(path)}:{lineno}: forbidden CSS class '{cls}' found.")


def check_data_integrity(files: dict[str, list[Path]], errors: list[str]) -> None:
    # 1. Valid JSON across data/*.json
    for path in files["data_json"]:
        try:
            json.loads(path.read_text(encoding="utf-8-sig"))
        except json.JSONDecodeError as exc:
            errors.append(f"[json] {_rel(path)}: invalid JSON ({exc}).")

    # 2. Valid XML for public/feed.xml
    feed_path = ROOT / "public" / "feed.xml"
    if feed_path.exists():
        try:
            ET.fromstring(feed_path.read_text(encoding="utf-8-sig"))
        except ET.ParseError as exc:
            errors.append(f"[xml] public/feed.xml: invalid XML ({exc}).")

    # 3. Tools/Projects sync
    cv_path = ROOT / "data" / "cv_data.json"
    projects = get_project_records()
    if cv_path.exists():
        try:
            cv_data = json.loads(cv_path.read_text(encoding="utf-8-sig"))
            tools_ids = {t.get("id") for t in cv_data.get("tools", []) if isinstance(t, dict) and t.get("id")}
            project_ids = {p.get("id") for p in projects if p.get("id")}
            if tools_ids != project_ids:
                only_cv = sorted(tools_ids - project_ids)
                only_ts = sorted(project_ids - tools_ids)
                errors.append(
                    f"[tools-sync] cv_data.json tools and academic-content.ts projects differ "
                    f"(only_cv={only_cv}, only_ts={only_ts})."
                )
        except json.JSONDecodeError:
            pass

    # 4. Valid relatedThemes references in academic-content.ts and lib/publications.ts
    themes = get_research_themes()
    valid_theme_ids = {t.get("id") for t in themes if t.get("id")}
    if not valid_theme_ids:
        errors.append("[themes] Could not extract researchThemes IDs from lib/academic-content.ts.")
    else:
        for proj in projects:
            pid = proj.get("id", "<unknown>")
            rel_themes = proj.get("relatedThemes") or []
            if isinstance(rel_themes, list):
                for theme_id in rel_themes:
                    if theme_id not in valid_theme_ids:
                        errors.append(
                            f"[themes] lib/academic-content.ts project '{pid}' references unknown theme '{theme_id}'."
                        )

        pubs_ts = ROOT / "lib" / "publications.ts"
        if pubs_ts.exists():
            pubs_text = pubs_ts.read_text(encoding="utf-8")
            for m in re.finditer(r"relatedThemes:\s*\[([^\]]*)\]", pubs_text, re.DOTALL):
                for theme_id in re.findall(r'["\']([^"\']+)["\']', m.group(1)):
                    if theme_id not in valid_theme_ids:
                        errors.append(
                            f"[themes] lib/publications.ts override references unknown theme '{theme_id}'."
                        )

    # 5. Zero raw <sub> tags in publications.json, activity.json, feed.xml, cv_data.json
    sub_targets = [
        ROOT / "data" / "publications.json",
        ROOT / "data" / "activity.json",
        ROOT / "data" / "cv_data.json",
        ROOT / "public" / "feed.xml",
    ]
    for path in sub_targets:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), 1):
            if RAW_SUB_RE.search(line):
                errors.append(f"[raw-html-sub] {_rel(path)}:{lineno}: raw <sub> HTML tag found.")

    # 6. Zero known dead links in data/*.json and lib/*.ts
    for path in files["data_json"] + files["lib_ts"]:
        text = path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(text.splitlines(), 1):
            for dead in KNOWN_DEAD_LINKS:
                if dead in line:
                    errors.append(f"[dead-link] {_rel(path)}:{lineno}: dead/obsolete link '{dead}' found.")


def check_content_governance(errors: list[str]) -> None:
    def _word_count(text: str) -> int:
        return len([w for w in text.strip().split() if w])

    # Hero statement (20-35 words)
    cv_path = ROOT / "data" / "cv_data.json"
    if cv_path.exists():
        try:
            cv_data = json.loads(cv_path.read_text(encoding="utf-8-sig"))
            ri = str(cv_data.get("researchInterests", "")).strip()
            wc = _word_count(ri)
            if not (20 <= wc <= 35):
                errors.append(
                    f"[content-length] data/cv_data.json researchInterests has {wc} words (expected 20-35)."
                )
        except json.JSONDecodeError:
            pass

    ac_path = ROOT / "lib" / "academic-content.ts"
    if ac_path.exists():
        ac_text = ac_path.read_text(encoding="utf-8")
        m = re.search(r'export const homepageResearchStatement\s*=\s*["\']([^"\']+)["\']', ac_text)
        if m:
            wc = _word_count(m.group(1))
            if not (20 <= wc <= 35):
                errors.append(
                    f"[content-length] lib/academic-content.ts homepageResearchStatement has {wc} words (expected 20-35)."
                )

    i18n_path = ROOT / "lib" / "i18n.ts"
    if i18n_path.exists():
        i18n_text = i18n_path.read_text(encoding="utf-8")
        en_match = re.search(r"\ben\s*:\s*\{", i18n_text)
        if en_match:
            en_block = i18n_text[en_match.start() :]
            de_match = re.search(r"\bde\s*:\s*\{", en_block)
            if de_match:
                en_block = en_block[: de_match.start()]
            stmt_match = re.search(r'statement:\s*\n?\s*"([^"]+)"', en_block)
            if stmt_match:
                wc = _word_count(stmt_match.group(1))
                if not (20 <= wc <= 35):
                    errors.append(
                        f"[content-length] lib/i18n.ts en.identity.statement has {wc} words (expected 20-35)."
                    )

    # Research themes descriptions (25-45 words each for problem, methods, physicalRelevance)
    themes = get_research_themes()
    for theme in themes:
        tid = theme.get("id", "<unknown>")
        for field in ("problem", "methods", "physicalRelevance"):
            val = str(theme.get(field, "")).strip()
            wc = _word_count(val)
            if not (25 <= wc <= 45):
                errors.append(
                    f"[content-length] lib/academic-content.ts researchThemes['{tid}'].{field} "
                    f"has {wc} words (expected 25-45)."
                )

    # Materials hero description (20-35 words in i18n en block)
    if i18n_path.exists():
        i18n_text = i18n_path.read_text(encoding="utf-8")
        en_match = re.search(r"\ben\s*:\s*\{", i18n_text)
        if en_match:
            en_block = i18n_text[en_match.start() :]
            de_match = re.search(r"\bde\s*:\s*\{", en_block)
            if de_match:
                en_block = en_block[: de_match.start()]
            mat_match = re.search(r'materialsDesc:\s*\n?\s*"([^"]+)"', en_block)
            if mat_match:
                wc = _word_count(mat_match.group(1))
                if not (20 <= wc <= 35):
                    errors.append(
                        f"[content-length] lib/i18n.ts en.headers.materialsDesc has {wc} words (expected 20-35)."
                    )

    # Activity details (8-22 words per docs/CONTENT.md)
    activity_path = ROOT / "data" / "activity.json"
    if activity_path.exists():
        try:
            activity_data = json.loads(activity_path.read_text(encoding="utf-8-sig"))
            for idx, item in enumerate(activity_data.get("items", [])):
                detail = str(item.get("detail", "")).strip()
                if detail:
                    wc = _word_count(detail)
                    if not (8 <= wc <= 22):
                        errors.append(
                            f"[content-length] data/activity.json items[{idx}].detail has {wc} words (expected 8-22)."
                        )
        except json.JSONDecodeError:
            pass

    # About narrative paragraphs (<= 60 words hard limit per docs/CONTENT.md)
    if ac_path.exists():
        ac_text = ac_path.read_text(encoding="utf-8")
        about_body = extract_ts_array_block(ac_text, "aboutParagraphs")
        if about_body:
            for idx, (_, para) in enumerate(_extract_ts_string_literals(about_body)):
                wc = _word_count(para)
                if wc > 60:
                    errors.append(
                        f"[content-length] lib/academic-content.ts aboutParagraphs[{idx}] "
                        f"has {wc} words (hard limit 60)."
                    )

    # Not-found metadata description length (>= 120 chars)
    not_found_path = ROOT / "app" / "not-found.tsx"
    if not_found_path.exists():
        nf_text = not_found_path.read_text(encoding="utf-8")
        desc_match = re.search(r'description:\s*\n?\s*["\'`]([^"\'`]+)["\'`]', nf_text)
        if desc_match:
            resolved_desc = desc_match.group(1).strip()
            if "${siteConfig.name}" in resolved_desc and cv_path.exists():
                try:
                    name = json.loads(cv_path.read_text(encoding="utf-8-sig")).get("personalInfo", {}).get("name", "")
                    resolved_desc = resolved_desc.replace("${siteConfig.name}", name)
                except json.JSONDecodeError:
                    pass
            if len(resolved_desc) < 120:
                errors.append(
                    f"[seo-meta] app/not-found.tsx metadata description is under 120 chars ({len(resolved_desc)})."
                )

    # Static public asset health checks (PDFs and core images)
    for pdf_name in ("cv.pdf", "cv_de.pdf"):
        pdf_path = ROOT / "public" / pdf_name
        if not pdf_path.exists():
            errors.append(f"[assets] public/{pdf_name} is missing.")
        else:
            header = pdf_path.read_bytes()[:5]
            if header != b"%PDF-":
                errors.append(f"[assets] public/{pdf_name} is not a valid PDF file.")

    for img_rel in (
        "logo.png",
        "favicon.png",
        "personal-pic.png",
        "images/homepage-toc.png",
        "images/integrated-nanophotonics.png",
        "images/nonlinear-quantum-photonics.png",
        "images/intelligent-photonics.png",
    ):
        img_path = ROOT / "public" / img_rel
        if not img_path.exists() or img_path.stat().st_size == 0:
            errors.append(f"[assets] public/{img_rel} is missing or empty.")

    # CV TeX governance: zero bullet lists and zero software/tools section
    for tex_name in ("cv.tex", "cv_de.tex"):
        tex_path = ROOT / "data" / tex_name
        if not tex_path.exists():
            continue
        tex_text = tex_path.read_text(encoding="utf-8", errors="replace")
        for lineno, line in enumerate(tex_text.splitlines(), 1):
            if LATEX_BULLET_RE.search(line):
                errors.append(f"[cv-tex] data/{tex_name}:{lineno}: bullet list macro is forbidden in CV TeX.")
            if LATEX_SOFTWARE_SECTION_RE.search(line):
                errors.append(f"[cv-tex] data/{tex_name}:{lineno}: software/projects section is forbidden in CV TeX.")


def check_built_html(errors: list[str]) -> None:
    out_dir = ROOT / "out"
    if not out_dir.exists():
        return
    for page_name in (
        "index.html",
        "about.html",
        "research.html",
        "publications.html",
        "tools.html",
        "materials.html",
        "cv.html",
        "404.html",
    ):
        html_path = out_dir / page_name
        if not html_path.exists():
            errors.append(f"[static-html] out/{page_name} is missing after build.")
            continue
        html = html_path.read_text(encoding="utf-8", errors="replace")
        if "BAILOUT_TO_CLIENT_SIDE_RENDERING" in html:
            errors.append(
                f"[static-html] out/{page_name} contains BAILOUT_TO_CLIENT_SIDE_RENDERING SSR fallback."
            )
        rendered_markup = re.sub(r"<(?:script|style)\b[^>]*>.*?</(?:script|style)>", " ", html, flags=re.DOTALL | re.IGNORECASE)
        if DOT_DIVIDER_RE.search(rendered_markup):
            errors.append(
                f"[dot-divider] out/{page_name} contains forbidden middle-dot or bullet divider in rendered HTML."
            )


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate content, governance, sync, and hygiene across the site.")
    parser.add_argument("--ci", action="store_true", help="Run in strict CI verification mode.")
    args = parser.parse_args()

    files = _collect_scan_files()
    errors: list[str] = []

    check_em_dash(files, errors)
    check_dot_dividers(files, errors)
    check_standalone_ampersands(errors)
    check_commercial_software(files, errors)
    check_pii_s3_and_ai_slop(files, errors)
    check_data_integrity(files, errors)
    check_content_governance(errors)
    check_built_html(errors)

    mode = "CI" if args.ci else "local"
    if errors:
        print(f"FAIL [{mode}]: {len(errors)} verification issue(s) detected:")
        for err in errors:
            print(f"  - {err}")
        return 1

    print(f"PASS [{mode}]: All content governance, PII, link hygiene, and sync checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
