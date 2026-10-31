import Mark from '../Mark.tsx'

// A sample resume marked up the way Job Kit would; illustration only.
export default function MarkedResume() {
  return (
    <div className="min-w-0 flex-[1_1_480px] rounded-lg bg-panel px-4 pt-8 pb-5 md:px-8 md:pt-10 md:pb-8">
      <div
        role="img"
        aria-label="Example resume marked up by Job Kit: matching skills highlighted, a weak bullet flagged, and a 62% match score"
        className="relative flex flex-col gap-3 rounded-[3px] border border-line bg-paper px-5 pt-6 pb-5 shadow-[0_1px_2px_rgba(20,20,20,0.05),0_12px_28px_rgba(20,20,20,0.08)] md:gap-3.5 md:px-8 md:pt-8 md:pb-7"
      >
        <div className="absolute -top-[18px] right-3 flex items-baseline gap-2 rounded border-[1.5px] border-ink bg-paper px-2.5 py-1.5 shadow-[3px_3px_0_var(--color-ink)] md:-top-5 md:right-5 md:gap-2.5 md:px-3.5 md:py-2">
          <span className="font-mono text-[10px] tracking-[0.06em] text-muted md:text-[11px]">MATCH</span>
          <span className="text-[21px] font-medium tracking-[-0.02em] md:text-[26px]">62%</span>
          <span className="text-[11px] font-medium text-warn md:text-xs">Needs work</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[17px] font-medium tracking-[-0.01em] md:text-[21px]">[Your name]</span>
          <span className="text-xs text-muted md:text-[13px]">Junior Web Developer · Isabela</span>
        </div>
        <hr className="border-line" />
        <span className="font-mono text-[10px] tracking-[0.08em] text-muted md:text-[11px]">PROJECTS</span>
        <p className="flex gap-2.5 text-[13px] leading-normal md:text-sm">
          <span>•</span>
          <span>
            Built a capstone enrollment system in <Mark>React</Mark>
          </span>
        </p>
        <div className="flex flex-col gap-0.5">
          <p className="flex gap-2.5 text-[13px] leading-normal md:text-sm">
            <span>•</span>
            <span className="underline decoration-cobalt decoration-wavy underline-offset-4">Made a website for our capstone</span>
          </p>
          <span className="pl-4 font-hand text-[19px] leading-tight text-cobalt md:text-[21px]">
            ↳ what did it do? how many people used it?
          </span>
        </div>
        <span className="pt-1 font-mono text-[10px] tracking-[0.08em] text-muted md:text-[11px]">SKILLS</span>
        <p className="text-[13px] leading-normal md:text-sm">
          HTML, CSS, <Mark>JavaScript</Mark>, <Mark>React</Mark>, MySQL
        </p>
        <span className="font-hand text-[19px] leading-tight text-cobalt md:text-[21px]">
          job also wants Git + REST APIs. used them? add them.
        </span>
        <div className="hidden flex-col gap-2 pt-1.5 md:flex">
          <span className="h-[7px] w-[92%] rounded-sm bg-faint" />
          <span className="h-[7px] w-[78%] rounded-sm bg-faint" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 pt-4 text-xs text-ink-soft md:pt-[18px] md:text-[13px]">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-[18px] bg-hl" aria-hidden="true" />
          Matches the job
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-[18px] bg-cobalt" aria-hidden="true" />
          Needs your input
        </span>
      </div>
    </div>
  )
}
