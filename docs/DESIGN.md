# Design

## Theme

A light, typography-first academic site designed for supervisors and collaborators reading in office, lab, or conference settings. The visual scene is a quiet research profile opened on a laptop beside papers and simulation notes, so the design stays light, restrained, and text-led.

## Color

Use a restrained palette: tinted near-white background, dark neutral text, soft borders, and one low-chroma blue-green accent used sparingly for links, focus states, and small metadata.

CSS colors should be expressed with OKLCH in `app/globals.css`. Avoid pure white, pure black, broad gradients, dark-blue dominance, neon color, and multi-accent palettes.

## Typography

Use a clean sans-serif system stack for speed and durability. Maintain 65 to 75 character line lengths for body copy. Use hierarchy through size, weight, spacing, and section structure rather than decorative type treatments.

Do not use negative letter spacing. Avoid large display typography except for the homepage name.

## Layout

Use generous whitespace, narrow reading measures, and calm page rhythms. Prefer ruled sections, definition-list style metadata, and full-width content bands over decorative cards. Cards are acceptable for repeated publications, projects, and software records, with border radii of 8px or less.

Main navigation contains only: About, Research, Publications, Tools, Materials, CV.

## Components

Core components:

- Academic navigation with text identity and compact mobile menu.
- Page headers with concise title, description, and optional actions.
- Publication rows with DOI, arXiv, PDF, and BibTeX copy support.
- Research theme sections organized by problem, methods, and physical relevance.
- Project records with objective, methods, tools, status, and links.
- CV preview/download area with concise summary.

## Motion

Motion should be minimal and functional. Avoid entrance choreography, parallax, hover lift, glow effects, and scroll-driven decoration. Respect `prefers-reduced-motion`.

## Content Rules

Every page should strengthen the coherent scientific identity. Remove sections that foreground entrepreneurship, services, broad public speaking, generic articles, or personal brand building. Use present validated work and clearly marked statuses.
