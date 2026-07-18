#!/usr/bin/env python3
"""Generate cv.tex from cv_data.json using the exact visual style, macros, colors, and layout of the original main.tex template, with lmodern vector font, delivery modes, and perfectly consistent vertical spaces."""

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


def build_preamble(info):
    lines = []
    lines += [
        "% Academic CV Template for PhD Applications",
        "% Optimized for Professional Standards and ATS Compatibility",
        "\\documentclass[11pt,a4paper]{article}",
        "",
        "% ================== PACKAGES ==================",
        "\\usepackage[utf8]{inputenc}",
        "\\usepackage[T1]{fontenc}",
        "\\usepackage{lmodern} % Premium vector computer modern font to prevent pixelated PK fonts",
        "\\usepackage[margin=1.5cm]{geometry}",
        "\\usepackage{enumitem}",
        "\\usepackage{titlesec}",
        "\\usepackage{hyperref}",
        "\\urlstyle{same} % Render URLs/emails in same body font instead of typewriter font",
        "\\usepackage{xcolor}",
        "\\definecolor{SECTIONCOLOR}{RGB}{0,102,204}",
        "\\usepackage{fontawesome5}",
        "\\usepackage{graphicx}",
        "\\usepackage{tabularx}",
        "\\newcolumntype{R}{>{\\raggedleft\\arraybackslash}X} % Right-aligned X column",
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
        "\\newcommand{\\education}[8]{%",
        "    \\textbf{#1} \\hfill #2 \\\\%",
        "    \\textit{#3} \\hfill \\textit{#4}%",
        "    \\ifblank{#5}{}{%",
        "        \\vspace{2pt}%",
        "        \\begin{itemize}%",
        "            #5%",
        "        \\end{itemize}%",
        "    }%",
        "    \\ifblank{#6}{}{%",
        "        \\textcolor{sectioncolor}{\\small\\textbf{Skills:}} \\textcolor{black}{\\small #6} \\\\%",
        "    }%",
        "    \\ifblank{#7}{}{%",
        "        \\textcolor{mediacolor}{\\small\\faIcon{link} \\textbf{Attachments:} #7}%",
        "    }%",
        "    \\ifblank{#8}{}{\\vspace{#8}}%",
        "    \\par\\vspace{3pt}% Ensure paragraph break and spacing",
        "}",
        "",
        "% Research experience",
        "\\newcommand{\\research}[8]{%",
        "    \\textbf{#1} \\hfill #2 \\\\%",
        "    \\textit{#3} \\hfill \\textit{#4}%",
        "    \\ifblank{#5}{}{%",
        "        \\vspace{2pt}%",
        "        \\begin{itemize}%",
        "            #5%",
        "        \\end{itemize}%",
        "    }%",
        "    \\ifblank{#6}{}{%",
        "        \\textcolor{sectioncolor}{\\small\\textbf{Skills:}} \\textcolor{black}{\\small #6} \\\\%",
        "    }%",
        "    \\ifblank{#7}{}{%",
        "        \\textcolor{mediacolor}{\\small\\faIcon{link} \\textbf{Attachments:} #7}%",
        "    }%",
        "    \\ifblank{#8}{}{\\vspace{#8}}%",
        "    \\par\\vspace{3pt}% Ensure paragraph break and spacing",
        "}",
        "",
        "% Award",
        "\\newcommand{\\award}[5]{%",
        "    \\textbf{#1} \\hfill #2 \\\\%",
        "    \\textit{Issuer:} #3%",
        "    \\vspace{2pt}%",
        "    \\ifblank{#4}{}{%",
        "        \\begin{itemize}%",
        "            #4%",
        "        \\end{itemize}%",
        "    }%",
        "    \\ifblank{#5}{}{%",
        "        \\textcolor{mediacolor}{\\small\\faIcon{link} \\textbf{Attachments:} #5} \\\\%",
        "    }%",
        "    \\vspace{2pt}%",
        "    \\par\\vspace{3pt}% Ensure paragraph break and spacing",
        "}",
        "",
        "% Leadership",
        "\\newcommand{\\leadership}[8]{%",
        "    \\textbf{#1} \\hfill #2 \\\\%",
        "    \\textit{#3} \\hfill \\textit{#4}%",
        "    \\ifblank{#5}{}{%",
        "        \\vspace{2pt}%",
        "        \\begin{itemize}%",
        "            #5%",
        "        \\end{itemize}%",
        "    }%",
        "    \\ifblank{#6}{}{%",
        "        \\textcolor{sectioncolor}{\\small\\textbf{Skills:}} \\textcolor{black}{\\small #6} \\\\%",
        "    }%",
        "    \\ifblank{#7}{}{%",
        "        \\textcolor{mediacolor}{\\small\\faIcon{link} \\textbf{Attachments:} #7}%",
        "    }%",
        "    \\ifblank{#8}{}{\\vspace{#8}}%",
        "    \\par\\vspace{3pt}% Ensure paragraph break and spacing",
        "}",
        "",
        "% Simple item",
        "\\newcommand{\\cvitem}[2]{%",
        "    \\textbf{#1} \\hfill #2%",
        "}",
        "",
        "% Reference (no phone number)",
        "\\newcommand{\\reference}[4]{%",
        "    \\textbf{#1} \\\\%",
        "    #2 \\\\%",
        "    #3 \\\\%",
        "    \\faIcon{envelope} \\href{mailto:#4}{\\nolinkurl{#4}}%",
        "    \\par\\vspace{3pt}% Ensure column/paragraph separation",
        "}",
        "",
        "% ORCID icon",
        "\\newcommand{\\orcidicon}{\\includegraphics[height=1em]{orcid.png}}",
    ]
    return lines


