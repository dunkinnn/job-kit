import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import ScoreRing from '../ScoreRing.tsx'
import SectionLabel from '../SectionLabel.tsx'
import { scoreColor, scoreStatus } from '../../lib/score.ts'
import { buttonClass } from '../../lib/ui.ts'
import type { MatchResult } from '../../lib/types.ts'

type Props = {
  result: MatchResult
  onNewJob: () => void
  onEdit: () => void
}

const card = 'flex flex-col gap-3.5 rounded-xl border border-line bg-paper p-5 md:p-7'
const cardTitle = 'text-[17px] font-medium tracking-[-0.01em] md:text-xl'

export default function MatchResults({ result, onNewJob, onEdit }: Props) {
  const heading = useRef<HTMLHeadingElement>(null)
  const navigate = useNavigate()
  const status = scoreStatus(result.score)

  // Moves focus to the results so screen reader users hear them right away.
  useEffect(() => heading.current?.focus(), [])

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-3">
        <SectionLabel>Your match</SectionLabel>
        <h1 ref={heading} tabIndex={-1} className="headline text-[23px] leading-[1.06] outline-none md:text-[34px]">
          {result.jobTitle}
        </h1>
      </div>

      <div className="flex flex-wrap items-start gap-4 md:gap-6">
        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-3">
          <section className="flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 text-center md:p-8">
            <ScoreRing score={result.score} size={156} stroke={12} />
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${status.className}`}>{status.label}</span>
            <p className="text-[15px] leading-relaxed text-ink-soft">{result.summary}</p>
          </section>
          {result.weakBullets.length > 0 && (
            <button
              type="button"
              onClick={() => navigate('/rewrite', { state: { bullets: result.weakBullets, jobTitle: result.jobTitle } })}
              className={buttonClass('primary')}
            >
              Fix {result.weakBullets.length} weak {result.weakBullets.length === 1 ? 'bullet' : 'bullets'}
            </button>
          )}
          <button type="button" onClick={onNewJob} className={buttonClass('dark')}>
            Check another job
          </button>
          <button type="button" onClick={onEdit} className={buttonClass('outline')}>
            Edit and check again
          </button>
        </aside>

        <div className="flex min-w-0 flex-[2_1_520px] flex-col gap-4 md:gap-6">
          <section className={card}>
            <h2 className={cardTitle}>Why this score</h2>
            {result.rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-2">
                <div className="flex justify-between gap-3 text-[15px]">
                  <span>{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
                <div className="h-2 rounded-full bg-desk">
                  <div className="h-2 rounded-full" style={{ width: `${row.percent}%`, background: scoreColor(row.percent) }} />
                </div>
                {row.reason && <p className="text-sm text-muted">{row.reason}</p>}
              </div>
            ))}
            <p className="border-t border-line pt-3.5 text-[13px] text-muted">
              Scoring rubric {result.rubricVersion}. The weights will be updated after recruiter interviews.
            </p>
          </section>

          <div className="flex flex-wrap gap-4 md:gap-6">
            <section className={`min-w-0 flex-[1_1_260px] ${card}`}>
              <h2 className={cardTitle}>Missing from your resume</h2>
              {result.missing.length + result.partial.length === 0 ? (
                <p className="text-[15px] text-ink-soft">Your resume shows every main requirement.</p>
              ) : (
                <ul className="flex flex-wrap gap-2">
                  {result.missing.map((skill) => (
                    <li key={skill} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[15px]">
                      <span className="size-1.5 rounded-full bg-missing" aria-hidden="true" />
                      {skill}
                    </li>
                  ))}
                  {result.partial.map((skill) => (
                    <li key={skill} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-[15px]">
                      <span className="size-1.5 rounded-full bg-warn" aria-hidden="true" />
                      {skill} <span className="text-muted">(partly shown)</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-sm leading-relaxed text-muted">Only add these if you have actually used them, for example in your capstone or OJT.</p>
            </section>

            <section className={`min-w-0 flex-[1_1_260px] ${card}`}>
              <h2 className={cardTitle}>Keep these</h2>
              <ul className="flex flex-col gap-2.5">
                {result.strengths.map((strength) => (
                  <li key={strength} className="flex gap-2.5 text-[15px] leading-relaxed">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-strong" aria-hidden="true" />
                    {strength}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {result.weakBullets.length > 0 && (
            <section className={card}>
              <h2 className={cardTitle}>Bullets to strengthen</h2>
              <ul className="flex flex-col gap-2.5">
                {result.weakBullets.map((bullet) => (
                  <li key={bullet} className="text-[15px] leading-relaxed">
                    <span className="underline decoration-sky-500 decoration-wavy underline-offset-4">{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted">Add what changed or a number. The Bullet rewriter can help.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
