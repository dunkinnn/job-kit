import ButtonLink from '../ButtonLink.tsx'

export default function CtaBand() {
  return (
    <section className="bg-hl">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3.5 px-5 py-11 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-7 md:px-6 md:py-[72px]">
        <div className="flex min-w-0 flex-col gap-3 md:flex-[1_1_520px]">
          <h2 className="text-[32px] leading-[1.08] font-medium tracking-[-0.03em] md:text-5xl md:leading-[1.05]">
            Got a job post open in another tab?
          </h2>
          <p className="text-base text-ink-soft md:text-lg">Paste it in and see your match in about a minute.</p>
        </div>
        <ButtonLink to="/match" variant="dark">
          Check a job post
        </ButtonLink>
      </div>
    </section>
  )
}
