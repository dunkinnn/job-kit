import type { ReactNode } from 'react'

// Highlights words that match the job in a soft sky tint.
export default function Mark({ children }: { children: ReactNode }) {
  return <span className="rounded bg-sky-200 px-1">{children}</span>
}
