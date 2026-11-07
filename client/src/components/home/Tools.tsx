import type { ReactNode } from 'react'
import { Link } from 'react-router'
import ArrowIcon from '../ArrowIcon.tsx'
import Mark from '../Mark.tsx'
import ScoreRing from '../ScoreRing.tsx'
import SectionLabel from '../SectionLabel.tsx'

type Tool = { number: string; title: string; text: string; to?: string; gradient: string; preview: ReactNode }

const TOOLS: Tool[] = [
  {
    number: '01',
    title: 'Match check',
    text: "A score with reasons: what the job wants that your resume doesn't show yet.",
    to: '/match',
    gradient: 'linear-gradient(160deg, #cfe2f6 0%, #86b5e4 60%, #4f86c6 100%)',
    preview: (
      <div className="flex w-[200px] flex-col items-center gap-2.5 rounded-[14px] bg-paper p-5 shadow-[0_20px_40px_rgba(20,43,74,0.2)]">
        <ScoreRing score={62} size={104} stroke={9} />
        <span className="text-xs text-muted">Missing: Git, REST APIs</span>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Bullet rewriter',
    text: 'Turns capstone, OJT, and org work into strong bullets, using only facts you give.',
    to: '/rewrite',
    gradient: 'linear-gradient(160deg, #a9cdf0 0%, #5486bf 60%, #23466f 100%)',
    preview: (
      <div className="flex w-[250px] flex-col gap-2.5 rounded-[14px] bg-paper p-5 shadow-[0_20px_40px_rgba(20,43,74,0.25)]">
        <span className="text-xs text-muted line-through">Made a website for our capstone</span>
        <span className="text-[15px] leading-snug font-semibold">
          Built a React web app used by <Mark>150+ students</Mark> for enrollment tracking.
        </span>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Mock interview',
    text: 'Questions from that exact job post, with STAR feedback on every answer. Coming soon.',
    gradient: 'linear-gradient(160deg, #5486bf 0%, #1f3d66 60%, #142b4a 100%)',
    preview: (
      <div className="flex w-[240px] flex-col gap-2 rounded-[14px] bg-paper p-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
        <span className="text-xs leading-snug text-ink-soft">"Tell me about a time a project didn't go as planned."</span>
        <span className="rounded-lg bg-strong-tint px-2.5 py-1.5 text-xs font-semibold text-strong-dark">S · T · A clear</span>
        <span className="rounded-lg bg-warn-tint px-2.5 py-1.5 text-xs font-semibold text-warn-dark">R · Add the result</span>
      </div>
    ),
  },
]

function ToolCard({ tool }: { tool: Tool }) {
  const body = (
    <>
      <div className="relative flex h-[260px] items-center justify-center overflow-hidden rounded-[14px] md:h-[380px] md:rounded-2xl" style={{ background: tool.gradient }}>
        {tool.to && (
          <span aria-hidden="true" className="absolute top-3.5 right-3.5 flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/30 text-white">
            <ArrowIcon />
          </span>
        )}
        <div aria-hidden="true">{tool.preview}</div>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[17px] font-bold md:text-lg">{tool.title}</h3>
        <span className="text-xs text-muted md:text-[13px]">{tool.number}</span>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft md:text-[15px]">{tool.text}</p>
    </>
  )

  return tool.to ? (
    <Link to={tool.to} className="group flex flex-col gap-3 md:gap-4">
      {body}
    </Link>
  ) : (
    <article className="flex flex-col gap-3 md:gap-4">{body}</article>
  )
}

export default function Tools() {
  return (
    <section id="tools" className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 pt-[72px] md:gap-10 md:px-7 md:pt-[140px]">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3 md:gap-3.5">
          <SectionLabel>What you get</SectionLabel>
          <h2 className="headline text-[28px] leading-[1.06] md:text-[44px] md:leading-[1.05] md:tracking-[-0.01em]">
            Three tools, <span className="text-quiet">one job post</span>
          </h2>
        </div>
        <Link to="/match" className="hidden min-h-11 items-center gap-2 text-[13px] font-bold tracking-[0.04em] text-accent uppercase md:flex">
          Start with a job post <ArrowIcon />
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3 md:gap-6">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.number} tool={tool} />
        ))}
      </div>
    </section>
  )
}
