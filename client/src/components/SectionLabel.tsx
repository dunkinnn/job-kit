import type { ReactNode } from 'react'

export default function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="font-mono text-xs tracking-[0.06em] text-muted uppercase md:text-[13px]">{children}</span>
}
