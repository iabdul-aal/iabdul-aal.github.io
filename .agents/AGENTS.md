# iabdul-aal-website

Academic website of Islam I. Abdulaal, presenting research in integrated photonics, publications, and selected tools.

## Project Structure

| Path | Type | Purpose |
| ---- | ---- | ------- |
| `app/` | Directory | Next.js App Router pages and layouts |
| `components/` | Directory | Reusable React components (UI elements, lists) |
| `lib/` | Directory | Core logic, configuration, and academic database loaders |
| `public/` | Directory | Static assets (favicons, logos, materials, CNAME) |
| `cv_data.json` | File | Single source of truth for all CV content (drives both website and PDF) |
| `publications.json` | File | Database of publication records |
| `talks.json` | File | Database of presentation and talk records |

## Quick Reference

### Languages and Tooling

- Languages: TypeScript, JavaScript, Python
- Package Manager: npm

### Commands

```bash
npm run dev       # Start local development server
npm run build     # Compile static HTML production export
npm run lint      # Check codebase linting via ESLint
npm run typecheck # Check TypeScript types compilation
npm run check     # Run full verification (lint + typecheck)
python scripts/update_cv_tex.py  # Regenerate cv.tex from cv_data.json
```

## Universal Rules

1. Run `npm run check` to verify clean build status before pushing.

2. Keep codebase minimal and research-focused:
   * Accent color is gold/bronze (`#b68c61`).
   * Never mention commercial software names (e.g. MATLAB, COMSOL, Lumerical) in research descriptions; use generic physical/computational terms (e.g., FDTD, drift-diffusion).
   * All publications are managed dynamically in `publications.json` with overrides in `lib/publications.ts`.
   * Major tools (citable design artifacts / code availability of published papers) are featured on the homepage. Minor tools (single code ideas without published papers) are not featured on the homepage and are not listed under research topics on the research page.

3. Force-pushes to the default branch are blocked. Update using linear commits after syncing with remote.

4. **Character and writing style rules** — applied to ALL written content (JSON data files, markdown, TypeScript strings, LaTeX source):
   * The `&` character is **forbidden** as a written connective. Always write "and".
   * The em-dash character `—` (U+2014) is **forbidden**. Restructure sentences to avoid it; use a comma, semicolon, or separate sentence instead.
   * Academic writing style is required: precise, impersonal, and concise. Avoid colloquialisms, marketing language, redundant qualifiers, and first-person framing.
   * Font choices must remain consistent with the existing design system. Do not introduce new font families or break the established typographic scale.
   * In LaTeX source, the only permitted dash forms are `--` (en-dash, for ranges) and `---` (em-dash, for sentence punctuation in LaTeX typesetting only). Raw Unicode em-dashes are forbidden everywhere.

5. **Automation-first principle** — any element in the site that could change over time MUST be backed by a GitHub Actions workflow or a pipeline script that runs on push. Before adding any new static data field, ask: "can this update itself?" If yes, build the automation first, then add the data.
   * **CV pipeline**: All CV content lives in `data/cv_data.json`. The script `scripts/update_cv_tex.py` generates `data/cv.tex` from it. The workflow `.github/workflows/rebuild_cv.yml` runs the full compile (`pdflatex + biber + pdflatex x2`) on every push that touches CV-related files and auto-commits the updated `public/cv.pdf`.
   * **Publication selection**: Both the website CV page and the PDF CV select and order publications using the same citation-ranked algorithm as the homepage: rank by `cited_by_count` from `data/paper_metrics.json`, fall back to newest-first. `data/paper_metrics.json` is refreshed automatically by the weekly cron workflow.
   * **Tool selection**: Both the website CV page and the PDF CV show only major tools (`tier !== "minor"`) ranked by the composite engagement score from `data/project_metrics.json` (stars x10 + forks x5 + Zenodo downloads x2 + views). `data/project_metrics.json` is refreshed automatically by the weekly cron workflow.
   * **Tools and publications in cv_data.json**: The `tools` array in `data/cv_data.json` mirrors `projects` in `lib/academic-content.ts`. When a new project is added to `academic-content.ts`, it must also be added to `data/cv_data.json`. A sync check is performed in the rebuild workflow.

6. **Content governance** — all static text on the website must comply with the rules in `docs/CONTENT.md`. Before editing any user-facing text, read `docs/CONTENT.md` and verify compliance with paragraph length limits, anti-repetition rules, structural page-header format, and voice/person requirements.

7. **Single source of truth for identity** — the canonical name, specialization, email, and ORCID are in `data/cv_data.json → personalInfo`. `lib/site-config.ts` and `lib/academic-content.ts` must derive these from `data/cv_data.json`. Never hardcode the full name in component JSX; always reference `identity.name` or `siteConfig.name`.
