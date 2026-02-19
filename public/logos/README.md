# Logo Slots

Place logo files in these paths to activate branded visuals:

- `/public/logos/affiliations/IEEE.png`
- `/public/logos/affiliations/SSCS.png`
- `/public/logos/affiliations/Photonics.webp`
- `/public/logos/affiliations/Alexandria Univeristy.webp`
- `/public/logos/affiliations/A Star.png`
- `/public/logos/affiliations/Egypt Scholars.png`
- `/public/logos/platforms/orcid.svg`
- `/public/logos/platforms/google-scholar.svg`
- `/public/logos/platforms/web-of-science.svg`

Notes:
- Filenames are matched exactly against `lib/logo-slots.ts`.
- If a file is missing, the UI falls back to a compact text mark.
- You can switch any slot to external image hosting later in `lib/logo-slots.ts`.
