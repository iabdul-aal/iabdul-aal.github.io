# Content Governance

Rules for all user-facing text on the website. Read this file before editing any static copy, page description, or data-file string.

## Voice and Person

Use **third person** throughout all static site text. Write "Research activities center on..." rather than "My research focuses on..." or "I focus on...".

Exceptions:
- Direct quotations (e.g., the About page epigraph) may use first-person-impersonal naturally.
- UI action labels use imperative voice: "Download PDF", "Clear filters", "Return home".

Do not use imperative voice in descriptive or explanatory text.

## Paragraph Length

| Context | Target word count | Hard limit |
|---|---|---|
| Page hero description | 20–35 words, 1 sentence | 40 words |
| About page narrative paragraphs | 30–50 words each | 60 words |
| Research theme field (Problem, Methods, Physical relevance) | 25–45 words | 55 words |
| Section subtitle or secondary text | 12–25 words, 1 sentence | 30 words |
| Project objective | 20–35 words, 1 sentence | 40 words |
| Meta description (SEO) | 120–155 characters | 160 characters |
| Activity detail | 8–18 words, 1 sentence | 22 words |

## Anti-Repetition

1. No paragraph may use the same **content word** (noun, verb, or adjective) more than twice, unless it is a proper noun or an established technical compound (e.g., "physics-informed", "bound-state-in-the-continuum").
2. Across all page hero descriptions (one per page), any given content word may appear in at most 3 of the total set.
3. Rotate synonyms proactively:
   - "design" / "engineering" / "development"
   - "simulation" / "modeling" / "computation"
   - "optical" / "photonic"
   - "optimization" / "tuning" / "refinement"
   - "framework" / "pipeline" / "workflow"

## Page Header Structure

Every content page must follow this anatomy:

```
<p>  eyebrow   — section label in small muted text (e.g., "Research")
<h1> heading   — noun-phrase title (e.g., "Research themes in integrated photonics")
<p>  descriptor — 1-sentence explanation, 20–35 words
```

Rules:
- All headings are **noun phrases** (no leading verbs).
- All descriptors are **declarative sentences** (subject–verb–object or passive).
- The eyebrow label must match the navigation label for that page.

## Label Vocabulary

Use these canonical labels consistently across all pages and components:

| Concept | Canonical label | Avoid |
|---|---|---|
| Navigation items | About, Research, Publications, Tools, Materials, CV | Projects, Software, Talks, Papers |
| Top-ranked items on CV page | "Featured Publications", "Featured Software" | "Selected", "Top", "Best" |
| Algorithm-sorted items on homepage | "Selected Publications" | "Featured" (reserved for CV) |
| Link to full list | "All [plural noun]" (e.g., "All publications") | "View all", "See more", "Full list" |
| Algorithm-sorted tool on homepage | "Featured Tool" | "Top Tool", "Best Tool" |

## Empty-State Text

Empty states use a single sentence following this pattern:

> "[Items] will appear as [condition]."

Example: "Resources will be listed as they are uploaded."

## Forbidden Patterns

These rules are inherited from `AGENTS.md` and apply to all text:

- The `&` character is forbidden as a written connective. Always write "and".
- The em-dash character (U+2014) is forbidden. Use a comma, semicolon, or separate sentence.
- No commercial software names (e.g., MATLAB, COMSOL, Lumerical). Use generic physical or computational terms.
- No colloquialisms, marketing language, redundant qualifiers, or first-person framing.
- No phrases from the anti-reference list in `PRODUCT.md` (e.g., "visionary", "innovator", "building the future").
