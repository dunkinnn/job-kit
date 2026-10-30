import ButtonLink from '../ButtonLink.tsx'

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pt-16 pb-12 md:px-6 md:pt-28 md:pb-24">
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-ink px-6 py-8 text-paper md:px-12 md:py-14">
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-2">
          <h2 className="text-2xl leading-tight font-medium tracking-[-0.02em] md:text-4xl">Applying this week?</h2>
          <p className="text-[15px] text-on-dark-muted md:text-[17px]">Check your resume against the job before you hit send.</p>
        </div>
        <ButtonLink to="/match" variant="light" className="w-full md:w-auto">
          Check a job post
        </ButtonLink>
      </div>
    </section>
  )
}
