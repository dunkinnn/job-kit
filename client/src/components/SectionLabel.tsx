import type { ReactNode } from 'react'

export default function SectionLabel({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`text-xs font-medium md:text-[13px] ${light ? 'text-sky-300' : 'text-muted'}`}>{children}</span>
}
