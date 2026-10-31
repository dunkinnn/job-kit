import type { ReactNode } from 'react'
import Mark from '../Mark.tsx'
import SectionLabel from '../SectionLabel.tsx'

const Blank = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[14px] text-cobalt md:text-[15px]">[{children}]</span>
)

const ROWS = [
  {
    before: 'Made a website for our capstone',
    after: (
      <>
        Built a React web app used by <Mark>150+ students</Mark> for enrollment tracking.
      </>
    ),
  },
  {
    before: 'Assisted in the IT office during OJT',
    after: (
      <>
        Set up and fixed <Blank>number</Blank> office computers during a <Blank>length</Blank> OJT.
      </>
    ),
  },
  {
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
    <section className="mx-auto flex max-w-[1200px] flex-col gap-3.5 px-5 pt-[72px] md:gap-8 md:px-6 md:pt-28">
      <div className="flex max-w-[720px] flex-col gap-3.5">
        <SectionLabel>Before and after</SectionLabel>
        <h2 className="text-[29px] leading-[1.12] font-medium tracking-[-0.025em] md:text-[42px]">
          Your real experience, said better
        </h2>
        <p className="text-[15px] leading-relaxed text-ink-soft md:text-[17px]">
          Job Kit asks for your numbers. The <Blank>blanks</Blank> stay blank until you fill them in.
        </p>
      </div>
      <div className="rounded-md border border-line">
        <div className="hidden grid-cols-[1fr_1.4fr] gap-8 border-b border-line bg-desk px-7 py-3.5 font-mono text-xs tracking-[0.06em] text-muted md:grid">
          <span>WHAT YOU WROTE</span>
          <span>WHAT JOB KIT SUGGESTS</span>
        </div>
        {ROWS.map((row) => (
          <div
            key={row.before}
            className="flex flex-col gap-1.5 border-b border-line p-4 last:border-b-0 md:grid md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-8 md:px-7 md:py-6"
          >
            <span className="text-sm text-muted line-through md:text-base">{row.before}</span>
            <span className="text-[15px] leading-relaxed md:text-[17px]">{row.after}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