def build_header(info):
    lines = []
    lines += [
        "% ==================== HEADER ====================",
        "\\begin{center}",
        f"    {{\\Huge\\bfseries\\color{{headercolor}} {info['name']}}} \\\\[6pt]",
        f"    {{\\large\\itshape {info['specialization']}}}",
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


def build_research_interests(text):
    return [
        "\\section*{Research Interests}",
        latex_escape(text),
    ]


def build_education(education):
    lines = ["\\section*{Education}"]
    for ed in education:
        lines.append(
            f"\\education"
            f"{{{latex_escape(ed['degree'])}}}"
            f"{{{latex_escape(ed['period'])}}}"
            f"{{{latex_escape(ed['institution'])}}}"
            f"{{{latex_escape(ed['location'])}}}"
            f"{{}}" # No details
            f"{{}}" # No skills
            f"{{}}" # No attachments
            f"{{0pt}}"
        )
    return lines


def build_research_experience(experience):
    lines = ["\\section*{Research Experience}"]
    for i, exp in enumerate(experience):
        vspace = "4pt" if i < len(experience) - 1 else "0pt"
        lines.append(
            f"\\research"
            f"{{{latex_escape(exp['role'])}}}"
            f"{{{latex_escape(exp['period'])}}}"
            f"{{{latex_escape(exp['org'])}}}"
            f"{{{latex_escape(exp['location'])}}}"
            f"{{}}" # No details
            f"{{}}" # No skills
            f"{{}}" # No attachments
            f"{{{vspace}}}"
        )
    return lines


def build_publications(citations, h_index, date_str):
    lines = ["\\section*{Selected Publications}"]
    lines.append(f"\\noindent\\small\\textit{{*Citation metrics based on Google Scholar (h-index: {h_index}, citations: {citations}), {date_str}.}}\\par")
    lines += [
        "\\nocite{*}",
        "\\subsection*{Journal Articles}",
        "\\printbibliography[type=article,heading=none]",
        "",
        "\\subsection*{Preprints}",
        "\\printbibliography[type=preprint,heading=none]",
    ]
    return lines


def build_teaching(teaching):
    lines = ["\\section*{Teaching and Mentoring Experience}"]
    for i, t in enumerate(teaching):
        newline = " \\\\" if i < len(teaching) - 1 else ""
        lines.append(
            f"\\cvitem{{{latex_escape(t['role'])}, {latex_escape(t['location'])}}}{{{latex_escape(t['period'])}}}{newline}"
        )
    return lines


def build_leadership(leadership):
    lines = ["\\section*{Leadership Experience and Academic Service}"]
    for i, lead in enumerate(leadership):
        vspace = "4pt" if i < len(leadership) - 1 else "0pt"
        lines.append(
            f"\\leadership"
            f"{{{latex_escape(lead['role'])}}}"
            f"{{{latex_escape(lead['period'])}}}"
            f"{{{latex_escape(lead['org'])}}}"
            f"{{{latex_escape(lead['location'])}}}"
            f"{{}}" # No details
            f"{{}}" # No skills
            f"{{}}" # No attachments
            f"{{{vspace}}}"
        )
    return lines


def build_awards(awards):
    lines = ["\\section*{Honors, Awards, and Research Funding}"]
    for aw in awards:
        lines.append(
            f"\\award"
            f"{{{latex_escape(aw['award'])}}}"
            f"{{{latex_escape(aw['year'])}}}"
            f"{{{latex_escape(aw['issuer'])}}}"
            f"{{}}" # No details
            f"{{}}" # No attachments
        )
    return lines


def build_memberships(memberships):
    lines = ["\\section*{Professional Memberships}", "\\begin{itemize}"]
    for m in memberships:
        escaped_detail = latex_escape(m['detail'])
        escaped_detail = escaped_detail.replace(". Societies:", ". \\\\ Societies:")
        lines.append(
            f"  \\item \\textbf{{{latex_escape(m['name'])}}} \\hfill {latex_escape(m['period'])} \\\\"
            f"  \\textcolor{{mediacolor}}{{\\small {escaped_detail}}}"
        )
    lines += ["\\end{itemize}"]
    return lines


def build_references(references):
    lines = [
        "\\section*{References}",
        "\\noindent",
        "\\begin{tabularx}{\\textwidth}{@{} X X @{}}"
    ]
    # Row 1: Names
    names = [f"\\textbf{{{latex_escape(ref['name'])}}}" for ref in references]
    lines.append("    " + " & ".join(names) + " \\\\")
    
    # Row 2: Roles
    roles = [f"{latex_escape(ref['role'])}" for ref in references]
    lines.append("    " + " & ".join(roles) + " \\\\")
    
    # Row 3: Organizations
    orgs = [f"{latex_escape(ref['org'])}" for ref in references]
    lines.append("    " + " & ".join(orgs) + " \\\\")
    
    # Row 4: Emails
    emails = []
    for ref in references:
        email = ref['email']
        emails.append(f"\\faIcon{{envelope}} \\href{{mailto:{email}}}{{\\nolinkurl{{{email}}}}}")
    lines.append("    " + " & ".join(emails) + " \\\\")
    
    lines.append("\\end{tabularx}")
    return lines


def main():
    json_path = os.path.join(os.path.dirname(__file__), "..", "data", "cv_data.json")
    tex_path  = os.path.join(os.path.dirname(__file__), "..", "data", "cv.tex")

    if not os.path.exists(json_path):
        raise FileNotFoundError(f"cv_data.json not found at {json_path}")

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    info = data["personalInfo"]

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
    date_str = now.strftime("%B %Y")

    sections = []
    sections += build_preamble(info)
    sections += [
        "",
        "\\begin{document}",
        "",
    ]
    sections += build_header(info)
    sections += [""]
    sections += build_research_interests(data.get("researchInterests", ""))
    
    # EXACT ORIGINAL FLOW WITH CONSISTENT SECTION BLANK LINES:
    # 1. Education
    sections += [""]
    sections += build_education(data["education"])
    # 2. Research Experience
    sections += [""]
    sections += build_research_experience(data["researchExperience"])
    # 3. Publications
    sections += [""]
    sections += build_publications(citations, h_index, date_str)
    # 4. Honors & Awards
    sections += [""]
    sections += build_awards(data["awards"])
    # 5. Leadership
    sections += [""]
    sections += build_leadership(data["leadership"])
    # 6. Teaching
    sections += [""]
    sections += build_teaching(data["teaching"])
    # 7. Professional Memberships
    sections += [""]
    sections += build_memberships(data["memberships"])
    # 8. References
    sections += [""]
    sections += build_references(data["references"])
    
    sections += ["", "\\end{document}", ""]

    output = "\n".join(sections)

    with open(tex_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(output)

    print(f"Generated {os.path.abspath(tex_path)} from cv_data.json.")


if __name__ == "__main__":
    main()
