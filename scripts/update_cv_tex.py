#!/usr/bin/env python3
"""Generate data/cv.tex and data/cv_de.tex from data/cv_data.json."""

from __future__ import annotations

import datetime
import json
import os
import re
from typing import Any

from config_helper import to_latex_sub_sup


def latex_escape(text: Any) -> str:
    if not isinstance(text, str):
        text = str(text)
    if not text:
        return ""

    # Chemical/material subscripts before generic escaping
    text = text.replace("NbOCl2", "NbOCl$_2$")
    text = text.replace("MoS2", "MoS$_2$")
    text = to_latex_sub_sup(text)

    # Normalize raw Unicode dashes if any slip into source JSON
    text = text.replace("\u2014", "---").replace("\u2013", "--")

    # Protect already-present LaTeX commands and math-mode sub/superscripts
    protected: dict[str, str] = {}

    def _protect(match: re.Match[str]) -> str:
        key = f"PLACEHOLDER{len(protected)}END"
        protected[key] = match.group(0)
        return key

    text = re.sub(r"\\[a-zA-Z]+(?:\[[^\]]*\])?(?:\{[^}]*\})*", _protect, text)
    text = re.sub(r"\$[\^_]\{?[^{}$]+\}?\$", _protect, text)

    # Standard LaTeX special characters
    text = text.replace("&", "\\&")
    text = text.replace("%", "\\%")
    text = text.replace("$", "\\$")
    text = text.replace("#", "\\#")
    text = text.replace("^", "\\^{}")
    text = text.replace("~", "\\textasciitilde{}")
    text = text.replace("_", "\\_")

    for key, val in protected.items():
        text = text.replace(key, val)
    return text


def _normalize_url(raw: str, prefix: str = "") -> str:
    val = (raw or "").strip()
    if not val:
        return ""
    if val.startswith(("http://", "https://", "mailto:")):
        return val
    return f"{prefix}{val.lstrip('/')}"


def _href_escape(url: str) -> str:
    return url.replace("%", "\\%").replace("#", "\\#")


