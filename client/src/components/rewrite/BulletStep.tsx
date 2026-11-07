import { useEffect, useRef, useState, type FormEvent } from 'react'
import SectionLabel from '../SectionLabel.tsx'
import SuggestionCard from './SuggestionCard.tsx'
import { getQuestions, rewriteBullet } from '../../lib/api.ts'
import { buttonClass } from '../../lib/ui.ts'
import type { BulletQuestions, RewriteResult } from '../../lib/types.ts'

type Props = {
  bullet: string
  jobTitle: string
  position: number
  total: number
  onDone: (finalText: string) => void
}

const errorText = (error: unknown) => (error instanceof Error ? error.message : 'Something went wrong. Please try again.')

export default function BulletStep({ bullet, jobTitle, position, total, onDone }: Props) {
  const [questions, setQuestions] = useState<BulletQuestions | null>(null)
  const [loadError, setLoadError] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<RewriteResult | null>(null)
  const [writing, setWriting] = useState(false)
  const [writeError, setWriteError] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)

  // Moves focus to the new bullet so keyboard and screen reader users start at the top.
  useEffect(() => heading.current?.focus(), [])

  useEffect(() => {
    const controller = new AbortController()
    getQuestions(bullet, jobTitle, controller.signal)
      .then((next) => {
        setQuestions(next)
        setAnswers(next.questions.map(() => ''))
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) setLoadError(errorText(error))
      })
    return () => controller.abort()
  }, [bullet, jobTitle, attempt])

  function retry() {
    setLoadError('')
    setAttempt((value) => value + 1)
  }

  async function handleWrite(event: FormEvent) {
    event.preventDefault()
    if (!questions) return
    setWriting(true)
    setWriteError('')
    try {
      const filled = questions.questions.map((item, index) => ({ question: item.question, answer: answers[index]?.trim() ?? '' }))
      setResult(await rewriteBullet(bullet, jobTitle, filled))
    } catch (error) {
      setWriteError(errorText(error))
    } finally {
      setWriting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <SectionLabel>Bullet rewriter</SectionLabel>
          <h1 ref={heading} tabIndex={-1} className="headline text-[23px] leading-[1.06] outline-none md:text-[34px]">
            Make this bullet stronger
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {total > 1 && (
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }, (_, index) => (
                <span key={index} aria-hidden="true" className={`h-1.5 w-6 rounded-full md:w-8 ${index <= position ? 'bg-accent' : 'bg-line'}`} />
              ))}
              <span className="pl-1.5 text-sm text-muted">
                {position + 1} of {total}
              </span>
            </div>
          )}
          <button type="button" onClick={() => onDone(bullet)} className="min-h-11 text-sm text-muted underline underline-offset-4 hover:text-ink">
            Skip this bullet
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-4 md:gap-6">
        <form onSubmit={handleWrite} noValidate className="flex min-w-0 flex-[1_1_460px] flex-col gap-5 rounded-xl border border-line bg-paper p-5 md:gap-6 md:p-7">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted">Your bullet</span>
            <p className="text-[17px] leading-normal text-muted line-through decoration-quiet">{bullet}</p>
            {questions && <p className="text-sm text-ink-soft">{questions.whyWeak}</p>}
          </div>
          <hr className="border-line" />
          <h2 className="text-[17px] font-medium tracking-[-0.01em] md:text-xl">A few questions first</h2>

          {!questions && !loadError && (
            <div role="status" className="flex flex-col gap-4">
              <span className="text-sm text-muted">Reading your bullet...</span>
              {[0, 1, 2].map((item) => (
                <span key={item} aria-hidden="true" className="h-12 animate-pulse rounded-xl bg-desk motion-reduce:animate-none" />
              ))}
            </div>
          )}

          {loadError && (
            <div role="alert" className="flex flex-col items-start gap-3">
              <p className="text-[15px] text-missing-dark">{loadError}</p>
              <button type="button" onClick={retry} className={buttonClass('outline', 'md')}>
                Try again
              </button>
            </div>
          )}

          {questions &&
            questions.questions.map((item, index) => (
              <div key={item.question} className="flex flex-col gap-1.5">
                <label htmlFor={`answer-${index}`} className="text-[15px]">
                  {item.question}
                </label>
                <input
                  id={`answer-${index}`}
                  value={answers[index] ?? ''}
                  maxLength={300}
                  disabled={writing}
                  onChange={(event) => setAnswers((current) => current.map((value, at) => (at === index ? event.target.value : value)))}
                  aria-describedby={item.kind === 'number' ? `answer-${index}-hint` : undefined}
                  className="h-12 rounded-xl border border-line bg-desk px-3.5 text-[15px] focus:border-accent focus:outline-2 focus:outline-accent/20 disabled:opacity-70"
                />
                {item.kind === 'number' && (
                  <span id={`answer-${index}-hint`} className="text-[13px] text-muted">
                    Skip it if you're not sure. We won't guess a number.
                  </span>
                )}
              </div>
            ))}

          {writeError && (
            <p role="alert" className="text-[15px] text-missing-dark">
              {writeError}
            </p>
          )}

          {questions && (
            <button type="submit" disabled={writing} aria-busy={writing} className={`${buttonClass(result ? 'outline' : 'primary')} md:self-start`}>
              {writing ? 'Writing...' : result ? 'Write it again' : 'Write my bullet'}
            </button>
          )}
        </form>

        <div className="min-w-0 flex-[1_1_380px]">
          {result ? (
            <SuggestionCard key={result.suggestion} result={result} onUse={onDone} />
          ) : (
            <div className="rounded-xl border border-dashed border-line-strong p-6 text-[15px] leading-relaxed text-muted md:p-8">
              Your stronger bullet will show up here. Answer what you can. You can skip any question.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
