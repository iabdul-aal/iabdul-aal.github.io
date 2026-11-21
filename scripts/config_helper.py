import html
import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]

_SUBSCRIPT_CHARS: dict[str, str] = {
    "0": "₀",
    "1": "₁",
    "2": "₂",
    "3": "₃",
    "4": "₄",
    "5": "₅",
    "6": "₆",
    "7": "₇",
    "8": "₈",
    "9": "₉",
    "+": "₊",
    "-": "₋",
    "=": "₌",
    "(": "₍",
    ")": "₎",
    "a": "ₐ",
    "e": "ₑ",
    "o": "ₒ",
    "x": "ₓ",
    "h": "ₕ",
    "k": "ₖ",
    "l": "ₗ",
    "m": "ₘ",
    "n": "ₙ",
    "p": "ₚ",
    "s": "ₛ",
    "t": "ₜ",
}

_SUPERSCRIPT_CHARS: dict[str, str] = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
    "+": "⁺",
    "-": "⁻",
    "=": "⁼",
    "(": "⁽",
    ")": "⁾",
    "n": "ⁿ",
    "i": "ⁱ",
}

_SUBSCRIPT_MAP = str.maketrans(_SUBSCRIPT_CHARS)
_SUPERSCRIPT_MAP = str.maketrans(_SUPERSCRIPT_CHARS)
_REVERSE_SUBSCRIPT_MAP = {v: k for k, v in _SUBSCRIPT_CHARS.items()}
_REVERSE_SUPERSCRIPT_MAP = {v: k for k, v in _SUPERSCRIPT_CHARS.items()}


def clean_html_text(text: str, replace_em_dash: bool = False) -> str:
    """Decode HTML entities, map <sub>/<sup> to Unicode sub/superscripts, strip tags."""
    if not text:
        return ""
    value = html.unescape(str(text))

    def _replace_sub(match: re.Match[str]) -> str:
        inner = match.group(1).strip()
        if inner and all(ch in _SUBSCRIPT_CHARS for ch in inner):
            return inner.translate(_SUBSCRIPT_MAP)
        return inner

    def _replace_sup(match: re.Match[str]) -> str:
        inner = match.group(1).strip()
        if inner and all(ch in _SUPERSCRIPT_CHARS for ch in inner):
            return inner.translate(_SUPERSCRIPT_MAP)
        return inner

    value = re.sub(r"<\s*sub\s*>(.*?)<\s*/\s*sub\s*>", _replace_sub, value, flags=re.IGNORECASE | re.DOTALL)
    value = re.sub(r"<\s*sup\s*>(.*?)<\s*/\s*sup\s*>", _replace_sup, value, flags=re.IGNORECASE | re.DOTALL)
    value = re.sub(r"<[^>]+>", "", value)
    if replace_em_dash:
        value = value.replace("\u200a\u2014\u200a", ": ").replace(" \u2014 ", ", ").replace("\u2014", ", ")
    value = re.sub(r"\s+", " ", value).strip()
    return value


def to_latex_sub_sup(text: str) -> str:
    """Convert HTML <sub>/<sup> and Unicode sub/superscripts to LaTeX math sub/superscripts."""
    if not text:
        return ""
    value = html.unescape(str(text))

    def _latex_sub(match: re.Match[str]) -> str:
        inner = match.group(1).strip()
        return f"$_{inner}$" if len(inner) == 1 else f"$_{{{inner}}}$"

    def _latex_sup(match: re.Match[str]) -> str:
        inner = match.group(1).strip()
        return f"$^{inner}$" if len(inner) == 1 else f"$^{{{inner}}}$"

    value = re.sub(r"<\s*sub\s*>(.*?)<\s*/\s*sub\s*>", _latex_sub, value, flags=re.IGNORECASE | re.DOTALL)
    value = re.sub(r"<\s*sup\s*>(.*?)<\s*/\s*sup\s*>", _latex_sup, value, flags=re.IGNORECASE | re.DOTALL)
    value = re.sub(r"<[^>]+>", "", value)

    sub_chars = "".join(re.escape(c) for c in _REVERSE_SUBSCRIPT_MAP)
    sup_chars = "".join(re.escape(c) for c in _REVERSE_SUPERSCRIPT_MAP)

    value = re.sub(
        f"[{sub_chars}]+",
        lambda m: (
            f"$_{''.join(_REVERSE_SUBSCRIPT_MAP[c] for c in m.group(0))}$"
            if len(m.group(0)) == 1
            else f"$_{{{''.join(_REVERSE_SUBSCRIPT_MAP[c] for c in m.group(0))}}}$"
        ),
        value,
    )
    value = re.sub(
        f"[{sup_chars}]+",
        lambda m: (
            f"$^{''.join(_REVERSE_SUPERSCRIPT_MAP[c] for c in m.group(0))}$"
            if len(m.group(0)) == 1
            else f"$^{{{''.join(_REVERSE_SUPERSCRIPT_MAP[c] for c in m.group(0))}}}$"
        ),
        value,
    )
    return value


