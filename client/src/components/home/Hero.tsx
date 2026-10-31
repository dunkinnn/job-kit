import ButtonLink from '../ButtonLink.tsx'
import Mark from '../Mark.tsx'
import SectionLabel from '../SectionLabel.tsx'
import MarkedResume from './MarkedResume.tsx'

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-10 px-5 pt-9 pb-10 md:gap-14 md:px-6 md:pt-[72px] md:pb-[88px]">
      <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-[18px] md:gap-6">
        <SectionLabel>For Filipino fresh grads</SectionLabel>
        <h1 className="text-[38px] leading-[1.06] font-medium tracking-[-0.035em] md:text-[60px] md:leading-[1.05]">
          Applying everywhere and hearing <Mark variant="marker">nothing back?</Mark>
        </h1>
        <p className="max-w-[520px] text-base leading-relaxed text-ink-soft md:text-[19px]">
          Most fresh grads send one resume to every job. Job Kit reads the job post, marks up your resume like a
          recruiter would, and gets you ready for the interview.
        </p>
        <div className="flex flex-col gap-5 pt-1 md:flex-row md:items-center">
          <ButtonLink to="/match">Check a job post</ButtonLink>
          <a href="#how" className="hidden min-h-11 items-center text-base text-ink underline underline-offset-4 md:flex">
            See how it works
          </a>
        </div>
        <span className="text-center font-mono text-[11px] tracking-[0.04em] text-muted md:text-left md:text-xs">
          FREE · NO SIGN-UP · RESUME NOT STORED
        </span>
      </div>
      <MarkedResume />
    </section>
  )
}
