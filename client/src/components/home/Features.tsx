const FEATURES = [
  {
    title: 'Match check',
    body: "A score with reasons: skills the job asks for that your resume doesn't show, and strengths to keep.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
  },
  {
    title: 'Bullet rewriter',
    body: 'Turns capstone, OJT, and org work into strong resume points, using only facts you give.',
    icon: (
      <>
        <path d="M4 20h4l10-10-4-4L4 16v4z" />
        <path d="M13 7l4 4" />
      </>
    ),
  },
  {
    title: 'Mock interview',
    body: 'Questions based on that exact job post, with feedback on each answer using the STAR method.',
    icon: <path d="M5 5h14v10H9l-4 4V5z" />,
  },
]

export default function Features() {
  return (
    <section id="how" className="mx-auto flex max-w-[1200px] scroll-mt-20 flex-col gap-10 px-5 pt-16 md:px-6 md:pt-28">
      <div className="flex max-w-[640px] flex-col gap-3">
        <span className="text-sm font-medium text-sage">How it works</span>
        <h2 className="text-[28px] leading-[1.15] font-medium tracking-[-0.02em] md:text-[40px]">Three tools, one job post</h2>
      </div>
      <div className="flex flex-wrap gap-5">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex min-w-0 flex-[1_1_280px] flex-col gap-3 rounded-xl border border-line bg-surface p-6 md:p-7">
            <span className="flex size-10 items-center justify-center rounded-[10px] bg-sage-tint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-sage)" strokeWidth="1.75" aria-hidden="true">
                {feature.icon}
              </svg>
            </span>
            <h3 className="text-[19px] font-medium tracking-[-0.01em]">{feature.title}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
