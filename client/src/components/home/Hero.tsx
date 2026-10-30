import ButtonLink from '../ButtonLink.tsx'

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-5 px-5 pt-10 md:items-center md:px-6 md:pt-24 md:text-center">
      <span className="self-start rounded-full bg-sage-tint px-3.5 py-1.5 text-sm font-medium text-sage md:self-center">
        Free for Filipino fresh grads
      </span>
      <h1 className="max-w-[820px] text-[38px] leading-[1.08] font-medium tracking-[-0.03em] md:text-[64px] md:leading-[1.05]">
        See how your resume matches the job
      </h1>
      <p className="max-w-[600px] text-base leading-relaxed text-muted md:text-[19px]">
        Paste a job post and your resume. Get a match score with reasons, stronger bullet points, and interview
        practice for that exact job.
      </p>
      <div className="flex flex-col gap-3 pt-2 md:flex-row">
        <ButtonLink to="/match">Check a job post</ButtonLink>
        <ButtonLink to="#how" variant="secondary">
          See how it works
        </ButtonLink>
      </div>
      <span className="text-sm text-muted">No sign-up. We don't store your resume.</span>
    </section>
  )
}
