# Islam I. Abdulaal | Personal Research Website

Professional website and research portfolio for **Islam I. Abdulaal**, focused on:
- Integrated photonics
- Quantum and nonlinear optics
- Physics-informed photonic design
- Mentorship and technical outreach

Live website: **https://iabdul-aal.github.io**

## Core Goals

- Present a credible, professional research profile
- Provide clear access to verified academic and professional profiles
- Publish highlights, writing, services, and mentorship pathways
- Maintain SEO-friendly structure for discoverability

## Tech Stack

- **Framework:** Next.js (App Router, static export)
- **Language:** TypeScript + React
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages via GitHub Actions

## Project Structure

```text
app/
  page.tsx                 # Homepage
  about/page.tsx           # Bio, profiles, publications, awards
  news/page.tsx            # Highlights
  articles/page.tsx        # Writing and article links
  services/page.tsx        # Research/technical service tracks
  mentorship/page.tsx      # Mentorship page
  contact/page.tsx         # Contact and quick actions
  sitemap.ts               # Dynamic sitemap.xml
  robots.ts                # Dynamic robots.txt
  layout.tsx               # Global metadata + structured data
components/
  navigation.tsx
  footer.tsx
  publications.tsx
lib/
  site-config.ts           # Global site and SEO config
  social-links.ts          # Professional profile and contact links
.github/workflows/
  deploy.yml               # GitHub Pages deployment workflow
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

3. Open:
```text
http://localhost:3000
```

## Scripts

- `npm run dev` - run local dev server
- `npm run build` - production build + static export
- `npm run start` - start production server (non-static hosting use)
- `npm run lint` - lint source files
- `npm run typecheck` - TypeScript type checking only
- `npm run check` - lint + typecheck

## SEO Implementation

SEO is implemented through:
- Central metadata in `app/layout.tsx`
- Open Graph + Twitter metadata
- JSON-LD structured data (`Person` + `WebSite`)
- `app/sitemap.ts` for search indexing
- `app/robots.ts` for crawler directives
- Canonical URL strategy via `site-config.ts`

## Professional Profile Sources

Profile links are centralized in:
- `lib/social-links.ts`

This includes research identity links (ORCID, Scholar, Semantic Scholar, ResearchGate, etc.), professional channels, and contact endpoints.

## Deployment (GitHub Pages)

Deployment is automated via:
- `.github/workflows/deploy.yml`

Flow:
1. Push to `main`
2. Workflow installs dependencies and builds static export
3. `out/` artifact is deployed to GitHub Pages

## Content Maintenance Workflow

When updating the website:
1. Update links/data in `lib/social-links.ts` first
2. Update page-level messaging (`app/*/page.tsx`)
3. Keep claims aligned with publicly verifiable sources
4. Run checks locally (`npm run check`) before push

## Repository Standards

- Keep content professional and evidence-driven
- Avoid placeholder text and unverifiable claims
- Prefer centralized config over scattered hardcoded values
- Preserve SEO metadata consistency when adding pages
