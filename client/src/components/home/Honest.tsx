import SectionLabel from '../SectionLabel.tsx'

const POINTS = [
  { title: 'Never invents experience', text: "Any number you didn't give becomes a [blank] for you to fill in." },
  { title: 'Every score explains itself', text: 'A fixed rubric, with each skill backed by a quote from your resume.' },
  { title: "Your resume isn't stored", text: "It's used for your feedback, then gone when you close the tab." },
]

export default function Honest() {
  return (
    <section className="mx-2 mt-[72px] rounded-[20px] bg-navy text-white md:mx-3 md:mt-[140px] md:rounded-3xl">
      <div className="mx-auto grid max-w-[1240px] gap-4 px-5 pt-12 pb-6 md:grid-cols-2 md:gap-20 md:px-7 md:py-24">
        <div className="flex flex-col gap-3.5 md:gap-[18px]">
          <SectionLabel light>Honest by design</SectionLabel>
          <h2 className="headline text-[28px] leading-[1.06] md:text-[44px] md:leading-[1.05] md:tracking-[-0.01em]">
            Feedback <span className="text-sky-300">you can trust</span>
          </h2>
          <p className="max-w-[440px] text-sm leading-relaxed text-sky-100 md:text-base">
            AI resume tools often make things up. Job Kit checks the AI's work in code before you ever see it.
          </p>
        </div>
        <ol className="mt-2 flex flex-col md:mt-0">
          {POINTS.map((point, index) => (
            <li key={point.title} className="grid grid-cols-[32px_1fr] gap-2.5 border-t border-white/20 py-[18px] md:grid-cols-[48px_1fr] md:gap-4 md:border-t-0 md:border-b md:py-[26px]">
              <span className="text-xs text-sky-300 tabular-nums md:text-[13px]">0{index + 1}</span>
              <div className="flex flex-col gap-1.5 md:gap-2">
                <span className="headline text-sm md:text-[17px]">{point.title}</span>
                <span className="text-[13px] leading-relaxed text-sky-100 md:text-sm">{point.text}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
