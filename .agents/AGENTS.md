# iabdul-aal-website

Academic website of Islam I. Abdulaal, presenting research in integrated photonics, publications, and selected tools.

## Project Structure

| Path | Type | Purpose |
| ---- | ---- | ------- |
| `app/` | Directory | Next.js App Router pages and layouts |
| `components/` | Directory | Reusable React components (UI elements, lists) |
| `lib/` | Directory | Core logic, configuration, and academic database loaders |
| `public/` | Directory | Static assets (favicons, logos, PDFs, RSS feed, CNAME) |
| `data/cv_data.json` | File | Single source of truth for all CV content (drives both website and PDF) |
| `data/publications.json` | File | Database of publication records |
| `data/talks.json` | File | Database of presentation and talk records |

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
python scripts/update_cv_tex.py  # Regenerate cv.tex and cv_de.tex from cv_data.json
```

## Universal Rules

1. Run `npm run check` to verify clean build status before pushing.

2. Keep codebase minimal and research-focused:
   * Accent color is gold/bronze (`#b68c61`).
   * Never mention commercial software names (e.g. MATLAB, COMSOL, Lumerical) in research descriptions; use generic physical/computational terms (e.g., FDTD, drift-diffusion).
   * All publications are managed dynamically in `data/publications.json` with overrides in `lib/publications.ts`.
   * Major tools (citable design artifacts / code availability of published papers) are featured on the homepage. Minor tools (single code ideas without published papers) are not featured on the homepage and are not listed under research topics on the research page.

3. Force-pushes to the default branch are blocked. Update using linear commits after syncing with remote.

4. **Character and writing style rules**, applied to ALL written content (JSON data files, markdown, TypeScript strings, LaTeX source):
   * The `&` character is **forbidden** as a written connective. Always write "and".
   * The em-dash character `U+2014` is **forbidden**. Restructure sentences to avoid it; use a comma, semicolon, or separate sentence instead.
   * Dot dividers (`U+00B7` middle dots, bullet dots, or periods between clauses/metadata items) are **forbidden**; use a comma (`,`) or hyphen (`-`), reserving `.` strictly for full stops and abbreviations.
   * Academic writing style is required: precise, impersonal, and concise. Avoid colloquialisms, marketing language, redundant qualifiers, and first-person framing.
   * Font choices must remain consistent with the existing design system. Do not introduce new font families or break the established typographic scale.
   * In LaTeX source, the only permitted dash forms are `--` (en-dash, for ranges) and `---` (em-dash, for sentence punctuation in LaTeX typesetting only). Raw Unicode em-dashes are forbidden everywhere.

5. **Automation-first principle**: any element in the site that could change over time MUST be backed by a GitHub Actions workflow or a pipeline script that runs on push. Before adding any new static data field, ask: "can this update itself?" If yes, build the automation first, then add the data.
   * **CV pipeline**: All CV content lives in `data/cv_data.json`. The script `scripts/update_cv_tex.py` generates `data/cv.tex` and `data/cv_de.tex` without bullet points and without a software/projects section. The workflow `.github/workflows/rebuild_cv.yml` runs the full compile (`pdflatex + biber + pdflatex x2`) on every push that touches CV-related files and auto-commits the updated `public/cv.pdf` and `public/cv_de.pdf`. Web `/cv` renders Education, Research Experience (without bullets), and the embedded PDF viewer.
   * **Publication selection**: Both the homepage and PDF CVs order selected/featured publications using citation counts from `data/paper_metrics.json`, falling back to newest-first. `data/paper_metrics.json` is refreshed automatically by the weekly cron workflow.
   * **Tool visibility**: Tools and software are curated in `/tools` and featured on the homepage via composite engagement scoring from `data/project_metrics.json` (stars x10 + forks x5 + Zenodo downloads x2 + views), excluded from the CV PDFs and streamlined web `/cv` view.
   * **Tools sync in cv_data.json**: The `tools` array in `data/cv_data.json` mirrors `projects` in `lib/academic-content.ts`. When a new project is added to `academic-content.ts`, it must also be added to `data/cv_data.json`. A sync check is performed in the rebuild and deploy workflows.

6. **Content governance**: all static text on the website must comply with the rules in `docs/CONTENT.md`. Before editing any user-facing text, read `docs/CONTENT.md` and verify compliance with paragraph length limits, anti-repetition rules, structural page-header format, and voice/person requirements.

7. **Single source of truth for identity**: the canonical name, specialization, email, and ORCID are in `data/cv_data.json` (`personalInfo`). `lib/site-config.ts` and `lib/academic-content.ts` must derive these from `data/cv_data.json`. Never hardcode the full name in component JSX; always reference `identity.name` or `siteConfig.name`.

## Agentic Rules, Hooks, and Verification

- Scoped directory rules live in `data/AGENTS.md` (databases, TeX, formulas) and `scripts/AGENTS.md` (fetchers, generators, shared helpers), loaded hierarchically when editing inside those folders.
- Pre-tool lifecycle hooks in `.agents/hooks.json` (`.agents/hooks/guard.py`) block force-pushes, reject `[skip ci]` on CV/data commits, and run `check_tools_sync.py` plus `verify_site.py --ci` before allowing `git push`.
- Publications support arbitrary preprint servers (`arXiv`, `Preprints.org`, `Optica Open`, `TechRxiv`, `bioRxiv`, `chemRxiv`, `Research Square`, `OSF Preprints`, `SSRN`, `HAL`) uniformly via `resolvePreprintInfo()` in `lib/publications.ts` and `infer_preprint_info()` in `scripts/config_helper.py`.
- Run `python scripts/verify_site.py --ci` alongside `python scripts/check_tools_sync.py` and `npm run check` before pushing changes to `main`. `verify_site.py` validates forbidden characters, commercial software names, PII/expiring URL patterns, banned CSS classes, `relatedThemes` integrity, raw HTML subscripts, `docs/CONTENT.md` word counts, static HTML routes, and `.agents/` hook and skill integrity.
- Reusable task workflows are documented under `.agents/skills/`:
  - `.agents/skills/content-governance/SKILL.md`: writing style, character rules, terminology constraints, and privacy checks.
  - `.agents/skills/sync-and-verify/SKILL.md`: ordered regeneration of BibTeX, EN/DE CV TeX sources, activity JSON, RSS XML, and validation checks.
  - `.agents/skills/browser-and-ui-qa/SKILL.md`: desktop and mobile visual, theme (`light`/`dark`), `EN`/`DE`, filter, and endpoint verification (interactive `browser` subagent or bundled `audit_site.mjs` CDP runner).
  - `.agents/skills/agentic-release/SKILL.md`: pre-push verification gate, linear `git pull --rebase` pushes, GitHub Actions workflow coordination, and live site confirmation.

