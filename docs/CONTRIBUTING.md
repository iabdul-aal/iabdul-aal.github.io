# Contributing Guide

Thanks for contributing to this repository.

## Scope

This project is a personal professional website. Contributions should prioritize:
- Accuracy of claims and links
- Professional tone
- Clear UX and accessibility
- SEO and discoverability consistency

## Local Setup

```bash
npm install
npm run dev
```

## Quality Checks

Before submitting changes:

```bash
npm run check
python scripts/check_tools_sync.py
python scripts/verify_site.py --ci
```

If checks cannot run in your environment, include that note in your PR/commit message.

## Content Rules

- Do not add unverifiable claims
- Prefer linking to source pages for achievements and publications
- Keep canonical personal identity and email in `data/cv_data.json` (`personalInfo`)
- Keep external profile handles centralized in `lib/social-links.ts`
- Keep global SEO values centralized in `lib/site-config.ts`

## Commit Style

Use clear, action-oriented messages, for example:
- `Update profile links and contact channels`
- `Refine about page narrative and award highlights`
- `Improve sitemap and metadata consistency`

## Pull Request Notes

When opening a PR, include:
- What changed
- Why it changed
- Any affected routes/files
- Whether checks were run