def _skip_string(text: str, start: int) -> int:
    """Return index immediately after the closing quote of a JS/TS string literal."""
    quote = text[start]
    i = start + 1
    n = len(text)
    while i < n:
        ch = text[i]
        if ch == "\\":
            i += 2
            continue
        if ch == quote:
            return i + 1
        i += 1
    return n


def _skip_comment(text: str, start: int) -> int:
    """If text[start:] starts a JS/TS comment, return index after comment; else start."""
    n = len(text)
    if start + 1 >= n:
        return start
    two = text[start : start + 2]
    if two == "//":
        nl = text.find("\n", start + 2)
        return n if nl == -1 else nl + 1
    if two == "/*":
        end = text.find("*/", start + 2)
        return n if end == -1 else end + 2
    return start


def extract_ts_array_block(content: str, const_name: str) -> str | None:
    """Extract the raw body inside `[ ... ]` for `export const <const_name>... = [ ... ]`."""
    pattern = re.compile(rf"\bexport\s+const\s+{re.escape(const_name)}\b[^=]*=\s*\[", re.DOTALL)
    match = pattern.search(content)
    if not match:
        return None

    open_bracket = match.end() - 1
    i = open_bracket + 1
    n = len(content)
    depth = 1

    while i < n:
        ch = content[i]
        if ch in ("'", '"', "`"):
            i = _skip_string(content, i)
            continue
        if ch == "/":
            next_i = _skip_comment(content, i)
            if next_i != i:
                i = next_i
                continue
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return content[open_bracket + 1 : i]
        i += 1

    return None


def split_top_level_objects(array_body: str) -> list[str]:
    """Split a TS array body into top-level `{ ... }` object slices."""
    objects: list[str] = []
    i = 0
    n = len(array_body)
    depth = 0
    obj_start = -1

    while i < n:
        ch = array_body[i]
        if ch in ("'", '"', "`"):
            i = _skip_string(array_body, i)
            continue
        if ch == "/":
            next_i = _skip_comment(array_body, i)
            if next_i != i:
                i = next_i
                continue
        if ch == "{":
            if depth == 0:
                obj_start = i
            depth += 1
        elif ch == "}":
            if depth > 0:
                depth -= 1
                if depth == 0 and obj_start != -1:
                    objects.append(array_body[obj_start : i + 1])
                    obj_start = -1
        i += 1

    return objects


def _decode_ts_string(token: str) -> str:
    """Decode a single TS string literal token (without surrounding quotes)."""
    if len(token) < 2:
        return token
    inner = token[1:-1]
    inner = inner.replace('\\"', '"').replace("\\'", "'").replace("\\`", "`")
    inner = inner.replace("\\n", "\n").replace("\\t", "\t").replace("\\\\", "\\")
    return inner