def build_preamble(lang: str = "en") -> list[str]:
    skills_label = "Kenntnisse:" if lang == "de" else "Skills:"
    attachments_label = "Anlagen:" if lang == "de" else "Attachments:"
    issuer_label = "Aussteller:" if lang == "de" else "Issuer:"

    return [
        "% Academic CV Template for PhD Applications",
        "% Optimized for Professional Standards and ATS Compatibility",
        "\\documentclass[11pt,a4paper]{article}",
        "",
        "% ================== PACKAGES ==================",
        "\\usepackage[utf8]{inputenc}",
        "\\usepackage[T1]{fontenc}",
        "\\usepackage[margin=1.5cm]{geometry}",
        "\\usepackage{enumitem}",
        "\\usepackage{titlesec}",
        "\\usepackage{hyperref}",
        "\\usepackage{xcolor}",
        "\\usepackage{fontawesome5}",
        "\\usepackage{graphicx}",
        "\\graphicspath{{data/}{./}}",
        "\\usepackage{tabularx}",
        "\\usepackage{array}",
        "\\usepackage{multicol}",
        "\\usepackage{etoolbox}",
        "\\usepackage{amsmath}",
        "\\usepackage{comment}",
        "\\usepackage[backend=biber,style=ieee,sorting=ydnt,defernumbers=true,maxbibnames=99]{biblatex}",
        "",
        "% ================== BIBLIOGRAPHY SETUP ==================",
        "\\addbibresource{publications.bib}",
        "",
        "% Bold your name in publications",
        "\\newcommand{\\makeauthorbold}[1]{%",
        "  \\DeclareNameFormat{author}{%",
        "    \\ifthenelse{\\value{listcount}=1}",
        "    {%",
        "      {\\expandafter\\ifstrequal\\expandafter{\\namepartfamily}{#1}{\\mkbibbold{\\namepartfamily\\addcomma\\addspace \\namepartgiveni}}{\\namepartfamily\\addcomma\\addspace \\namepartgiveni}}",
        "    }{\\ifnumless{\\value{listcount}}{\\value{liststop}}",
        "        {\\expandafter\\ifstrequal\\expandafter{\\namepartfamily}{#1}{\\mkbibbold{\\addcomma\\addspace \\namepartfamily\\addcomma\\addspace \\namepartgiveni}}{\\addcomma\\addspace \\namepartfamily\\addcomma\\addspace \\namepartgiveni}}",
        "        {\\expandafter\\ifstrequal\\expandafter{\\namepartfamily}{#1}{\\mkbibbold{\\addcomma\\addspace \\namepartfamily\\addcomma\\addspace \\namepartgiveni\\addcomma\\isdot}}{\\addcomma\\addspace \\namepartfamily\\addcomma\\addspace \\namepartgiveni\\addcomma\\isdot}}%",
        "      }",
        "    \\ifthenelse{\\value{listcount}<\\value{liststop}}",
        "    {\\addcomma\\space}{}",
        "  }",
        "}",
        "",
        "\\makeauthorbold{Abdulaal}",
        "",
        "% ================== COLOR SCHEME ==================",
        "\\definecolor{headercolor}{RGB}{0,51,102}",
        "\\definecolor{sectioncolor}{RGB}{0,51,102}",
        "\\definecolor{linkcolor}{RGB}{0,102,204}",
        "\\definecolor{mediacolor}{RGB}{0,102,51}",
        "",
        "% ================== FORMATTING CONFIGURATION ==================",
        "\\pagestyle{plain}",
        "\\setlength{\\parindent}{0pt}",
        "\\setlist[itemize]{leftmargin=*,topsep=2pt,itemsep=1pt,parsep=0pt}",
        "",
        "\\hypersetup{",
        "    colorlinks=true,",
        "    linkcolor=black,",
        "    urlcolor=linkcolor,",
        "    citecolor=black,",
        "    pdfborder={0 0 0}",
        "}",
        "",
        "% ================== SECTION FORMATTING ==================",
        "\\titleformat{\\section}",
        "    {\\large\\bfseries\\color{sectioncolor}\\uppercase}",
        "    {}{0pt}{}[\\color{sectioncolor}\\titlerule]",
        "\\titlespacing{\\section}{0pt}{10pt}{5pt}",
        "",
        "\\titleformat{\\subsection}",
        "    {\\normalsize\\bfseries\\color{sectioncolor}}",
        "    {}{0pt}{}",
        "\\titlespacing{\\subsection}{0pt}{6pt}{3pt}",
        "",
        "% ================== CUSTOM COMMANDS ==================",
        "",
        "% Education with integrated thesis and media",
        "\\newcommand{\\education}[8]{",
        "    \\textbf{#1} \\hfill #2 \\\\",
        "    \\textit{#3} \\hfill \\textit{#4}\\par",
        "    \\ifstrempty{#5}{}{",
        "        \\vspace{2pt}",
        "        {\\small #5\\par}",
        "    }",
        "    \\ifstrempty{#6}{}{",
        f"        \\textcolor{{sectioncolor}}{{\\small\\textbf{{{skills_label}}}}} \\textcolor{{black}}{{\\small #6}} \\\\",
        "    }",
        "    \\ifstrempty{#7}{}{",
        f"        \\textcolor{{mediacolor}}{{\\small\\faIcon{{link}} \\textbf{{{attachments_label}}} #7}}",
        "    }",
        "    \\ifstrempty{#8}{}{\\vspace{#8}}",
        "}",
        "",
        "% Research experience",
        "\\newcommand{\\research}[8]{",
        "    \\textbf{#1} \\hfill #2 \\\\",
        "    \\textit{#3} \\hfill \\textit{#4}\\par",
        "    \\ifstrempty{#5}{}{",
        "        \\vspace{2pt}",
        "        {\\small #5\\par}",
        "    }",
        "    \\ifstrempty{#6}{}{",
        f"        \\textcolor{{sectioncolor}}{{\\small\\textbf{{{skills_label}}}}} \\textcolor{{black}}{{\\small #6}} \\\\",
        "    }",
        "    \\ifstrempty{#7}{}{",
        f"        \\textcolor{{mediacolor}}{{\\small\\faIcon{{link}} \\textbf{{{attachments_label}}} #7}}",
        "    }",
        "    \\ifstrempty{#8}{}{\\vspace{#8}}",
        "}",
        "",
        "% Award",
        "\\newcommand{\\award}[5]{",
        "    \\textbf{#1} \\hfill #2 \\\\",
        f"    \\textit{{{issuer_label}}} #3\\par",
        "    \\vspace{2pt}",
        "    \\ifstrempty{#4}{}{",
        "        {\\small #4\\par}",
        "    }",
        "    \\ifstrempty{#5}{}{",
        f"        \\textcolor{{mediacolor}}{{\\small\\faIcon{{link}} \\textbf{{{attachments_label}}} #5}} \\\\",
        "    }",
        "    \\vspace{2pt}",
        "}",
        "",
        "% Leadership",
        "\\newcommand{\\leadership}[8]{",
        "    \\textbf{#1} \\hfill #2 \\\\",
        "    \\textit{#3} \\hfill \\textit{#4}\\par",
        "    \\ifstrempty{#5}{}{",
        "        \\vspace{2pt}",
        "        {\\small #5\\par}",
        "    }",
        "    \\ifstrempty{#6}{}{",
        f"        \\textcolor{{sectioncolor}}{{\\small\\textbf{{{skills_label}}}}} \\textcolor{{black}}{{\\small #6}} \\\\",
        "    }",
        "    \\ifstrempty{#7}{}{",
        f"        \\textcolor{{mediacolor}}{{\\small\\faIcon{{link}} \\textbf{{{attachments_label}}} #7}}",
        "    }",
        "    \\ifstrempty{#8}{}{\\vspace{#8}}",
        "}",
        "",
        "% Simple item",
        "\\newcommand{\\cvitem}[2]{",
        "    \\textbf{#1} \\hfill #2",
        "}",
        "",
        "% Skill category",
        "\\newcommand{\\skillcat}[2]{",
        "    \\textbf{#1:} #2 \\\\",
        "}",
        "",
        "% Reference",
        "\\newcommand{\\reference}[4]{",
        "    \\textbf{#1} \\\\",
        "    #2 \\\\",
        "    #3 \\\\",
        "    \\faIcon{envelope} \\href{mailto:#4}{\\nolinkurl{#4}}",
        "}",
        "",
        "% ORCID icon",
        "\\newcommand{\\orcidicon}{\\includegraphics[height=1em]{orcid.png}}",
    ]


