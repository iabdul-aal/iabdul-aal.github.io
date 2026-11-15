---
name: agentic-release
description: Execute verified linear-commit releases to main and monitor GitHub Actions CV rebuilds and GitHub Pages deployment.
---

# Agentic Release

Follow this procedure when shipping changes to `main` and confirming automated CI/CD deployment.

## 1. Pre-Push Verification Gate

All four checks must pass cleanly on the final working tree before committing:

```bash
python scripts/check_tools_sync.py
python scripts/verify_site.py --ci
npm run check
npm run build
```

Verify with `git status` that generated artifacts (`data/cv.tex`, `data/cv_de.tex`, `data/publications.bib`, `data/activity.json`, `public/feed.xml`, and `public/cv*.pdf` if rebuilt) match the latest canonical inputs (`data/cv_data.json`, `data/publications.json`, `lib/academic-content.ts`).

## 2. Linear Commit and Push Discipline

- Force-pushes to `main` are blocked by repository policy. Always integrate with linear history:

```bash
git pull --rebase origin main
git add <files>
git commit -m "<type>: <concise description>"
git push origin main
```

- Do not add `[skip ci]` to CV or data commits, because `[skip ci]` suppresses downstream `workflow_run` deployment triggers.

## 3. GitHub Actions Pipeline Behavior

- `.github/workflows/pr_check.yml`: validates pull requests to `main` with `check_tools_sync.py`, `verify_site.py --ci`, `npm run check`, and `npm run build`.
- `.github/workflows/rebuild_cv.yml`: triggers on CV or publication pushes to `main`, runs `update_publications_bib.py`, `update_cv_tex.py`, `generate_activity.py`, `generate_rss.py`, `check_tools_sync.py`, and `verify_site.py --ci`, compiles both EN and DE PDFs with `biber`, and pushes updates without `[skip ci]`.
- `.github/workflows/update_publications.yml`: runs weekly on Sundays (and manually via `workflow_dispatch`) to refresh upstream metadata and metrics, regenerate BibTeX, EN/DE CVs, `data/activity.json`, and `public/feed.xml`, validate with `verify_site.py --ci`, compile both PDFs, and push updates with linear rebase.
- `.github/workflows/deploy.yml`: runs `check_tools_sync.py`, `npm run check`, `npm run build`, and `verify_site.py --ci` (verifying `out/` HTML), then deploys `./out` to GitHub Pages on `main` pushes, manual dispatch, and successful `workflow_run` completion of either `Update Academic and Talks Data` or `Rebuild CV PDF on Push`.

## 4. Post-Push Deployment Check

Verify CI and GitHub Pages completion after pushing:

```bash
gh run list --limit 5
```

Confirm both any triggered CV/data workflow and `Deploy academic website` conclude with `success` and serve the updated content at `https://iabdul-aal.me`.