def parse_ts_top_level_fields(obj_text: str) -> dict[str, Any]:
    """Parse top-level string and string-array properties (plus `links`) of a TS object."""
    fields: dict[str, Any] = {}
    i = 0
    n = len(obj_text)
    if n < 2 or obj_text[0] != "{":
        return fields

    i = 1
    depth_brace = 1
    depth_bracket = 0

    while i < n:
        ch = obj_text[i]
        if ch in ("'", '"', "`"):
            i = _skip_string(obj_text, i)
            continue
        if ch == "/":
            next_i = _skip_comment(obj_text, i)
            if next_i != i:
                i = next_i
                continue
        if ch == "{":
            depth_brace += 1
            i += 1
            continue
        if ch == "}":
            depth_brace -= 1
            i += 1
            if depth_brace <= 0:
                break
            continue
        if ch == "[":
            depth_bracket += 1
            i += 1
            continue
        if ch == "]":
            if depth_bracket > 0:
                depth_bracket -= 1
            i += 1
            continue

        if depth_brace == 1 and depth_bracket == 0 and (ch.isalpha() or ch == "_"):
            key_match = re.match(r"([A-Za-z_][A-Za-z0-9_]*)\s*:\s*", obj_text[i:])
            if key_match:
                key = key_match.group(1)
                val_start = i + key_match.end()
                if val_start < n:
                    val_ch = obj_text[val_start]
                    if val_ch in ('"', "'", "`"):
                        val_end = _skip_string(obj_text, val_start)
                        fields[key] = _decode_ts_string(obj_text[val_start:val_end])
                        i = val_end
                        continue
                    if val_ch == "[":
                        # Find matching closing bracket for this array value
                        arr_end = val_start + 1
                        arr_depth = 1
                        while arr_end < n and arr_depth > 0:
                            ac = obj_text[arr_end]
                            if ac in ("'", '"', "`"):
                                arr_end = _skip_string(obj_text, arr_end)
                                continue
                            if ac == "/":
                                next_ae = _skip_comment(obj_text, arr_end)
                                if next_ae != arr_end:
                                    arr_end = next_ae
                                    continue
                            if ac == "[":
                                arr_depth += 1
                            elif ac == "]":
                                arr_depth -= 1
                            arr_end += 1
                        arr_body = obj_text[val_start + 1 : arr_end - 1]
                        if key == "links":
                            link_items = []
                            for link_obj in split_top_level_objects(arr_body):
                                parsed_link = parse_ts_top_level_fields(link_obj)
                                if parsed_link:
                                    link_items.append(parsed_link)
                            fields[key] = link_items
                        else:
                            fields[key] = _extract_string_list(arr_body)
                        i = arr_end
                        continue

        i += 1

    return fields


def _extract_string_list(arr_body: str) -> list[str]:
    items: list[str] = []
    i = 0
    n = len(arr_body)
    while i < n:
        ch = arr_body[i]
        if ch in ('"', "'", "`"):
            end = _skip_string(arr_body, i)
            items.append(_decode_ts_string(arr_body[i:end]))
            i = end
            continue
        if ch == "/":
            next_i = _skip_comment(arr_body, i)
            if next_i != i:
                i = next_i
                continue
        i += 1
    return items


def _normalize_github_repo(value: str) -> str:
    val = (value or "").strip()
    if not val:
        return ""
    m = re.search(r"github\.com/([^/\s?#]+/[^/\s?#]+)", val)
    if m:
        repo = m.group(1)
    elif "/" in val and not val.startswith(("http://", "https://")):
        repo = val
    else:
        return ""
    return repo.removesuffix(".git").strip("/")


def _extract_zenodo_id(value: str) -> str:
    val = (value or "").strip()
    if not val:
        return ""
    for pattern in (r"10\.5281/zenodo\.(\d+)", r"zenodo\.org/records?/(\d+)"):
        m = re.search(pattern, val, re.IGNORECASE)
        if m:
            return m.group(1)
    if val.isdigit():
        return val
    return ""


def _extract_hf_dataset(value: str) -> str:
    val = (value or "").strip()
    if not val:
        return ""
    m = re.search(r"huggingface\.co/datasets/([^/\s?#]+/[^/\s?#]+)", val)
    if m:
        return m.group(1).strip("/")
    if "/" in val and not val.startswith(("http://", "https://")):
        return val.strip("/")
    return ""


def _extract_hf_model(value: str) -> str:
    val = (value or "").strip()
    if not val:
        return ""
    if "huggingface.co/datasets/" in val or "huggingface.co/spaces/" in val or "huggingface.co/api/" in val:
        return ""
    m = re.search(r"huggingface\.co/([^/\s?#]+/[^/\s?#]+)", val)
    if m:
        return m.group(1).strip("/")
    if "/" in val and not val.startswith(("http://", "https://")):
        return val.strip("/")
    return ""


