import { useCallback, useEffect, useRef, useState } from "react"
import { copyTextWithFallback } from "@/lib/utils"

/**
 * Reusable clipboard copy hook with automatic timeout cleanup on unmount.
 */
export function useCopyFeedback(durationMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const copy = useCallback(
    async (text: string) => {
      const ok = await copyTextWithFallback(text)
      if (!ok) return false
      setCopied(true)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => setCopied(false), durationMs)
      return true
    },
    [durationMs]
  )

  return { copied, copy }
}
