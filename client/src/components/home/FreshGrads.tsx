import SectionLabel from '../SectionLabel.tsx'

const ITEMS = [
  'Capstone and thesis',
  'OJT and internships',
  'Org and volunteer work',
  'Freelance and side projects',
  'Taglish interview tips',
  'First-time jobseeker papers',
]

export default function FreshGrads() {
  return (
    <section className="mx-auto grid max-w-[1240px] items-start gap-4 px-5 pt-[72px] pb-16 md:grid-cols-2 md:gap-20 md:px-7 md:py-[140px]">
      <div className="flex flex-col gap-3 md:gap-3.5">
        <SectionLabel>Built for fresh grads</SectionLabel>
        <h2 className="headline text-[28px] leading-[1.06] md:text-[44px] md:leading-[1.05] md:tracking-[-0.01em]">
          No work experience? <span className="text-quiet">That's the point.</span>
        </h2>
        <p className="text-sm leading-relaxed text-ink-soft md:text-base">
          Most resume tools assume you've had a job. Job Kit starts from what you actually have.
        </p>
      </div>
      <ul className="flex flex-wrap gap-2 md:gap-2.5">
        {ITEMS.map((item) => (
          <li key={item} className="rounded-full border border-line-strong bg-paper px-4 py-2.5 text-sm font-medium md:px-5 md:py-3 md:text-base">
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
