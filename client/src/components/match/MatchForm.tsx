import { useState, type FormEvent } from 'react'
import SectionLabel from '../SectionLabel.tsx'
import TextBox, { MAX_CHARS, MIN_CHARS } from './TextBox.tsx'
import { checkMatch } from '../../lib/api.ts'
import { buttonClass } from '../../lib/ui.ts'
import type { MatchResult } from '../../lib/types.ts'

type Props = {
  jobPost: string
  resume: string
  onJobPostChange: (value: string) => void
  onResumeChange: (value: string) => void
  onResult: (result: MatchResult) => void
}

// Returns the first problem with the inputs, matching the server's rules.
function validate(jobPost: string, resume: string): string {
  for (const [label, text] of [['The job post', jobPost], ['Your resume', resume]]) {
    const length = text.trim().length
    if (length < MIN_CHARS) return `${label} looks too short. Paste the full text.`
    if (length > MAX_CHARS) return `${label} is too long. Keep it under 8,000 characters.`
  }
  return ''
}

export default function MatchForm({ jobPost, resume, onJobPostChange, onResumeChange, onResult }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const problem = validate(jobPost, resume)
    setError(problem)
    if (problem) return

    setLoading(true)
    try {
      onResult(await checkMatch(jobPost, resume))
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-3">
        <SectionLabel>Match check</SectionLabel>
        <h1 className="text-[30px] leading-[1.1] font-medium tracking-[-0.025em] md:text-[44px]">Paste the job and your resume</h1>
        <p className="text-[15px] text-ink-soft md:text-[17px]">
          We compare them against what recruiters look for. It takes under a minute.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 md:gap-5">
        <TextBox
          id="job-post"
          label="Job post"
          hint="JobStreet, Kalibrr, Facebook groups"
          placeholder="Paste the full job ad here"
          value={jobPost}
          disabled={loading}
          onChange={onJobPostChange}
        />
        <TextBox
          id="resume"
          label="Your resume"
          hint="Paste as text"
          placeholder="Paste your resume. Include education, capstone, OJT, and org work."
          value={resume}
          disabled={loading}
          onChange={onResumeChange}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-missing/30 bg-missing-tint px-4 py-3 text-[15px] text-missing-dark">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
        <p className="flex items-start gap-2.5 text-[13px] leading-normal text-muted md:text-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-cobalt)" strokeWidth="1.75" aria-hidden="true" className="mt-px shrink-0">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          Not stored by us. Sent to our AI provider only to create your feedback.
        </p>
        <button type="submit" disabled={loading} aria-busy={loading} className={buttonClass('primary')}>
          {loading && (
            <svg className="size-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" />
            </svg>
          )}
          {loading ? 'Checking your match...' : 'Check my match'}
        </button>
      </div>
      {loading && (
        <p role="status" className="text-center text-sm text-muted md:text-right">
          Reading the job post and your resume. This usually takes 10 to 30 seconds.
        </p>
      )}
    </form>
  )
}
