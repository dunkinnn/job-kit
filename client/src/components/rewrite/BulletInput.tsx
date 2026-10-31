import { useState, type FormEvent } from 'react'
import SectionLabel from '../SectionLabel.tsx'
import { buttonClass } from '../../lib/ui.ts'

const MAX_BULLETS = 5

type Props = { onStart: (bullets: string[], jobTitle: string) => void }

// Splits pasted text into bullets, dropping list markers like "-", "*", or "•".
const toBullets = (text: string) =>
  text
    .split('\n')
    .map((line) => line.replace(/^\s*[-*•]\s*/, '').trim())
    .filter(Boolean)

export default function BulletInput({ onStart }: Props) {
  const [text, setText] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [error, setError] = useState('')
  const bullets = toBullets(text)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    let problem = ''
    if (bullets.length === 0) problem = 'Paste at least one bullet point.'
    else if (bullets.length > MAX_BULLETS) problem = `Paste up to ${MAX_BULLETS} bullet points at a time.`
    else if (bullets.some((bullet) => bullet.length < 5)) problem = 'One of your bullet points is too short.'
    else if (bullets.some((bullet) => bullet.length > 300)) problem = 'Keep each bullet point under 300 characters.'
    setError(problem)
    if (!problem) onStart(bullets, jobTitle.trim())
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-[760px] flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-3">
        <SectionLabel>Bullet rewriter</SectionLabel>
        <h1 className="text-[30px] leading-[1.1] font-medium tracking-[-0.025em] md:text-[44px]">Make your bullets stronger</h1>
        <p className="text-[15px] leading-relaxed text-ink-soft md:text-[17px]">
          Paste up to 5 bullet points from your resume. We ask a few questions, then suggest a stronger version using only
          what you tell us.
        </p>
      </div>

      <div className="flex flex-col gap-5 rounded-md border border-line bg-paper p-4 md:p-6">
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="bullets" className="text-base font-medium md:text-[17px]">
              Bullet points
            </label>
            <span id="bullets-hint" className="text-[13px] text-muted">
              One per line
            </span>
          </div>
          <textarea
            id="bullets"
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-describedby="bullets-hint bullets-count"
            placeholder={'Made a website for our capstone\nAssisted in the IT office during OJT'}
            className="h-[180px] resize-y rounded-md border border-line bg-desk p-3.5 text-[15px] leading-relaxed placeholder:text-muted focus:border-cobalt focus:outline-2 focus:outline-cobalt/20 md:p-4"
          />
          <span id="bullets-count" className={`self-end font-mono text-xs ${bullets.length > MAX_BULLETS ? 'text-missing' : 'text-muted'}`}>
            {bullets.length} of {MAX_BULLETS} bullets
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="job-title" className="text-[15px] font-medium">
            Job you're applying for <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="job-title"
            value={jobTitle}
            maxLength={80}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Junior Web Developer"
            className="h-12 rounded-md border border-line bg-desk px-3.5 text-[15px] placeholder:text-muted focus:border-cobalt focus:outline-2 focus:outline-cobalt/20"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-missing/30 bg-missing-tint px-4 py-3 text-[15px] text-missing-dark">
          {error}
        </p>
      )}

      <button type="submit" className={`${buttonClass('primary')} md:self-start`}>
        Start
      </button>
    </form>
  )
}
