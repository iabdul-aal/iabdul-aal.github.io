const COPY_REPLACEMENTS = [
  ["â€”", "-"],
  ["â€“", "-"],
  ["â€˜", "'"],
  ["â€™", "'"],
  ['â€œ', '"'],
  ['â€\u009d', '"'],
  ["â€¦", "..."],
  ["Â", ""],
  ["\u00a0", " "],
] as const

export function normalizeCopy(value: string): string {
  return COPY_REPLACEMENTS.reduce((result, [search, replacement]) => result.replaceAll(search, replacement), value)
    .replace(/[ \t]+/g, " ")
    .trim()
}

export function toParagraphs(value: string): string[] {
  return value
    .split(/\n+/)
    .map((paragraph) => normalizeCopy(paragraph))
    .filter(Boolean)
}
