# iabdul-aal-website

Academic website of Islam I. Abdulaal, presenting research in computational/integrated photonics, publications, and selected projects.

## Project Structure

| Path | Type | Purpose |
| ---- | ---- | ------- |
| `app/` | Directory | Next.js App Router pages and layouts |
| `components/` | Directory | Reusable React components (UI elements, lists) |
| `lib/` | Directory | Core logic, configuration, and academic database loaders |
| `public/` | Directory | Static assets (favicons, logos, materials, CNAME) |
| `publications.json` | File | Database of publication records |
| `talks.json` | File | Database of presentation and talk records |

## Quick Reference

### Languages and Tooling

- Languages: TypeScript, JavaScript
- Package Manager: npm

### Commands

```bash
npm run dev       # Start local development server
npm run build     # Compile static HTML production export
npm run lint      # Check codebase linting via ESLint
npm run typecheck # Check TypeScript types compilation
npm run check     # Run full verification (lint + typecheck)
```

## Universal Rules

1. Run `npm run check` to verify clean build status before pushing.
2. Keep codebase minimal and research-focused:
   * Accent color is gold/bronze (`#b68c61`).
   * Never mention commercial software names (e.g. MATLAB, COMSOL, Lumerical) in research descriptions; use generic physical/computational terms (e.g., FDTD, drift-diffusion).
   * All publications are managed dynamically in `publications.json` with overrides in `lib/publications.ts`.
3. Force-pushes to the default branch are blocked. Update using linear commits after syncing with remote.
