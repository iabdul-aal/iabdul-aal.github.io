#!/usr/bin/env python3
"""Generate data/publications.bib from data/publications.json."""

from __future__ import annotations

import json
import os
import re

from config_helper import infer_preprint_info, to_latex_sub_sup


def format_author(author_name: str) -> str:
    parts = author_name.strip().split()
    if len(parts) > 1:
        return f"{parts[-1]}, {' '.join(parts[:-1])}"
    return author_name.strip()


def generate_bib_key(authors: list[str], year: str, title: str, used_keys: set[str]) -> str:
    first_author_lastname = "author"
    for name in authors:
        parts = name.strip().split()
        if parts:
            first_author_lastname = re.sub(r"[^a-z0-9]", "", parts[-1].lower()) or "author"
            break

    title_words = [w for w in re.sub(r"[^a-zA-Z0-9\s]", "", title).split() if w]
    first_title_word = title_words[0].lower() if title_words else "paper"

    base_key = f"{first_author_lastname}{year}{first_title_word}"
    candidate = base_key
    suffix_idx = 0
    while candidate in used_keys:
        suffix_idx += 1
        candidate = f"{base_key}{chr(ord('a') + suffix_idx)}"
    used_keys.add(candidate)
    return candidate


def escape_bibtex_text(text: str) -> str:
    """Convert HTML/Unicode subscripts to $_2$ and escape bare & / % outside math."""
    clean = to_latex_sub_sup(text)
    clean = clean.replace("\u2014", "---").replace("\u2013", "--")
    clean = re.sub(r"(?<!\\)&", r"\\&", clean)
    clean = re.sub(r"(?<!\\)%", r"\\%", clean)
    return clean


def clean_title_for_bibtex(title: str) -> str:
    clean = escape_bibtex_text(title)
    clean = re.sub(
        r"(?<!\{)\b([A-Z][A-Za-z]*(?:\$[\^_]\{?[^{}$]+\}?\$[A-Za-z]*)+)",
        r"{\1}",
        clean,
    )
    clean = re.sub(r"(NanoPhotoNet-MPM)", r"{\1}", clean)
    clean = re.sub(r"\b(6G|MedTech|PINNs|PINN|DeepONet|BIC|SPDC)\b", r"{\1}", clean)
    return clean


def _infer_year(pub: dict) -> str:
    year = str(pub.get("year", "")).strip()
    if year:
        return year
    date = str(pub.get("date", "")).strip()
    if len(date) >= 4 and date[:4].isdigit():
        return date[:4]
    return ""


def _build_entry(entry_type: str, key: str, fields: list[tuple[str, str]]) -> str:
    lines = [f"@{entry_type}{{{key},"]
    non_empty = [(k, v) for k, v in fields if v]
    for idx, (fname, fval) in enumerate(non_empty):
        comma = "," if idx < len(non_empty) - 1 else ""
        lines.append(f"  {fname:<12} = {{{fval}}}{comma}")
    lines.append("}")
    return "\n".join(lines)


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(root, "data", "publications.json")
    bib_path = os.path.join(root, "data", "publications.bib")

    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        publications = json.load(f)

    new_entries: list[str] = []
    used_keys: set[str] = set()

    for pub in publications:
        raw_title = str(pub.get("title", "")).strip()
        title = clean_title_for_bibtex(raw_title)
        venue = str(pub.get("venue", "")).strip()
        year = _infer_year(pub)
        doi = str(pub.get("doi", "")).strip()
        url = str(pub.get("url", "")).strip()
        arxiv = str(pub.get("arxiv", "")).strip()
        authors = [a for a in pub.get("authors", []) if isinstance(a, str) and a.strip()]

        formatted_authors = " and ".join(format_author(a) for a in authors)
        key = generate_bib_key(authors, year, raw_title, used_keys)

        preprint_info = infer_preprint_info(pub)

        if preprint_info["is_arxiv"]:
            arxiv_id = preprint_info["arxiv"] or arxiv
            note_val = f"arXiv:{arxiv_id}" if arxiv_id else escape_bibtex_text(venue)
            fields = [
                ("author", formatted_authors),
                ("title", title),
                ("note", note_val),
                ("eprint", arxiv_id),
                ("archiveprefix", "arXiv" if arxiv_id else ""),
                ("doi", doi),
                ("year", year),
                ("url", url),
            ]
            entry = _build_entry("unpublished", key, fields)
        elif preprint_info["is_preprint"]:
            howpublished = escape_bibtex_text(preprint_info["server"] or venue or "Preprint")
            fields = [
                ("author", formatted_authors),
                ("title", title),
                ("howpublished", howpublished),
                ("year", year),
                ("doi", doi),
                ("url", url),
            ]
            entry = _build_entry("misc", key, fields)
        else:
            fields = [
                ("author", formatted_authors),
                ("title", title),
                ("journal", escape_bibtex_text(venue)),
                ("year", year),
                ("volume", str(pub.get("volume", "")).strip()),
                ("number", str(pub.get("issue", "")).strip()),
                ("pages", str(pub.get("pages", "")).strip()),
                ("doi", doi),
                ("url", url),
            ]
            entry = _build_entry("article", key, fields)

        new_entries.append(entry)

    all_content = "\n\n".join(new_entries) + "\n"
    with open(bib_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(all_content)

    print(f"Successfully generated {bib_path} with {len(new_entries)} active papers.")


if __name__ == "__main__":
    main()
