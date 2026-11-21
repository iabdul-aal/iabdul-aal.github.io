# Data Directory Rules

- Treat `data/cv_data.json` (`personalInfo`) as the single canonical source for identity fields (`name`, `specialization`, `email`, `orcid`) and as the sole source driving `cv.tex` and `cv_de.tex`.
- Keep `data/cv_data.json` `tools` IDs synchronized with `projects` in `lib/academic-content.ts`.
- Never manually edit derived files (`data/cv.tex`, `data/cv_de.tex`, `data/publications.bib`, `data/activity.json`, `data/cv.pdf`, `data/cv_de.pdf`) as primary sources; regenerate them through the scripts under `scripts/`.
- Never leave bullet list macros (`\begin{itemize}`, `\item`) or a software/tools section in `cv.tex` or `cv_de.tex`.
- Represent chemical formulas with Unicode subscripts (`NbOCl₂`) in JSON files; convert to TeX subscripts (`$_2$`) only in `.bib` and `.tex` generators.
- Preserve existing metrics in `paper_metrics.json` and `project_metrics.json` when upstream APIs return empty or error responses.
- Keep `personalInfo.phone` empty and never store street addresses, matriculation IDs, or expiring presigned URLs.