def build_header(info: dict[str, Any], lang: str = "en") -> list[str]:
    spec_raw = info.get("specialization_de", info.get("specialization", "")) if lang == "de" else info.get("specialization", "")
    name = latex_escape(info.get("name", ""))
    spec = latex_escape(spec_raw)

    phone = str(info.get("phone") or "").strip()
    email = str(info.get("email") or "").strip()
    website = str(info.get("website") or "").strip()
    linkedin = str(info.get("linkedin") or "").strip()
    github = str(info.get("github") or "").strip()
    orcid = str(info.get("orcid") or "").strip()

    row1: list[str] = []
    if phone:
        row1.append(f"\\faIcon{{phone}} {latex_escape(phone)}")
    if email:
        row1.append(f"\\faIcon{{envelope}} \\href{{mailto:{_href_escape(email)}}}{{{latex_escape(email)}}}")
    if website:
        clean_site = website.removeprefix("https://").removeprefix("http://").strip("/")
        row1.append(f"\\faGlobe\\ \\href{{https://{_href_escape(clean_site)}}}{{{latex_escape(clean_site)}}}")

    row2: list[str] = []
    if linkedin:
        clean_li = linkedin.removeprefix("https://www.linkedin.com/in/").removeprefix("https://linkedin.com/in/").strip("/")
        row2.append(f"\\faLinkedinIn\\ \\href{{https://linkedin.com/in/{_href_escape(clean_li)}}}{{linkedin.com/in/{latex_escape(clean_li)}}}")
    if github:
        clean_gh = github.removeprefix("https://github.com/").strip("/")
        row2.append(f"\\faIcon{{github}} \\href{{https://github.com/{_href_escape(clean_gh)}}}{{@{latex_escape(clean_gh)}}}")
    if orcid:
        clean_orcid = orcid.removeprefix("https://orcid.org/").strip("/")
        row2.append(f"\\orcidicon{{}} \\href{{https://orcid.org/{_href_escape(clean_orcid)}}}{{{latex_escape(clean_orcid)}}}")

    lines = [
        "% ==================== HEADER ====================",
        "\\begin{center}",
        f"    {{\\Huge\\bfseries\\color{{headercolor}} {name}}} \\\\[6pt]",
        f"    {{\\large\\itshape {spec}}}",
        "    \\vspace{8pt}",
        "",
    ]
    if row1 and row2:
        lines.append("    " + " \\quad\n    ".join(row1) + " \\\\")
        lines.append("    \\vspace{3pt}")
        lines.append("    " + " \\quad\n    ".join(row2))
    elif row1:
        lines.append("    " + " \\quad\n    ".join(row1))
    elif row2:
        lines.append("    " + " \\quad\n    ".join(row2))

    lines += [
        "\\end{center}",
        "\\vspace{-8pt}",
    ]
    return lines


