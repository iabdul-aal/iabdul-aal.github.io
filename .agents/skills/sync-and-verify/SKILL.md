---
name: sync-and-verify
description: Synchronize academic datasets, BibTeX, EN/DE LaTeX CVs, activity JSON, and RSS XML feeds, then run deterministic pre-commit checks.
---

# Sync and Verify

Use this workflow whenever publications, projects/tools, talks, metrics, or CV data change, or when validating the automated Python pipeline.

## 1. Source-of-Truth Synchronization Rules

- `lib/academic-content.ts` (`projects`) and `data/cv_data.json` (`tools`) must declare the exact same project IDs. Tools may omit `github` when hosted on Zenodo or HuggingFace (`zenodo`, `huggingface`, `huggingfaceDataset`, `paperDoi`).
- `data/publications.json` holds normalized publication records with curated overrides preserved in `lib/publications.ts`.
- Never edit `data/cv.tex`, `data/cv_de.tex`, `data/publications.bib`, `data/activity.json`, or `public/feed.xml` by hand as final sources; regenerate them from scripts.

## 2. Optional External Metadata Refresh

Run when refreshing upstream academic records or metrics:

```bash
python scripts/fetch_publications.py
python scripts/sync_arxiv_publications.py
python scripts/fetch_orcid_profile.py
python scripts/fetch_talks.py
python scripts/fetch_scholar_metrics.py
python scripts/fetch_medium_articles.py
python scripts/fetch_paper_metrics.py
python scripts/fetch_project_metrics.py
```

## 3. Local Derived File Regeneration

Run in this order so `update_cv_tex.py` uses updated `paper_metrics.json`, `scholar_metrics.json`, and `project_metrics.json`:

```bash
python scripts/update_publications_bib.py
python scripts/update_cv_tex.py
python scripts/generate_activity.py
python scripts/generate_rss.py
```

If `pdflatex` and `biber` are installed locally, compile both EN and DE CVs in `data/`:

```bash
pdflatex -interaction=nonstopmode cv.tex
biber cv
pdflatex -interaction=nonstopmode cv.tex
pdflatex -interaction=nonstopmode cv.tex
pdflatex -interaction=nonstopmode cv_de.tex
biber cv_de
pdflatex -interaction=nonstopmode cv_de.tex
pdflatex -interaction=nonstopmode cv_de.tex
```

Copy compiled PDFs from `data/cv.pdf` and `data/cv_de.pdf` to `public/cv.pdf` and `public/cv_de.pdf`.

## 4. Mandatory Verification Suite

Run all checks after edits, regeneration, and static build:

```bash
python scripts/check_tools_sync.py
npm run check
npm run build
python scripts/verify_site.py --ci
```

When `./out` exists, `verify_site.py --ci` also validates `out/index.html` and `out/publications.html` for zero `BAILOUT_TO_CLIENT_SIDE_RENDERING`, in addition to enforcing zero bullet macros and zero software sections in `data/cv.tex` and `data/cv_de.tex`.
