import Mark from '../Mark.tsx'
import ScoreRing from '../ScoreRing.tsx'

const card = 'shrink-0 overflow-hidden rounded-xl bg-paper/95 p-3.5 md:rounded-[14px] md:p-5'
const label = 'text-[9px] font-bold tracking-[0.08em] text-muted md:text-[10px]'
const bar = (width: string) => <span className="block h-1.5 rounded-full bg-faint" style={{ width }} />

const rows = [
  { label: 'Required skills', value: '3 of 5', percent: 60 },
  { label: 'Relevant projects', value: 'Strong', percent: 100 },
  { label: 'Results in bullets', value: 'Weak', percent: 20 },
]

// Job Kit's own screens rise like a city skyline behind the hero text; decoration only.
export default function Skyline() {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 -bottom-8 z-[1] flex items-end justify-center gap-2 px-3 md:-bottom-10 md:h-[487px] md:[zoom:var(--fit,1)] md:gap-4 md:px-10">
      <div className={`${card} flex h-[520px] w-[118px] flex-col gap-2 md:h-[78%] md:w-[210px] md:gap-2.5`}>
        <span className="text-[11px] font-bold md:text-[13px]">[Your name]</span>
        <span className={`${label} pt-1`}>PROJECTS</span>
        <span className="text-[10px] leading-snug md:text-xs">
          Capstone in <Mark>React</Mark>
        </span>
        <span className="text-[10px] underline decoration-sky-500 decoration-wavy underline-offset-[3px] md:text-xs">Made a website</span>
        <span className={`${label} pt-1`}>SKILLS</span>
        <span className="text-[10px] md:text-xs">
          <Mark>JavaScript</Mark>, MySQL
        </span>
        {bar('85%')}
        {bar('70%')}
      </div>
      <div className={`${card} flex h-[450px] w-[110px] flex-col items-center gap-2 md:h-[67%] md:w-[190px] md:gap-2.5`}>
        <span className="hidden text-[11px] text-muted md:block">Junior Web Developer</span>
        <span className="md:hidden">
          <ScoreRing score={62} size={76} stroke={7} />
        </span>
        <span className="hidden md:block">
          <ScoreRing score={62} size={104} stroke={9} />
        </span>
        <span className="rounded-full bg-warn-tint px-2 py-0.5 text-[9px] font-semibold text-warn-dark md:text-[11px]">Needs work</span>
      </div>
      <div className={`${card} hidden h-full w-[260px] flex-col gap-3.5 md:flex`}>
        <span className="text-[13px] font-bold">Why this score</span>
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px]">
              <span>{row.label}</span>
              <span className="font-bold">{row.value}</span>
            </div>
            <span className="block h-1.5 rounded-full bg-faint">
              <span
                className={`block h-1.5 rounded-full ${row.percent >= 80 ? 'bg-strong' : row.percent >= 50 ? 'bg-warn' : 'bg-missing'}`}
                style={{ width: `${row.percent}%` }}
              />
            </span>
          </div>
        ))}
        <span className="pt-1 text-[11px] font-bold">Missing</span>
        <div className="flex gap-1.5 text-[11px]">
          <span className="rounded-full border border-line px-2.5 py-0.5">Git</span>
          <span className="rounded-full border border-line px-2.5 py-0.5">REST APIs</span>
        </div>
      </div>
      <div className="flex h-[490px] w-[122px] shrink-0 overflow-hidden flex-col gap-2 rounded-xl bg-accent p-3.5 text-white md:h-[73%] md:w-[230px] md:gap-3 md:rounded-[14px] md:p-5">
        <span className="text-[9px] text-sky-200 md:text-[11px]">Suggested bullet</span>
        <span className="hidden text-[11px] text-sky-300 line-through md:block">Made a website for our capstone</span>
        <span className="text-[11px] leading-snug font-semibold md:text-[15px]">Built a React web app used by 150+ students for enrollment tracking.</span>
      </div>
      <div className={`${card} hidden h-[87%] w-[200px] flex-col gap-2.5 md:flex`}>
        <span className="text-[13px] font-bold">Mock interview</span>
        <span className="text-[11px] leading-snug text-ink-soft">"Tell me about a time a project didn't go as planned."</span>
        <span className="rounded-lg bg-strong-tint px-2.5 py-1.5 text-[11px] font-semibold text-strong-dark">S · Situation clear</span>
        <span className="rounded-lg bg-strong-tint px-2.5 py-1.5 text-[11px] font-semibold text-strong-dark">T · Task clear</span>
        <span className="rounded-lg bg-warn-tint px-2.5 py-1.5 text-[11px] font-semibold text-warn-dark">A · Needs detail</span>
        <span className="rounded-lg bg-missing-tint px-2.5 py-1.5 text-[11px] font-semibold text-missing-dark">R · Missing</span>
      </div>
    </div>
  )
}
