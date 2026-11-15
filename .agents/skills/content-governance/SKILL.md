---
name: content-governance
description: Enforce academic writing style, forbidden character rules, word budgets, software terminology neutrality, privacy safeguards, and single-source identity rules across all repository content.
---

# Content Governance

Apply these rules before adding or editing any prose, JSON dataset, TypeScript module, LaTeX CV source, or documentation file in this repository.

## 1. Identity and Voice

- Treat `data/cv_data.json` (`personalInfo`) as the single source of truth for canonical name, title, email, and ORCID. Reference `identity` or `siteConfig` rather than hardcoding personal fields in TSX components.
- Write in an impersonal, precise third-person academic register across English and German copy. Avoid first-person pronouns, promotional adjectives, colloquialisms, and redundant qualifiers. Preserve verbatim original abstracts on `/publications` and official descriptions on non-publication entries (subject only to `&` and U+2014 hygiene).
- Use `Selected Publications` on the homepage and `Featured Publications` in generated CV PDFs per `docs/CONTENT.md`. Keep CV views free of bullet lists and omit tools/projects from generated CV PDFs.

## 2. Forbidden Characters and Formatting

- Never use `&` as a written connective in prose, JSON string values, TypeScript copy, documentation, or CV text. Always write `and`.
- Never use the Unicode em-dash character (U+2014) anywhere in repository content, code strings, JSON data, markdown docs, or LaTeX source. Restructure sentences with commas, semicolons, or separate sentences. In LaTeX source only, `--` is permitted for numeric ranges and `---` is permitted for LaTeX typesetting punctuation.
- Store chemical formulas with Unicode subscripts (`NbOCl₂`, `Si₃N₄`) in JSON, TypeScript, activity, and RSS outputs. Never leave raw `<sub>` or `<sup>` HTML tags in data files or feeds. LaTeX math-mode subscripts (`$_2$`, `$_3$`) belong only in generated `.bib` and `.tex` files.

## 3. Terminology, Word Budgets, and Privacy

- Never mention commercial simulation or engineering software names (`MATLAB`, `COMSOL`, `Lumerical`, `ANSYS`) in research descriptions, project summaries, UI copy, or CV text. Use generic physical or numerical methodology terms such as FDTD, drift-diffusion, eigenmode expansion, or full-wave modeling.
- Keep copy within `docs/CONTENT.md` budgets:
  - Page hero statements: 20 to 35 words target (40 words hard maximum).
  - Research theme descriptions: 25 to 45 words target (55 words hard maximum).
  - Page meta descriptions: 120 to 155 characters.
- Maintain valid `relatedThemes` slug references matching `researchThemes` in `lib/academic-content.ts`.
- Keep accent styling consistent with `#b68c61` (`docs/DESIGN.md`) and avoid decorative utility classes such as `hero-glow-bg`, `glass-card`, or `animate-ping`.
- Never commit personal phone numbers, street addresses, matriculation IDs, or expiring cloud storage presigned URLs (`X-Amz-Date`, `X-Amz-Expires`).

## 4. Verification Command

Run the deterministic validator before committing any content or layout edit:

```bash
python scripts/verify_site.py --ci
```
