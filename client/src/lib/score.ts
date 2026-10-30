// Maps a 0-100 score to its score color token.
export function scoreColor(score: number): string {
  if (score >= 80) return 'var(--color-strong)'
  if (score >= 50) return 'var(--color-warn)'
  return 'var(--color-missing)'
}
