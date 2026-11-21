---
name: browser-and-ui-qa
description: >-
  Run end-to-end visual, layout, theme, i18n, and interactive verification on built static output or the live deployment using browser inspection and the bundled CDP audit runner.
---

# Browser and UI Verification

Use this skill after any change to UI components, styling (`app/globals.css`), schematic imagery, bilingual copy, filters, or client state, and before concluding deployment verification.

## 1. Two-Tier Verification Strategy

1. **Interactive browser walkthrough (when `browser` subagent is available)**:
   - Launch `browser` (default `Model: "flash"`, unless the user requests otherwise) to inspect visual polish, font rendering, figure blending, mobile menu ergonomics, and PDF embed behavior on desktop (`1440x900`) and mobile (`390x844`).
   - If the subagent returns quota exhaustion or unavailability, do not switch models without asking the user; use the deterministic headless CDP audit script below instead.

2. **Deterministic CDP audit ([audit_site.mjs](./scripts/audit_site.mjs))**:
   - Serves `./out` automatically (or targets a live URL with `--url=https://iabdul-aal.me`).
   - Checks every route (`/`, `/about`, `/research`, `/publications`, `/tools`, `/materials`, `/cv`, and 404 handling) on desktop and mobile (`390x844`).
   - Verifies zero uncaught exceptions, zero failed asset requests, `naturalWidth > 0` for all images, zero horizontal overflow, working `light`/`dark` theme switching, `EN`/`DE` localization toggling, filter counters, abstract expansion, mobile drawer toggle, and auxiliary endpoints (`/cv.pdf`, `/cv_de.pdf`, `/manifest.webmanifest`, `/feed.xml`, `/robots.txt`, `/sitemap.xml`).

## 2. Commands

Audit the local `./out` build and save temporary screenshots inside your scratch directory:

```bash
node .agents/skills/browser-and-ui-qa/scripts/audit_site.mjs --shots-dir="<artifact-scratch-dir>"
```

Audit the live production site after deployment:

```bash
node .agents/skills/browser-and-ui-qa/scripts/audit_site.mjs --url=https://iabdul-aal.me --shots-dir="<artifact-scratch-dir>"
```

Inspect captured desktop (`light` and `dark`), `/research`, `/publications`, and `mobile` screenshots visually before finalizing the release report. Never commit temporary screenshots into the repository.
