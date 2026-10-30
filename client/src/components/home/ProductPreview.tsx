import ScoreRing from '../ScoreRing.tsx'
import { scoreColor } from '../../lib/score.ts'

// Sample data that mirrors the plan doc example; not a real result.
const RUBRIC = [
  { label: 'Required skills', value: '3 of 5', percent: 60 },
  { label: 'Relevant projects', value: 'Strong', percent: 85 },
  { label: 'Results in bullet points', value: 'Weak', percent: 30 },
]
const MISSING = ['Git', 'REST APIs']

export default function ProductPreview() {
  return (
    <section aria-label="Example result" className="mx-auto max-w-[1040px] px-5 pt-10 md:px-6 md:pt-16">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgba(28,28,26,0.04),0_16px_40px_rgba(28,28,26,0.06)]">
        <div className="flex h-10 items-center justify-center border-b border-line bg-dim">
          <span className="rounded-md border border-line bg-surface px-4 py-1 text-xs text-muted">Job Kit · Match check</span>
        </div>
        <div className="flex flex-wrap gap-6 p-5 md:p-8">
          <div className="flex min-w-0 flex-[1_1_240px] flex-col items-center gap-4 rounded-xl border border-line p-6">
            <span className="text-sm text-muted">Junior Web Developer</span>
            <ScoreRing score={62} />
            <span className="rounded-full bg-warn-tint px-3 py-1 text-[13px] font-medium text-warn-text">Needs work</span>
          </div>
          <div className="flex min-w-0 flex-[2_1_360px] flex-col gap-4">
            <span className="text-[15px] font-medium">Why this score</span>
            {RUBRIC.map((row) => (
              <div key={row.label} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-line">
                  <div className="h-1.5 rounded-full" style={{ width: `${row.percent}%`, background: scoreColor(row.percent) }} />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap items-center gap-2 pt-1.5">
              <span className="text-sm text-muted">Missing:</span>
              {MISSING.map((skill) => (
                <span key={skill} className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-sm">
                  <span className="size-1.5 rounded-full bg-missing" aria-hidden="true" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
