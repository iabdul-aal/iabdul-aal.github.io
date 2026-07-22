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


def build_research_interests(text, lang="en"):
    title = "Forschungsinteressen" if lang == "de" else "Research Interests"
    return [
        f"\\section*{{{title}}}",
        latex_escape(text),
    ]


def build_education(education, lang="en"):
    title = "Ausbildung" if lang == "de" else "Education"
    lines = [f"\\section*{{{title}}}"]
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


def build_research_experience(experience, lang="en"):
    title = "Forschungserfahrung" if lang == "de" else "Research Experience"
    lines = [f"\\section*{{{title}}}"]
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


def build_publications(citations, h_index, date_str, lang="en"):
    title = "Ausgewählte Publikationen" if lang == "de" else "Selected Publications"
    j_title = "Zeitschriftenartikel" if lang == "de" else "Journal Articles"
    p_title = "Preprints"
    note = (
        f"\\noindent\\small\\textit{{*Zitiermetriken basierend auf Google Scholar (h-index: {h_index}, Zitationen: {citations}), {date_str}.}}\\par"
        if lang == "de"
        else f"\\noindent\\small\\textit{{*Citation metrics based on Google Scholar (h-index: {h_index}, citations: {citations}), {date_str}.}}\\par"
    )
    lines = [f"\\section*{{{title}}}", note]
    lines += [
        "\\nocite{*}",
        f"\\subsection*{{{j_title}}}",
        "\\printbibliography[type=article,heading=none]",
        "",
        f"\\subsection*{{{p_title}}}",
        "\\printbibliography[type=preprint,heading=none]",
    ]
    return lines


def build_teaching(teaching, lang="en"):
    title = "Lehre und Mentoring" if lang == "de" else "Teaching and Mentoring Experience"
    lines = [f"\\section*{{{title}}}"]
    for i, t in enumerate(teaching):
        newline = " \\\\" if i < len(teaching) - 1 else ""
        lines.append(
            f"\\cvitem{{{latex_escape(t['role'])}, {latex_escape(t['location'])}}}{{{latex_escape(t['period'])}}}{newline}"
        )
    return lines


def build_leadership(leadership, lang="en"):
    title = "Führungs- und Gremienerfahrung" if lang == "de" else "Leadership Experience and Academic Service"
    lines = [f"\\section*{{{title}}}"]
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


def build_awards(awards, lang="en"):
    title = "Preise und Auszeichnungen" if lang == "de" else "Honors, Awards, and Research Funding"
    lines = [f"\\section*{{{title}}}"]
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


def build_memberships(memberships, lang="en"):
    title = "Mitgliedschaften" if lang == "de" else "Professional Memberships"
    lines = [f"\\section*{{{title}}}", "\\begin{itemize}"]
    for m in memberships:
        escaped_detail = latex_escape(m['detail'])
        escaped_detail = escaped_detail.replace(". Societies:", ". \\\\ Societies:")
        lines.append(
            f"  \\item \\textbf{{{latex_escape(m['name'])}}} \\hfill {latex_escape(m['period'])} \\\\"
            f"  \\textcolor{{mediacolor}}{{\\small {escaped_detail}}}"
        )
    lines += ["\\end{itemize}"]
    return lines


def build_references(references, lang="en"):
    title = "Referenzen" if lang == "de" else "References"
    lines = [
        f"\\section*{{{title}}}",
        "\\noindent",
        "\\begin{tabularx}{\\textwidth}{@{} X X @{}}"
    ]
    names = [f"\\textbf{{{latex_escape(ref['name'])}}}" for ref in references]
    lines.append("    " + " & ".join(names) + " \\\\")
    
    roles = [f"{latex_escape(ref['role'])}" for ref in references]
    lines.append("    " + " & ".join(roles) + " \\\\")
    
    orgs = [f"{latex_escape(ref['org'])}" for ref in references]
    lines.append("    " + " & ".join(orgs) + " \\\\")
    
    emails = []
    for ref in references:
        email = ref['email']
        emails.append(f"\\faIcon{{envelope}} \\href{{mailto:{email}}}{{\\nolinkurl{{{email}}}}}")
    lines.append("    " + " & ".join(emails) + " \\\\")
    
    lines.append("\\end{tabularx}")
    return lines