def get_social_links() -> dict[str, str]:
    path = ROOT / "lib" / "social-links.ts"
    if not path.exists():
        return {}
    content = path.read_text(encoding="utf-8")
    links = {}
    for match in re.finditer(r'(\w+):\s*["\']([^"\']+)["\']', content):
        links[match.group(1)] = match.group(2)
    return links


def get_site_config() -> dict[str, str]:
    path = ROOT / "lib" / "site-config.ts"
    if not path.exists():
        return {}
    content = path.read_text(encoding="utf-8")
    config = {}
    for match in re.finditer(r'(\w+):\s*["\']([^"\']+)["\']', content):
        config[match.group(1)] = match.group(2)
    return config


def get_orcid_id() -> str:
    try:
        with open(ROOT / "data" / "cv_data.json", encoding="utf-8") as f:
            data = json.load(f)
            return data["personalInfo"]["orcid"]
    except Exception:
        cfg = get_site_config()
        return cfg.get("orcidId", "0009-0004-9300-3936")


def get_scholar_id() -> str:
    links = get_social_links()
    url = links.get("scholar", "")
    match = re.search(r"[?&]user=([^&]+)", url)
    return match.group(1) if match else "CPmqNv4AAAAJ"


def get_github_username() -> str:
    try:
        with open(ROOT / "data" / "cv_data.json", encoding="utf-8") as f:
            data = json.load(f)
            return data["personalInfo"]["github"]
    except Exception:
        cfg = get_site_config()
        return cfg.get("repositoryOwner", "iabdul-aal")


def get_arxiv_url() -> str:
    links = get_social_links()
    return links.get("arxiv", "https://arxiv.org/a/abdulaal_i_1.html")


def get_email() -> str:
    try:
        with open(ROOT / "data" / "cv_data.json", encoding="utf-8") as f:
            data = json.load(f)
            return data["personalInfo"]["email"]
    except Exception:
        links = get_social_links()
        return links.get("email", "islam.abdulaal@fau.de")


def get_research_themes() -> list[dict[str, Any]]:
    path = ROOT / "lib" / "academic-content.ts"
    if not path.exists():
        return []
    content = path.read_text(encoding="utf-8")
    body = extract_ts_array_block(content, "researchThemes")
    if not body:
        return []
    themes: list[dict[str, Any]] = []
    for obj in split_top_level_objects(body):
        fields = parse_ts_top_level_fields(obj)
        if fields.get("id"):
            themes.append(fields)
    return themes


_PREPRINT_SERVER_RULES: tuple[tuple[str, tuple[str, ...], tuple[str, ...], tuple[str, ...]], ...] = (
    ("arXiv", ("10.48550/arxiv.",), ("arxiv.org/",), ("arxiv",)),
    ("Preprints.org", ("10.20944/preprints",), ("preprints.org/",), ("preprints.org",)),
    ("Optica Open", ("10.1364/opticaopen",), ("opticaopen.org",), ("optica open",)),
    ("TechRxiv", ("10.36227/techrxiv",), ("techrxiv.org",), ("techrxiv",)),
    ("medRxiv", (), ("medrxiv.org",), ("medrxiv",)),
    ("bioRxiv", ("10.1101/",), ("biorxiv.org",), ("biorxiv",)),
    ("chemRxiv", ("10.26434/chemrxiv",), ("chemrxiv.org",), ("chemrxiv",)),
    ("Research Square", ("10.21203/rs.",), ("researchsquare.com",), ("research square",)),
    ("PsyArXiv", ("10.31234/",), (), ("psyarxiv",)),
    ("SocArXiv", ("10.31235/",), (), ("socarxiv",)),
    ("EarthArXiv", ("10.31223/",), (), ("eartharxiv",)),
    ("OSF Preprints", ("10.31219/",), ("osf.io/preprints", "osf.io/"), ("osf preprints",)),
    ("SSRN", ("10.2139/ssrn.",), ("ssrn.com",), ("ssrn",)),
    ("HAL", (), ("hal.science", "hal.archives-ouvertes.fr"), ("hal",)),
)

_GENERIC_PREPRINT_VENUES = {
    "",
    "preprint",
    "working paper",
    "posted content",
    "unspecified venue",
    "publication",
    "arxiv preprint",
}


