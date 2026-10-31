import type { ReactNode } from 'react'

type Props = {
  variant?: 'marker' | 'fill'
  children: ReactNode
}

// Highlights words that matter: a marker stroke for headlines, a solid fill for inline matches.
export default function Mark({ variant = 'fill', children }: Props) {
  return <span className={variant === 'marker' ? 'marker' : 'bg-hl px-[3px]'}>{children}</span>
}
