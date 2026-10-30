const POINTS = [
  { title: 'Never invents experience', body: 'It asks for real numbers instead of making them up.' },
  { title: 'Every score explains itself', body: 'Scores follow a fixed rubric built from recruiter interviews.' },
  { title: "Your resume isn't stored", body: "It's used to create your feedback, then discarded." },
]

export default function TrustSection() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-wrap gap-8 px-5 pt-16 md:gap-12 md:px-6 md:pt-28">
      <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3">
        <span className="text-sm font-medium text-sage">Honest by design</span>
        <h2 className="text-[28px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[40px]">Feedback you can trust</h2>
      </div>
      <ul className="flex min-w-0 flex-[1.4_1_420px] flex-col border-b border-line">
        {POINTS.map((point) => (
          <li key={point.title} className="flex flex-col gap-1.5 border-t border-line py-5">
            <span className="text-[17px] font-medium">{point.title}</span>
            <span className="text-[15px] leading-relaxed text-muted">{point.body}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
