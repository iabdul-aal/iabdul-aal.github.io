# Design

## Theme

A refined, typography-first academic site designed for supervisors and collaborators reading in office, lab, or conference settings. The visual system pairs a warm ivory light surface with an optional curated obsidian dark mode (`ThemeProvider` and `ThemeToggle`), keeping both modes calm, low-glare, and text-led.

## Color

Use a restrained warm neutral palette paired with a single bronze/gold accent (`#b68c61` primary token, `#825c36` light accessible ink, `#c9a57a` dark ink) used sparingly for links, focus states, active navigation underlines, and small metadata.

CSS color tokens in `app/globals.css` maintain warm paper light surfaces (`oklch(0.99 0.003 70)`) and obsidian dark surfaces (`oklch(0.13 0.007 65)`) with soft borders and consistent bronze accenting. Avoid pure `#ffffff` / `#000000` glare, broad gradients, neon color, and multi-accent palettes.

## Typography

Use `Inter` (loaded via `next/font/google`) with clean system fallbacks for fast rendering and tabular-num alignment. Maintain 65 to 75 character line lengths for body copy. Use commas (`,`) or hyphens (`-`) for metadata dividers rather than middle-dot glyphs (`U+00B7`), and keep expanded abstracts and active mobile navigation links clean without left vertical accent bars.

Do not use negative letter spacing. Avoid large display typography except for the homepage name.

## Layout

Use generous whitespace, narrow reading measures, and calm page rhythms. Prefer ruled sections, definition-list style metadata, borderless transparent 3D schematic PNGs with soft ambient shadow, and full-width alternating content bands over decorative cards. Subtle borders are used sparingly on filter shells, interactive controls, and secondary action chips.

Main navigation contains only: About, Research, Publications, Tools, Materials, CV.

## Components

Core components:

- Academic navigation with text identity and compact mobile menu.
- Page headers with concise title, description, and optional actions.
- Publication rows with DOI, arXiv, PDF, and BibTeX copy support.
- Research theme sections organized by problem, methods, and physical relevance.
- Project records with objective, methods, tools, status, and links.
- CV page with download actions, Education, Research Experience (prose entries without bullets), and embedded PDF preview.

## Motion

Motion should be minimal and functional. Avoid entrance choreography, parallax, hover lift, glow effects, and scroll-driven decoration. Respect `prefers-reduced-motion`.

## Content Rules

Every page should strengthen the coherent scientific identity. Remove sections that foreground entrepreneurship, services, broad public speaking, generic articles, or personal brand building. Use present validated work and clearly marked statuses.
