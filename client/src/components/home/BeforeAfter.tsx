import type { ReactNode } from 'react'
import SectionLabel from '../SectionLabel.tsx'

const Blank = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md bg-sky-100 px-1.5 text-accent md:px-2">[{children}]</span>
)

const ROWS = [
  { area: 'Capstone', before: 'Made a website for our capstone', after: <>Built a React web app used by 150+ students for enrollment tracking.</> },
  {
    area: 'OJT',
    before: 'Assisted in the IT office during OJT',
    after: (
      <>
        Set up and fixed <Blank>number</Blank> office computers during a <Blank>length</Blank> OJT.
      </>
    ),
  },
  {
    area: 'Org work',
    before: 'Member of the school IT society',
    after: (
      <>
        Organized <Blank>event</Blank> for <Blank>number</Blank> students as the IT society's <Blank>role</Blank>.
      </>
    ),
  },
]

export default function BeforeAfter() {
  return (
    <section id="before-after" className="mx-auto flex max-w-[1240px] flex-col gap-[18px] px-5 pt-[72px] md:gap-9 md:px-7 md:pt-[140px]">
      <div className="flex flex-col gap-3 md:gap-3.5">
        <SectionLabel>Before and after</SectionLabel>
        <h2 className="headline text-[28px] leading-[1.06] md:text-[44px] md:leading-[1.05] md:tracking-[-0.01em]">
          Your experience, <span className="text-quiet">said better</span>
        </h2>
      </div>
      <div className="border-t border-line">
        {ROWS.map((row) => (
          <div
            key={row.area}
            className="flex flex-col gap-1.5 border-b border-line py-[18px] md:grid md:grid-cols-[120px_1fr_1.4fr] md:items-baseline md:gap-8 md:py-7"
          >
            <span className="text-[11px] font-bold tracking-[0.06em] text-muted uppercase md:text-[13px]">{row.area}</span>
            <span className="text-sm text-muted line-through md:text-base">{row.before}</span>
            <span className="text-base leading-normal font-medium md:text-lg md:leading-relaxed">{row.after}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