def build_research_interests(text: str, text_de: str | None = None, lang: str = "en") -> list[str]:
    title = "Forschungsinteressen" if lang == "de" else "Research Interests"
    content = (text_de or text) if lang == "de" else text
    return [
        f"\\section*{{{title}}}",
        latex_escape(content),
    ]


def build_education(education: list[dict[str, Any]], lang: str = "en") -> list[str]:
    title = "Ausbildung" if lang == "de" else "Education"
    lines = [f"\\section*{{{title}}}"]
    for ed in education:
        degree = ed.get("degree_de", ed.get("degree", "")) if lang == "de" else ed.get("degree", "")
        institution = ed.get("institution_de", ed.get("institution", "")) if lang == "de" else ed.get("institution", "")
        location = ed.get("location_de", ed.get("location", "")) if lang == "de" else ed.get("location", "")
        period = ed.get("period_de", ed.get("period", "")) if lang == "de" else ed.get("period", "")
        lines.append(
            f"\\education"
            f"{{{latex_escape(degree)}}}"
            f"{{{latex_escape(period)}}}"
            f"{{{latex_escape(institution)}}}"
            f"{{{latex_escape(location)}}}"
            f"{{}}"
            f"{{}}"
            f"{{}}"
            f"{{0pt}}"
        )
    return lines


def build_research_experience(experience: list[dict[str, Any]], lang: str = "en") -> list[str]:
    title = "Forschungserfahrung" if lang == "de" else "Research Experience"
    lines = [f"\\section*{{{title}}}"]
    for i, exp in enumerate(experience):
        vspace = "4pt" if i < len(experience) - 1 else "0pt"
        role = exp.get("role_de", exp.get("role", "")) if lang == "de" else exp.get("role", "")
        period = exp.get("period_de", exp.get("period", "")) if lang == "de" else exp.get("period", "")
        location = exp.get("location_de", exp.get("location", "")) if lang == "de" else exp.get("location", "")
        org = exp.get("org_de", exp.get("org", "")) if lang == "de" else exp.get("org", "")
        lines.append(
            f"\\research"
            f"{{{latex_escape(role)}}}"
            f"{{{latex_escape(period)}}}"
            f"{{{latex_escape(org)}}}"
            f"{{{latex_escape(location)}}}"
            f"{{}}"
            f"{{}}"
            f"{{}}"
            f"{{{vspace}}}"
        )
    return lines


def build_publications(citations: int, h_index: int, date_str: str, lang: str = "en") -> list[str]:
    title = "Ausgewählte Publikationen" if lang == "de" else "Featured Publications"
    sub1 = "Zeitschriftenartikel" if lang == "de" else "Journal Articles"
    sub2 = "Preprints"
    metrics_str = (
        f"*Zitiermetriken basierend auf Google Scholar (h-index: {h_index}, Zitationen: {citations}), {date_str}."
        if lang == "de"
        else f"*Citation metrics based on Google Scholar (h-index: {h_index}, citations: {citations}), {date_str}."
    )

    lines = [f"\\section*{{{title}}}"]
    lines.append(f"\\noindent\\small\\textit{{{metrics_str}}}\\par")
    lines += [
        "\\nocite{*}",
        f"\\subsection*{{{sub1}}}",
        "\\printbibliography[type=article,heading=none]",
        "",
        f"\\subsection*{{{sub2}}}",
        "\\printbibliography[nottype=article,heading=none]",
    ]
    return lines


