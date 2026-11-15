import * as React from "react"

const UNICODE_SUB_MAP: Record<string, string> = {
  "₀": "0",
  "₁": "1",
  "₂": "2",
  "₃": "3",
  "₄": "4",
  "₅": "5",
  "₆": "6",
  "₇": "7",
  "₈": "8",
  "₉": "9",
}

const TOKEN_PATTERN =
  /(<sub>.*?<\/sub>|<sup>.*?<\/sup>|\\textsubscript\{[^}]*\}|\\textsuperscript\{[^}]*\}|[₀₁₂₃₄₅₆₇₈₉]+)/gi

function normalizeUnicodeSubs(value: string): string {
  return value.replace(/[₀₁₂₃₄₅₆₇₈₉]/g, (ch) => UNICODE_SUB_MAP[ch] ?? ch)
}

export function ScientificText({ text }: { text: string }) {
  if (!text) return null

  const parts = text.split(TOKEN_PATTERN)

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null

        const subHtmlMatch = part.match(/^<sub>(.*?)<\/sub>$/i)
        if (subHtmlMatch) {
          return (
            <sub key={index} className="text-[0.75em] leading-none align-baseline relative -bottom-[0.2em]">
              {subHtmlMatch[1]}
            </sub>
          )
        }

        const supHtmlMatch = part.match(/^<sup>(.*?)<\/sup>$/i)
        if (supHtmlMatch) {
          return (
            <sup key={index} className="text-[0.75em] leading-none align-baseline relative -top-[0.35em]">
              {supHtmlMatch[1]}
            </sup>
          )
        }

        const texSubMatch = part.match(/^\\textsubscript\{([^}]*)\}$/)
        if (texSubMatch) {
          return (
            <sub key={index} className="text-[0.75em] leading-none align-baseline relative -bottom-[0.2em]">
              {texSubMatch[1]}
            </sub>
          )
        }

        const texSupMatch = part.match(/^\\textsuperscript\{([^}]*)\}$/)
        if (texSupMatch) {
          return (
            <sup key={index} className="text-[0.75em] leading-none align-baseline relative -top-[0.35em]">
              {texSupMatch[1]}
            </sup>
          )
        }

        if (/^[₀₁₂₃₄₅₆₇₈₉]+$/.test(part)) {
          return (
            <sub key={index} className="text-[0.75em] leading-none align-baseline relative -bottom-[0.2em]">
              {normalizeUnicodeSubs(part)}
            </sub>
          )
        }

        return <React.Fragment key={index}>{part}</React.Fragment>
      })}
    </>
  )
}
