import { useState } from 'react'

// Copies text and remembers which item was copied, so its button can say "Copied".
export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
      setFailed(false)
      setCopied(key)
      setTimeout(() => setCopied((current) => (current === key ? null : current)), 2000)
    } catch {
      setFailed(true)
    }
  }

  return { copied, failed, copy }
}
