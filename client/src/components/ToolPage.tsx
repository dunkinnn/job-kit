import type { ReactNode } from 'react'

// Gray "desk" background and page width shared by the tool pages.
export default function ToolPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh-61px)] bg-desk">
      <div className="mx-auto max-w-[1200px] px-5 pt-7 pb-12 md:px-6 md:pt-14 md:pb-20">{children}</div>
    </div>
  )
}
