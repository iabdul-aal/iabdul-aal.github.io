# Islam I. Abdulaal | Academic Website

This repository powers the static academic website at **https://iabdul-aal.github.io**.

The site is intentionally small and research-first. It presents a coherent profile in computational and integrated photonics, with pages for research themes, publications, selected projects, software, talks, and CV.

## Scope

- Computational and integrated photonics research profile
- Theme-based research overview
- Structured publication metadata with arXiv, DOI, PDF, and BibTeX support
- Curated technical projects and scientific software records
- Chronological talks page
- Static CV preview and downloadable PDF
- ORCID/publication/talk data sync scripts

## Stack

- **Framework:** Next.js App Router with static export
- **Language:** TypeScript and React
- **Styling:** Tailwind CSS
- **Content:** Structured TypeScript and JSON data sources
- **Automation:** Python scripts and GitHub Actions
- **Hosting:** GitHub Pages

## Project Structure

```text
app/
  about/page.tsx
  cv/page.tsx
  projects/page.tsx
  publications/page.tsx
  research/page.tsx
  software/page.tsx
  talks/page.tsx
components/
  footer.tsx
  navigation.tsx
  publications-list.tsx
  ui/button.tsx
lib/
  academic-content.ts
  publications.ts
  seo.ts
  site-config.ts
  social-links.ts
  talks.ts
scripts/
  fetch_orcid_profile.py
  fetch_publications.py
  fetch_talks.py
```

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

- Edit identity, research themes, projects, software records, recent activity, and CV summary in `lib/academic-content.ts`.
- Edit social/profile links in `lib/social-links.ts`.
- Publications are read from `publications.json` and normalized by `lib/publications.ts`.
- Talks are read from `talks.json` through `lib/talks.ts`.
- Replace `public/cv.pdf` when the CV changes.

## Automation

The scheduled workflow `.github/workflows/update_publications.yml` refreshes:

- `publications.json`
- `orcid_profile.json`
- `talks.json`

The deployment workflow `.github/workflows/deploy.yml` builds the static site and deploys it to GitHub Pages on pushes to `main`.

## Standards

- Keep claims current, specific, and verifiable.
- Keep AI/PINNs/ML framed as computational methods within photonics.
- Avoid services, ventures, broad personal branding, and unsupported future-positioning language.
- Prefer fewer, deeper records over broad activity lists.
- Preserve semantic HTML, accessible navigation, and readable line lengths.

## License

This repository is licensed under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.
See `LICENSE` for the full text.