def build_teaching(teaching: list[dict[str, Any]], lang: str = "en") -> list[str]:
    if not teaching:
        return []
    title = "Lehrerfahrung" if lang == "de" else "Teaching Experience"
    lines = [f"\\section*{{{title}}}"]
    for i, t in enumerate(teaching):
        newline = " \\\\" if i < len(teaching) - 1 else ""
        role = t.get("role_de", t.get("role", "")) if lang == "de" else t.get("role", "")
        period = t.get("period_de", t.get("period", "")) if lang == "de" else t.get("period", "")
        location = t.get("location_de", t.get("location", "")) if lang == "de" else t.get("location", "")
        lines.append(
            f"\\cvitem{{{latex_escape(role)}, {latex_escape(location)}}}{{{latex_escape(period)}}}{newline}"
        )
    return lines


def build_leadership(leadership: list[dict[str, Any]], lang: str = "en") -> list[str]:
    title = "Führungserfahrung und akademischer Dienst" if lang == "de" else "Leadership Experience and Academic Service"
    lines = [f"\\section*{{{title}}}"]
    for i, lead in enumerate(leadership):
        vspace = "4pt" if i < len(leadership) - 1 else "0pt"
        role = lead.get("role_de", lead.get("role", "")) if lang == "de" else lead.get("role", "")
        period = lead.get("period_de", lead.get("period", "")) if lang == "de" else lead.get("period", "")
        location = lead.get("location_de", lead.get("location", "")) if lang == "de" else lead.get("location", "")
        org = lead.get("org_de", lead.get("org", "")) if lang == "de" else lead.get("org", "")
        lines.append(
            f"\\leadership"
            f"{{{latex_escape(role)}}}"
            f"{{{latex_escape(period)}}}"
            f"{{{latex_escape(org)}}}"
            f"{{{latex_escape(location)}}}"
            f"{{}}"
            f"{{}}"
            f"{{}}"
            f"{{{vspace}}}"
        )
    return lines


def build_awards(awards: list[dict[str, Any]], lang: str = "en") -> list[str]:
    title = "Preise, Auszeichnungen und Forschungsförderung" if lang == "de" else "Honors, Awards, and Research Funding"
    lines = [f"\\section*{{{title}}}"]
    for aw in awards:
        award = aw.get("award_de", aw.get("award", "")) if lang == "de" else aw.get("award", "")
        issuer = aw.get("issuer_de", aw.get("issuer", "")) if lang == "de" else aw.get("issuer", "")
        year = aw.get("year_de", aw.get("year", "")) if lang == "de" else aw.get("year", "")
        lines.append(
            f"\\award"
            f"{{{latex_escape(award)}}}"
            f"{{{latex_escape(year)}}}"
            f"{{{latex_escape(issuer)}}}"
            f"{{}}"
            f"{{}}"
        )
    return lines


def build_memberships(memberships: list[dict[str, Any]], lang: str = "en") -> list[str]:
    title = "Berufsverbände und Mitgliedschaften" if lang == "de" else "Professional Memberships"
    lines = [f"\\section*{{{title}}}"]
    for i, m in enumerate(memberships):
        name = m.get("name_de", m.get("name", "")) if lang == "de" else m.get("name", "")
        period = m.get("period_de", m.get("period", "")) if lang == "de" else m.get("period", "")
        detail = m.get("detail_de", m.get("detail", "")) if lang == "de" else m.get("detail", "")
        escaped_detail = latex_escape(detail)
        escaped_detail = escaped_detail.replace(". Societies:", ". \\\\ Societies:")
        spacer = "\\par\\vspace{3pt}" if i < len(memberships) - 1 else "\\par"
        lines.append(
            f"\\textbf{{{latex_escape(name)}}} \\hfill {latex_escape(period)} \\\\\n"
            f"\\textcolor{{mediacolor}}{{\\small {escaped_detail}}}{spacer}"
        )
    return lines


def build_references(references: list[dict[str, Any]], lang: str = "en") -> list[str]:
    title = "Referenzen" if lang == "de" else "References"
    lines = [
        f"\\section*{{{title}}}",
        "\\noindent",
    ]
    ref_blocks = []
    for ref in references:
        name = latex_escape(ref.get("name", ""))
        role = latex_escape(ref.get("role_de", ref.get("role", "")) if lang == "de" else ref.get("role", ""))
        org = latex_escape(ref.get("org_de", ref.get("org", "")) if lang == "de" else ref.get("org", ""))
        email = str(ref.get("email", "")).strip()
        block = (
            f"\\begin{{minipage}}[t]{{0.48\\textwidth}}\n"
            f"\\textbf{{{name}}} \\\\\n"
            f"{role} \\\\\n"
            f"{org} \\\\\n"
            f"\\faIcon{{envelope}} \\href{{mailto:{_href_escape(email)}}}{{\\nolinkurl{{{email}}}}}\n"
            f"\\end{{minipage}}"
        )
        ref_blocks.append(block)

    lines.append("%\n\\hfill\n".join(ref_blocks))
    return lines