def infer_preprint_info(pub: dict[str, Any]) -> dict[str, Any]:
    """Normalize preprint status, server name, identifier, and canonical landing URL."""
    doi = str(pub.get("doi") or "").strip()
    lower_doi = doi.lower()
    url = str(pub.get("url") or "").strip()
    lower_url = url.lower()
    raw_venue = clean_html_text(str(pub.get("venue") or pub.get("journal") or ""), replace_em_dash=True)
    lower_venue = raw_venue.lower()
    pub_type = str(pub.get("type") or "").lower().strip()
    arxiv_id = str(pub.get("arxiv") or "").strip()

    if not arxiv_id:
        if lower_doi.startswith("10.48550/arxiv."):
            arxiv_id = doi[len("10.48550/arxiv.") :].strip()
        elif "arxiv.org/abs/" in lower_url:
            arxiv_id = url.split("/abs/")[-1].strip()

    matched_server = str(pub.get("preprintServer") or "").strip()
    if not matched_server:
        for server_name, doi_prefixes, host_pats, venue_pats in _PREPRINT_SERVER_RULES:
            if server_name == "arXiv" and arxiv_id:
                matched_server = "arXiv"
                break
            if any(lower_doi.startswith(p) for p in doi_prefixes):
                matched_server = server_name
                break
            if any(h in lower_url for h in host_pats):
                matched_server = server_name
                break
            if any(v in lower_venue for v in venue_pats):
                matched_server = server_name
                break

    is_primary_arxiv = bool(arxiv_id and (not doi or lower_doi.startswith("10.48550/arxiv.")))
    is_preprint = bool(
        pub_type in ("preprint", "working-paper", "posted-content")
        or is_primary_arxiv
        or "preprint" in lower_venue
        or "working paper" in lower_venue
        or "posted content" in lower_venue
        or (matched_server and matched_server != "arXiv")
    )

    server = matched_server or (raw_venue if lower_venue not in _GENERIC_PREPRINT_VENUES else "Preprint")
    return {
        "is_preprint": is_preprint,
        "is_arxiv": is_preprint and server == "arXiv" and bool(arxiv_id),
        "server": server if is_preprint or matched_server else "",
        "arxiv": arxiv_id,
    }


def get_project_records() -> list[dict[str, Any]]:
    path = ROOT / "lib" / "academic-content.ts"
    if not path.exists():
        return []
    content = path.read_text(encoding="utf-8")
    body = extract_ts_array_block(content, "projects")
    if not body:
        return []
    records: list[dict[str, Any]] = []
    for obj in split_top_level_objects(body):
        fields = parse_ts_top_level_fields(obj)
        if fields.get("id"):
            records.append(fields)
    return records


def get_projects() -> list[dict[str, str]]:
    parsed_projects: list[dict[str, str]] = []
    for fields in get_project_records():
        pid = str(fields.get("id", "")).strip()
        if not pid:
            continue

        github_repo = _normalize_github_repo(str(fields.get("github", "")))
        zenodo_raw = str(fields.get("zenodo", "")).strip()
        zenodo_id = _extract_zenodo_id(zenodo_raw)
        hf_model = _extract_hf_model(str(fields.get("huggingface", "")))
        hf_dataset = _extract_hf_dataset(str(fields.get("huggingfaceDataset", "")))

        for link in fields.get("links", []):
            if not isinstance(link, dict):
                continue
            href = str(link.get("href", "")).strip()
            if not href:
                continue
            if not github_repo:
                github_repo = _normalize_github_repo(href)
            if not zenodo_id:
                zid = _extract_zenodo_id(href)
                if zid:
                    zenodo_id = zid
                    if not zenodo_raw:
                        zenodo_raw = href
            if not hf_dataset:
                hf_dataset = _extract_hf_dataset(href)
            if not hf_model:
                hf_model = _extract_hf_model(href)

        parsed_projects.append(
            {
                "id": pid,
                "github": github_repo,
                "zenodo_id": zenodo_id,
                "zenodo": zenodo_raw,
                "huggingface": hf_model,
                "huggingfaceDataset": hf_dataset,
            }
        )
    return parsed_projects
