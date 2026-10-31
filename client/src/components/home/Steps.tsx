import type { ReactNode } from 'react'
import Mark from '../Mark.tsx'
import ScoreRing from '../ScoreRing.tsx'
import SectionLabel from '../SectionLabel.tsx'

type Step = { label: string; text: string; preview: ReactNode; final?: boolean }

const STAR = [
  { letter: 'S', done: true },
  { letter: 'T', done: true },
  { letter: 'A', done: true },
  { letter: 'R', done: false },
]

const STEPS: Step[] = [
  {
    label: '01 — Check',
    text: "See your match score and exactly what the job wants that your resume doesn't show.",
    preview: (
      <div className="flex items-center gap-4">
        <ScoreRing score={62} />
        <span className="text-[13px] leading-normal text-ink-soft">
          Missing:
          <br />
          Git, REST APIs
        </span>
      </div>
    ),
  },
  {
    label: '02 — Fix',
    text: 'Rewrite weak bullet points using real facts you give, never made-up ones.',
    preview: (
      <div className="flex flex-col gap-2">
        <span className="text-[13px] text-muted line-through">Made a website for our capstone</span>
        <span className="text-sm leading-normal">
          Built a React web app used by <Mark>150+ students</Mark> for enrollment tracking.
        </span>
      </div>
    ),
  },
  {
    label: '03 — Practice',
    text: 'Answer questions from that job post and get STAR feedback on each one.',
    preview: (
      <div className="flex flex-col gap-3">
        <span className="text-[13px] leading-normal">"Tell me about a time a project didn't go as planned."</span>
        <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
          {STAR.map((part) => (
            <span
              key={part.letter}
              className={`border py-1 ${part.done ? 'border-strong text-strong' : 'border-warn text-warn-dark'}`}
            >
              {part.letter} {part.done ? '✓' : '?'}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    label: '04 — Apply',
    text: 'Send it knowing it fits, and share your progress if you want.',
    final: true,
    preview: (
      <div className="flex flex-col gap-1">
        <span className="text-[13px]">Junior Web Developer</span>
        <div className="flex items-baseline gap-2.5">
          <span className="text-[21px] font-medium line-through decoration-2 md:text-2xl">62%</span>
          <span className="text-[42px] font-medium tracking-[-0.03em] md:text-5xl">88%</span>
        </div>
        <span className="text-[13px]">match. Ready to send.</span>
      </div>
    ),
  },
]

export default function Steps() {
  return (
    <section id="how" className="scroll-mt-16 border-line md:border-t">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 pt-16 md:gap-10 md:px-6 md:pt-24">
        <div className="flex max-w-[720px] flex-col gap-3.5">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-[29px] leading-[1.12] font-medium tracking-[-0.025em] md:text-[42px]">
            From "maybe" to <Mark variant="marker">ready for the interview</Mark>
          </h2>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-7">
          {STEPS.map((step) => (
            <li
              key={step.label}
              className={`flex flex-col gap-3 border-t-2 pt-3 md:gap-4 md:pt-4 ${step.final ? 'border-cobalt' : 'border-ink'}`}
            >
              <span className={`font-mono text-xs tracking-[0.04em] uppercase md:text-[13px] ${step.final ? 'text-cobalt' : ''}`}>
                {step.label}
              </span>
              <div
                className={`flex flex-col justify-center rounded-md p-4 md:min-h-[150px] md:p-5 ${step.final ? 'bg-hl' : 'bg-desk'}`}
              >
                {step.preview}
              </div>
              <p className="text-sm leading-relaxed text-ink-soft md:text-[15px]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