def build_funding_acknowledgement(info: dict[str, Any], lang: str = "en") -> list[str]:
    ack = (
        info.get("fundingAcknowledgement_de") or info.get("fundingAcknowledgement", "")
        if lang == "de"
        else info.get("fundingAcknowledgement", "")
    )
    ack = str(ack or "").strip()
    if not ack:
        return []
    return [
        "\\vspace{8pt}",
        "\\noindent\\rule{\\textwidth}{0.4pt}\\\\[3pt]",
        f"{{\\small\\textit{{{latex_escape(ack)}}}}}",
    ]


def generate_tex(
    data: dict[str, Any],
    citations: int,
    h_index: int,
    date_str: str,
    lang: str = "en",
) -> str:
    info = data.get("personalInfo", {})
    sections: list[str] = []
    sections += build_preamble(lang=lang)
    sections += [
        "",
        "\\begin{document}",
        "",
    ]
    sections += build_header(info, lang=lang)
    sections += [""]
    sections += build_research_interests(
        data.get("researchInterests", ""),
        text_de=data.get("researchInterests_de"),
        lang=lang,
    )
    sections += [""]
    sections += build_education(data.get("education", []), lang=lang)
    sections += [""]
    sections += build_research_experience(data.get("researchExperience", []), lang=lang)
    sections += [""]
    sections += build_publications(citations, h_index, date_str, lang=lang)

    sections += [""]
    sections += build_awards(data.get("awards", []), lang=lang)
    sections += [""]
    sections += build_leadership(data.get("leadership", []), lang=lang)
    if data.get("teaching"):
        sections += [""]
        sections += build_teaching(data["teaching"], lang=lang)
    sections += [""]
    sections += build_memberships(data.get("memberships", []), lang=lang)
    sections += [""]
    sections += build_references(data.get("references", []), lang=lang)

    funding_section = build_funding_acknowledgement(info, lang=lang)
    if funding_section:
        sections += [""] + funding_section

    sections += ["", "\\end{document}", ""]
    return "\n".join(sections)


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(root, "data", "cv_data.json")
    tex_path_en = os.path.join(root, "data", "cv.tex")
    tex_path_de = os.path.join(root, "data", "cv_de.tex")

    if not os.path.exists(json_path):
        raise FileNotFoundError(f"cv_data.json not found at {json_path}")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    scholar_path = os.path.join(root, "data", "scholar_metrics.json")
    citations = 0
    h_index = 0
    if os.path.exists(scholar_path):
        try:
            with open(scholar_path, "r", encoding="utf-8") as f:
                sdata = json.load(f)
                citations = sdata.get("citations", {}).get("all", 0)
                h_index = sdata.get("hIndex", {}).get("all", 0)
        except Exception as e:
            print(f"Warning: could not read scholar_metrics.json: {e}")

    now = datetime.datetime.now()
    date_str_en = now.strftime("%B %Y")
    date_str_de = (
        now.strftime("%B %Y")
        .replace("January", "Januar")
        .replace("February", "Februar")
        .replace("March", "März")
        .replace("April", "April")
        .replace("May", "Mai")
        .replace("June", "Juni")
        .replace("July", "Juli")
        .replace("August", "August")
        .replace("September", "September")
        .replace("October", "Oktober")
        .replace("November", "November")
        .replace("December", "Dezember")
    )

    output_en = generate_tex(data, citations, h_index, date_str_en, lang="en")
    output_de = generate_tex(data, citations, h_index, date_str_de, lang="de")

    with open(tex_path_en, "w", encoding="utf-8", newline="\n") as f:
        f.write(output_en)
    print(f"Generated {os.path.abspath(tex_path_en)} from cv_data.json.")

    with open(tex_path_de, "w", encoding="utf-8", newline="\n") as f:
        f.write(output_de)
    print(f"Generated {os.path.abspath(tex_path_de)} from cv_data.json.")


if __name__ == "__main__":
    main()
