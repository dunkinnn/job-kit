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
    <section className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-x-16 gap-y-3.5 px-5 pt-[72px] pb-16 md:gap-y-8 md:px-6 md:py-28">
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3.5">
        <SectionLabel>Built for fresh grads</SectionLabel>
        <h2 className="text-[29px] leading-[1.12] font-medium tracking-[-0.025em] md:text-[42px]">
          No work experience? That's the point.
        </h2>
        <p className="text-[15px] leading-relaxed text-ink-soft md:text-[17px]">
          Most resume tools assume you've had a job. Job Kit starts from what you actually have.
        </p>
      </div>
      <ul className="grid min-w-0 flex-[1.2_1_440px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-8">
        {ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-3 border-b border-line py-[13px] text-[15px] md:py-4 md:text-[17px]">
            <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center border-[1.5px] border-ink bg-hl md:size-[18px]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 12l4 4 10-10" />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
