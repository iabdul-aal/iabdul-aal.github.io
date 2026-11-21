# iabdul-aal-website

Academic website of Islam I. Abdulaal, presenting research in integrated photonics, publications, and selected tools.

## Project Structure

| Path | Type | Purpose |
| ---- | ---- | ------- |
| `app/` | Directory | Next.js App Router pages and layouts |
| `components/` | Directory | Reusable React components (UI elements, lists) |
| `lib/` | Directory | Core logic, configuration, and academic database loaders |
| `data/` | Directory | JSON databases (`cv_data.json`, `publications.json`, `talks.json`, metrics) and TeX sources |
| `public/` | Directory | Static assets (favicons, logos, PDFs, RSS feed, CNAME) |
| `scripts/` | Directory | Python synchronization, CV generation, and governance verification scripts |
| `.agents/` | Directory | Workspace agent rules, lifecycle hooks (`hooks.json`), and domain skills (`skills/`) |

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
python scripts/update_cv_tex.py     # Regenerate data/cv.tex and data/cv_de.tex
python scripts/check_tools_sync.py  # Verify cv_data.json tools match academic-content.ts
python scripts/verify_site.py --ci  # Run content and build governance checks
```

## Universal Rules

1. Run `npm run check`, `python scripts/check_tools_sync.py`, and `python scripts/verify_site.py --ci` before pushing; follow `.agents/AGENTS.md` (along with scoped `data/AGENTS.md` and `scripts/AGENTS.md`) and `.agents/skills/`.
2. Keep codebase minimal and research-focused:
   * Accent color is gold/bronze (`#b68c61`).
   * Never mention commercial software names (e.g. MATLAB, COMSOL, Lumerical) in research descriptions; use generic physical/computational terms (e.g., FDTD, drift-diffusion).
   * All publications are managed dynamically in `data/publications.json` with overrides and adaptable preprint server normalization in `lib/publications.ts`.
   * Avoid `&` as a written connective, `U+2014` em-dashes, and inline dot dividers (`U+00B7` or bullet dots).
3. Force-pushes to the default branch are blocked (including via `.agents/hooks.json`). Update using linear commits after syncing with remote.
