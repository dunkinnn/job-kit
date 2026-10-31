// Maps a 0-100 score to its score color token.
export function scoreColor(score: number): string {
  if (score >= 80) return 'var(--color-strong)'
  if (score >= 50) return 'var(--color-warn)'
  return 'var(--color-missing)'
}

// Text label and tag colors for an overall match score.
export function scoreStatus(score: number): { label: string; className: string } {
  if (score >= 80) return { label: 'Strong match', className: 'bg-strong-tint text-strong-dark' }
  if (score >= 50) return { label: 'Needs work', className: 'bg-warn-tint text-warn-dark' }
  return { label: 'Low match', className: 'bg-missing-tint text-missing-dark' }
}
