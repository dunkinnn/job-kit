import ButtonLink from '../ButtonLink.tsx'

export default function CtaBand() {
  return (
    <section className="mx-2 rounded-[20px] bg-dusk text-white md:mx-3 md:rounded-3xl">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-[18px] px-5 pt-12 pb-6 md:gap-9 md:px-7 md:pt-24 md:pb-[88px]">
        <h2 className="headline text-[38px] leading-[0.95] md:text-[clamp(44px,8.2vw,120px)] md:leading-[0.92] md:tracking-[-0.02em]">
          Got a job post open?
        </h2>
        <div className="flex flex-col gap-[18px] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6">
          <p className="text-[15px] text-desk md:text-lg">Paste it in and see your match in under a minute.</p>
          <ButtonLink to="/match" variant="light" arrow className="w-full md:w-auto">
            Check a job post
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