def translate_data_for_german(data):
    import copy
    de_data = copy.deepcopy(data)
    
    de_data["personalInfo"]["specialization"] = "Forscher für Integrierte Photonik"
    de_data["researchInterests"] = (
        "Integrierte Nanophotonik, quantenphotonische Quellen, nichtlineare On-Chip-Bauelemente, "
        "physikinformiertes Inversdesign und wellengleichungsbeschränkte neuronale Netze zur Optimierung photonischer Bauelemente."
    )
    
    for ed in de_data.get("education", []):
        if "B.Sc." in ed.get("degree", ""):
            ed["degree"] = "B.Sc. in Elektronik und Kommunikationstechnik"
        if "Faculty of Engineering" in ed.get("institution", ""):
            ed["institution"] = "Universität Alexandria, Fakultät für Ingenieurwissenschaften"
        ed["location"] = "Vor Ort" if ed.get("location") == "Onsite" else ed.get("location")
        ed["period"] = ed.get("period", "").replace("Present", "Heute")

    for exp in de_data.get("researchExperience", []):
        if exp.get("role") == "Research Intern":
            exp["role"] = "Forschungspraktikant"
        exp["location"] = (
            "Remote" if exp.get("location") == "Remote"
            else "Hybrid" if exp.get("location") == "Hybrid"
            else exp.get("location")
        )
        exp["period"] = exp.get("period", "").replace("Present", "Heute")

    award_translations = {
        "Dean's Honors for Academic Excellence": "Ehrenpreis des Dekans für akademische Spitzenleistungen",
        "ICMTC Artificial Intelligence Contest (AIC-2) -- 4th Place": "ICMTC Wettbewerb für Künstliche Intelligenz (AIC-2) -- 4. Platz",
        "Huawei ICT Skills Competition -- National Finalist (AI Track)": "Huawei ICT Skills Wettbewerb -- Nationaler Finalist (KI-Track)",
        "NASA Space Apps Challenge -- Global Nominee": "NASA Space Apps Challenge -- Globaler Nominierter",
    }
    for aw in de_data.get("awards", []):
        if aw.get("award") in award_translations:
            aw["award"] = award_translations[aw["award"]]

    leadership_translations = {
        "Board Member": "Vorstandsmitglied",
        "Chairman": "Vorsitzender",
        "General Coordinator": "Hauptkoordinator",
    }
    for lead in de_data.get("leadership", []):
        if lead.get("role") in leadership_translations:
            lead["role"] = leadership_translations[lead["role"]]
        lead["location"] = (
            "Remote" if lead.get("location") == "Remote"
            else "Hybrid" if lead.get("location") == "Hybrid"
            else lead.get("location")
        )
        lead["period"] = lead.get("period", "").replace("Present", "Heute")

    for t in de_data.get("teaching", []):
        if t.get("role") == "Tutor / Mentor":
            t["role"] = "Tutor / Mentor"
        t["period"] = t.get("period", "").replace("Present", "Heute")

    for m in de_data.get("memberships", []):
        m["period"] = m.get("period", "").replace("Present", "Heute")
        if "Student Member" in m.get("detail", ""):
            m["detail"] = m["detail"].replace("Student Member", "Studentisches Mitglied")

    for r in de_data.get("references", []):
        if r.get("role") == "Research Scientist":
            r["role"] = "Wissenschaftlicher Mitarbeiter"
        elif r.get("role") == "Postdoctoral Researcher":
            r["role"] = "Postdoktorand"

    return de_data


def generate_tex(data, citations, h_index, date_str, lang="en"):
    if lang == "de":
        data = translate_data_for_german(data)
        date_str = datetime.datetime.now().strftime("%B %Y").replace("July", "Juli").replace("August", "August").replace("September", "September")

    info = data["personalInfo"]
    sections = []
    sections += build_preamble(info)
    sections += [
        "",
        "\\begin{document}",
        "",
    ]
    sections += build_header(info)
    sections += [""]
    sections += build_research_interests(data.get("researchInterests", ""), lang=lang)
    
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

    output_en = generate_tex(data, citations, h_index, date_str, lang="en")
    with open(tex_path_en, "w", encoding="utf-8", newline="\n") as f:
        f.write(output_en)
    print(f"Generated {os.path.abspath(tex_path_en)} from cv_data.json.")

    output_de = generate_tex(data, citations, h_index, date_str, lang="de")
    with open(tex_path_de, "w", encoding="utf-8", newline="\n") as f:
        f.write(output_de)
    print(f"Generated {os.path.abspath(tex_path_de)} from cv_data.json.")



if __name__ == "__main__":
    main()
