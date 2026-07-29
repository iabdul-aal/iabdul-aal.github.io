#!/usr/bin/env python3
"""Generate cv.tex and cv_de.tex from cv_data.json using the exact visual style, macros, colors, and layout of the original main.tex template."""

import json
import os
import re
import datetime


def latex_escape(text):
    if not isinstance(text, str):
        return str(text)
    # Chemical/material subscripts (must come BEFORE generic escaping)
    text = text.replace("NbOCl2", "NbOCl\\textsubscript{2}")
    text = text.replace("MoS2", "MoS\\textsubscript{2}")
    # Already-escaped backslash sequences from data protect them first
    protected = {}
    pattern = re.compile(r"\\[a-zA-Z]+\{[^}]*\}")
    def protect(m):
        key = f"PLACEHOLDER{len(protected)}END"
        protected[key] = m.group(0)
        return key
    text = pattern.sub(protect, text)
    # Standard LaTeX special characters
    text = text.replace("&", "\\&")
    text = text.replace("%", "\\%")
    text = text.replace("$", "\\$")
    text = text.replace("#", "\\#")
    text = text.replace("^", "\\^{}")
    text = text.replace("~", "\\textasciitilde{}")
    text = text.replace("_", "\\_")
    # Restore protected sequences
    for key, val in protected.items():
        text = text.replace(key, val)
    return text


