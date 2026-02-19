# Islam I. Abdulaal | Research Website

This repository powers my personal website: **https://iabdul-aal.github.io**.

I use it to present my research profile, publications, talks, materials, services, and venture activity in a clean, professional format.

## Core Scope

- Integrated photonics and nonlinear optics research profile
- Auto-synced publications and ORCID profile data
- Auto-synced talks list from public video sources
- Materials library backed by real files in the repository
- Direct pathways for mentorship, services, and collaboration

## Stack

- **Framework:** Next.js (App Router, static export)
- **Language:** TypeScript + React
- **Styling:** Tailwind CSS
- **Automation:** Python scripts + GitHub Actions
- **Hosting:** GitHub Pages

## Key Automation

### ORCID sync

- Script: `scripts/fetch_publications.py`
- Script: `scripts/fetch_orcid_profile.py`
- Outputs:
  - `publications.json`
  - `orcid_profile.json`

### Talks sync

- Script: `scripts/fetch_talks.py`
- Source config: `talk_sources.json`
- Output: `talks.json`

### Scheduled workflow

- Workflow: `.github/workflows/update_publications.yml`
- Runs daily and updates:
  - `publications.json`
  - `orcid_profile.json`
  - `talks.json`
- Commits and pushes only when data changed.

## Materials Library (File-Driven)

The materials pages are generated from real files inside `public/materials/`.

Upload folders:

- `public/materials/slides/`
- `public/materials/summaries/`
- `public/materials/roadmaps/`
- `public/materials/templates/`

Once files are added and pushed, the Materials pages auto-list them on the next build.

## Logo Slots

Logo placeholders are prepared in:

- `public/logos/affiliations/`
- `public/logos/platforms/`

Expected filenames are documented in:

- `public/logos/README.md`

Slot definitions used by the About page are in:

- `lib/logo-slots.ts`

## Project Structure

```text
app/
  about/page.tsx
  articles/page.tsx
  contact/page.tsx
  materials/page.tsx
  materials/slides/page.tsx
  materials/summaries/page.tsx
  materials/roadmaps/page.tsx
  materials/templates/page.tsx
  talks/page.tsx
  ventures/page.tsx
  services/page.tsx
  mentorship/page.tsx
components/
  footer.tsx
  journey-section.tsx
  materials-collection-view.tsx
  publications.tsx
lib/
  materials-library.ts
  logo-slots.ts
  medium-feed.ts
  social-links.ts
  site-config.ts
  talks.ts
scripts/
  fetch_publications.py
  fetch_orcid_profile.py
  fetch_talks.py
.github/workflows/
  deploy.yml
  update_publications.yml
```

## Local Development

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
```

## Python Dependencies

Install script dependencies:

```bash
pip install -r requirements.txt
```

Current dependency list is intentionally minimal:

- `requests`

## Content Workflow

1. Update links and identity data in `lib/social-links.ts`.
2. Update page copy inside `app/*/page.tsx` in first-person professional voice.
3. Add new materials to `public/materials/*`.
4. Add logos to `public/logos/*` when available.
5. Run checks and push.

## Standards

- Keep claims verifiable and source-based.
- Keep narrative concise, formal, and human.
- Avoid duplicated messaging across sections.
- Preserve accessibility, readability, and clear next-step navigation.
