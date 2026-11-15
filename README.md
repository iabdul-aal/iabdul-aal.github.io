# Islam I. Abdulaal | Academic Website

This repository powers the static academic website at **https://iabdul-aal.me**.

The site is intentionally small and research-first. It presents a coherent profile in integrated photonics, with pages for about, research themes, publications, selected tools, materials (talks and technical writing), and a bilingual CV viewer.

## Scope

- Integrated photonics research profile (English and German interface)
- Theme-based research overview
- Structured publication metadata with arXiv, DOI, PDF, BibTeX, and RIS export
- Curated technical tools and scientific software records
- Materials index covering talks, workshops, and technical articles
- Static CV preview with downloadable EN/DE LaTeX-compiled PDFs
- Automated ORCID, OpenAlex, Scholar, GitHub, Zenodo, RSS, and activity pipelines

## Stack

- **Framework:** Next.js App Router with static export
- **Language:** TypeScript and React
- **Styling:** Tailwind CSS
- **Content:** Structured TypeScript and JSON data sources
- **Automation:** Python scripts and GitHub Actions
- **Hosting:** GitHub Pages

## Project Structure

| Path | Type | Purpose |
| ---- | ---- | ------- |
| `app/` | Directory | Next.js App Router pages and layouts |
| `components/` | Directory | Reusable React components (UI elements, lists) |
| `data/` | Directory | Central database repository for all JSON models, TeX layouts, and metrics |
| `docs/` | Directory | Architecture documentation, styling, and design guides |
| `lib/` | Directory | Core logic, configuration, and academic database loaders |
| `public/` | Directory | Static assets (favicons, logo, CNAME) |
| `scripts/` | Directory | Python synchronization, data fetching, and generation scripts |
| `.agents/` | Directory | Workspace customizations root for agent rules (`AGENTS.md`) |

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run checks:

```bash
npm run check
```

Build the static export:

```bash
npm run build
```

The exported site is written to `out/`.

## Content Workflow

- Edit canonical identity, education, experience, and CV records in `data/cv_data.json`.
- Edit research themes, projects, and narrative paragraphs in `lib/academic-content.ts`.
- Edit social/profile links in `lib/social-links.ts`.
- Publications are read from `data/publications.json` and normalized by `lib/publications.ts`.
- Talks and articles are read from `data/talks.json` and `data/medium_articles.json`.
- Regenerate derived BibTeX, EN/DE TeX CVs, activity JSON, and RSS XML with `python scripts/update_publications_bib.py`, `python scripts/update_cv_tex.py`, `python scripts/generate_activity.py`, and `python scripts/generate_rss.py`.
- Run `python scripts/check_tools_sync.py` and `python scripts/verify_site.py --ci` before pushing.

## Automation

The scheduled workflow `.github/workflows/update_publications.yml` refreshes:

- `data/publications.json`, `data/paper_metrics.json`, `data/scholar_metrics.json`
- `data/orcid_profile.json`, `data/talks.json`, `data/medium_articles.json`
- `data/project_metrics.json`, `data/activity.json`, `data/publications.bib`
- `data/cv.tex`, `data/cv_de.tex`, `public/cv.pdf`, `public/cv_de.pdf`, `public/feed.xml`

The deployment workflow `.github/workflows/deploy.yml` verifies, builds `./out`, and deploys to GitHub Pages on pushes to `main` and successful `workflow_run` completion.

## Standards

- Keep claims current, specific, and verifiable.
- Keep AI/PINNs/ML framed as computational methods within photonics.
- Avoid services, ventures, broad personal branding, and unsupported future-positioning language.
- Prefer fewer, deeper records over broad activity lists.
- Preserve semantic HTML, accessible navigation, and readable line lengths.

## License

This repository is licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
See `LICENSE` for the full text.