def build_preamble(info, lang="en"):
    skills_label = "Kenntnisse:" if lang == "de" else "Skills:"
    attachments_label = "Anlagen:" if lang == "de" else "Attachments:"
    issuer_label = "Aussteller:" if lang == "de" else "Issuer:"

    lines = []
    lines += [
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
        "\\definecolor{SECTIONCOLOR}{RGB}{0,102,204}",
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
        "        \\begin{itemize}",
        "            #5",
        "        \\end{itemize}",
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
        "        \\begin{itemize}",
        "            #5",
        "        \\end{itemize}",
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
        "        \\begin{itemize}",
        "            #4",
        "        \\end{itemize}",
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
        "        \\begin{itemize}",
        "            #5",
        "        \\end{itemize}",
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
    return lines


def build_header(info, lang="en"):
    spec = info.get("specialization_de", info["specialization"]) if lang == "de" else info["specialization"]
    lines = []
    lines += [
        "% ==================== HEADER ====================",
        "\\begin{center}",
        f"    {{\\Huge\\bfseries\\color{{headercolor}} {info['name']}}} \\\\[6pt]",
        f"    {{\\large\\itshape {spec}}}",
        "    \\vspace{8pt}",
        "    ",
        f"    \\faIcon{{envelope}} \\href{{mailto:{info['email']}}}{{{info['email']}}} \\quad",
        f"    \\faGlobe\\ \\href{{https://{info['website']}}}{{{info['website']}}} \\\\",
        "    \\vspace{3pt}",
        f"    \\faLinkedinIn\\ \\href{{https://linkedin.com/in/{info['linkedin']}}}{{linkedin.com/in/{info['linkedin']}}} \\quad",
        f"    \\faIcon{{github}} \\href{{https://github.com/{info['github']}}}{{@{info['github']}}} \\quad",
        f"    \\orcidicon{{}} \\href{{https://orcid.org/{info['orcid']}}}{{{info['orcid']}}}",
        "\\end{center}",
        "\\vspace{-8pt}",
    ]
    return lines


def build_research_interests(text, text_de=None, lang="en"):
    title = "Forschungsinteressen" if lang == "de" else "Research Interests"
    content = (text_de or text) if lang == "de" else text
    return [
        f"\\section*{{{title}}}",
        latex_escape(content),
    ]


def build_education(education, lang="en"):
    title = "Ausbildung" if lang == "de" else "Education"
    lines = [f"\\section*{{{title}}}"]
    for ed in education:
        degree = ed.get("degree_de", ed["degree"]) if lang == "de" else ed["degree"]
        institution = ed.get("institution_de", ed["institution"]) if lang == "de" else ed["institution"]
        location = ed.get("location_de", ed["location"]) if lang == "de" else ed["location"]
        lines.append(
            f"\\education"
            f"{{{latex_escape(degree)}}}"
            f"{{{latex_escape(ed['period'])}}}"
            f"{{{latex_escape(institution)}}}"
            f"{{{latex_escape(location)}}}"
            f"{{}}"  # No bullet details
            f"{{}}"  # No skills
            f"{{}}"  # No attachments
            f"{{0pt}}"
        )
    return lines


def build_research_experience(experience, lang="en"):
    title = "Forschungserfahrung" if lang == "de" else "Research Experience"
    lines = [f"\\section*{{{title}}}"]
    for i, exp in enumerate(experience):
        vspace = "4pt" if i < len(experience) - 1 else "0pt"
        role = exp.get("role_de", exp["role"]) if lang == "de" else exp["role"]
        period = exp.get("period_de", exp["period"]) if lang == "de" else exp["period"]
        location = exp.get("location_de", exp["location"]) if lang == "de" else exp["location"]
        org = exp.get("org_de", exp["org"]) if lang == "de" else exp["org"]
        lines.append(
            f"\\research"
            f"{{{latex_escape(role)}}}"
            f"{{{latex_escape(period)}}}"
            f"{{{latex_escape(org)}}}"
            f"{{{latex_escape(location)}}}"
            f"{{}}"  # No bullet details
            f"{{}}"  # No skills
            f"{{}}"  # No attachments
            f"{{{vspace}}}"
        )
    return lines


def build_publications(citations, h_index, date_str, lang="en"):
    title = "Ausgewählte Publikationen" if lang == "de" else "Selected Publications"
    sub1 = "Zeitschriftenartikel" if lang == "de" else "Journal Articles"
    sub2 = "Preprints"
    metrics_str = f"*Zitiermetriken basierend auf Google Scholar (h-index: {h_index}, Zitationen: {citations}), {date_str}." if lang == "de" else f"*Citation metrics based on Google Scholar (h-index: {h_index}, citations: {citations}), {date_str}."
    
    lines = [f"\\section*{{{title}}}"]
    lines.append(f"\\noindent\\small\\textit{{{metrics_str}}}\\par")
    lines += [
        "\\nocite{*}",
        f"\\subsection*{{{sub1}}}",
        "\\printbibliography[type=article,heading=none]",
        "",
        f"\\subsection*{{{sub2}}}",
        "\\printbibliography[type=unpublished,heading=none]",
    ]
    return lines


def build_teaching(teaching, lang="en"):
    title = "Lehre und Mentoring-Erfahrung" if lang == "de" else "Teaching and Mentoring Experience"
    lines = [f"\\section*{{{title}}}"]
    for i, t in enumerate(teaching):
        newline = " \\\\" if i < len(teaching) - 1 else ""
        role = t.get("role_de", t["role"]) if lang == "de" else t["role"]
        period = t.get("period_de", t["period"]) if lang == "de" else t["period"]
        location = t.get("location_de", t["location"]) if lang == "de" else t["location"]
        lines.append(
            f"\\cvitem{{{latex_escape(role)}, {latex_escape(location)}}}{{{latex_escape(period)}}}{newline}"
        )
    return lines


def build_leadership(leadership, lang="en"):
    title = "Führungserfahrung und akademischer Dienst" if lang == "de" else "Leadership Experience and Academic Service"
    lines = [f"\\section*{{{title}}}"]
    for i, lead in enumerate(leadership):
        vspace = "4pt" if i < len(leadership) - 1 else "0pt"
        role = lead.get("role_de", lead["role"]) if lang == "de" else lead["role"]
        period = lead.get("period_de", lead["period"]) if lang == "de" else lead["period"]
        location = lead.get("location_de", lead["location"]) if lang == "de" else lead["location"]
        org = lead.get("org_de", lead["org"]) if lang == "de" else lead["org"]
        lines.append(
            f"\\leadership"
            f"{{{latex_escape(role)}}}"
            f"{{{latex_escape(period)}}}"
            f"{{{latex_escape(org)}}}"
            f"{{{latex_escape(location)}}}"
            f"{{}}"  # No bullet details
            f"{{}}"  # No skills
            f"{{}}"  # No attachments
            f"{{{vspace}}}"
        )
    return lines


def build_awards(awards, lang="en"):
    title = "Preise, Auszeichnungen und Forschungsförderung" if lang == "de" else "Honors, Awards, and Research Funding"
    lines = [f"\\section*{{{title}}}"]
    for aw in awards:
        award = aw.get("award_de", aw["award"]) if lang == "de" else aw["award"]
        issuer = aw.get("issuer_de", aw["issuer"]) if lang == "de" else aw["issuer"]
        lines.append(
            f"\\award"
            f"{{{latex_escape(award)}}}"
            f"{{{latex_escape(aw['year'])}}}"
            f"{{{latex_escape(issuer)}}}"
            f"{{}}" # No details
            f"{{}}" # No attachments
        )
    return lines


def build_memberships(memberships, lang="en"):
    title = "Berufsverbände und Mitgliedschaften" if lang == "de" else "Professional Memberships"
    lines = [f"\\section*{{{title}}}", "\\begin{itemize}"]
    for m in memberships:
        name = m.get("name_de", m["name"]) if lang == "de" else m["name"]
        period = m.get("period_de", m["period"]) if lang == "de" else m["period"]
        detail = m.get("detail_de", m["detail"]) if lang == "de" else m["detail"]
        escaped_detail = latex_escape(detail)
        escaped_detail = escaped_detail.replace(". Societies:", ". \\\\ Societies:")
        lines.append(
            f"  \\item \\textbf{{{latex_escape(name)}}} \\hfill {latex_escape(period)} \\\\"
            f"  \\textcolor{{mediacolor}}{{\\small {escaped_detail}}}"
        )
    lines += ["\\end{itemize}"]
    return lines


def build_references(references, lang="en"):
    title = "Referenzen" if lang == "de" else "References"
    lines = [
        f"\\section*{{{title}}}",
        "\\noindent"
    ]
    ref_blocks = []
    for ref in references:
        name = latex_escape(ref['name'])
        role = latex_escape(ref.get("role_de", ref["role"]) if lang == "de" else ref["role"])
        org = latex_escape(ref.get("org_de", ref["org"]) if lang == "de" else ref["org"])
        email = ref['email']
        block = f"\\begin{{minipage}}[t]{{0.48\\textwidth}}\n\\textbf{{{name}}} \\\\\n{role} \\\\\n{org} \\\\\n\\faIcon{{envelope}} \\href{{mailto:{email}}}{{\\nolinkurl{{{email}}}}}\n\\end{{minipage}}"
        ref_blocks.append(block)

    lines.append("%\n\\hfill\n".join(ref_blocks))
    return lines


def generate_tex(data, citations, h_index, date_str, lang="en"):
    info = data["personalInfo"]
    sections = []
    sections += build_preamble(info, lang=lang)
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
    sections += build_education(data["education"], lang=lang)
    sections += [""]
    sections += build_research_experience(data["researchExperience"], lang=lang)
    sections += [""]
    sections += build_publications(citations, h_index, date_str, lang=lang)
    sections += [""]
    sections += build_awards(data["awards"], lang=lang)
    sections += [""]
    sections += build_leadership(data["leadership"], lang=lang)
    sections += [""]
    sections += build_teaching(data["teaching"], lang=lang)
    sections += [""]
    sections += build_memberships(data["memberships"], lang=lang)
    sections += [""]
    sections += build_references(data["references"], lang=lang)
    
    sections += ["", "\\end{document}", ""]
    return "\n".join(sections)


def main():
    json_path = os.path.join(os.path.dirname(__file__), "..", "data", "cv_data.json")
    tex_path_en = os.path.join(os.path.dirname(__file__), "..", "data", "cv.tex")
    tex_path_de = os.path.join(os.path.dirname(__file__), "..", "data", "cv_de.tex")

    if not os.path.exists(json_path):
        raise FileNotFoundError(f"cv_data.json not found at {json_path}")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Read scholar metrics
    scholar_path = os.path.join(os.path.dirname(__file__), "..", "data", "scholar_metrics.json")
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
