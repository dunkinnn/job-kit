import { useEffect, useRef } from 'react'
import ButtonLink from '../ButtonLink.tsx'
import SectionLabel from '../SectionLabel.tsx'
import WithBlanks from './WithBlanks.tsx'
import { buttonClass } from '../../lib/ui.ts'
import { useCopy } from '../../lib/useCopy.ts'

type Props = { originals: string[]; finals: string[]; onRestart: () => void }

export default function RewriteSummary({ originals, finals, onRestart }: Props) {
  const heading = useRef<HTMLHeadingElement>(null)
  const { copied, failed, copy } = useCopy()
  const hasBlanks = finals.some((text) => /\[[^\]]+\]/.test(text))

  useEffect(() => heading.current?.focus(), [])

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-3">
        <SectionLabel>Bullet rewriter</SectionLabel>
        <h1 ref={heading} tabIndex={-1} className="text-[30px] leading-[1.1] font-medium tracking-[-0.025em] outline-none md:text-[44px]">
          Your stronger bullets
        </h1>
        <p className="text-[15px] text-ink-soft md:text-[17px]">
          Copy them into your resume.{hasBlanks && ' Fill in the [blanks] first.'}
        </p>
      </div>

      <ul className="rounded-md border border-line bg-paper">
        {finals.map((text, index) => (
          <li key={index} className="flex flex-col gap-3 border-b border-line p-5 last:border-b-0 md:flex-row md:items-center md:gap-8 md:px-7 md:py-6">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              {text !== originals[index] && <span className="text-sm text-muted line-through">{originals[index]}</span>}
              <span className="text-[17px] leading-relaxed">
                <WithBlanks text={text} />
              </span>
            </div>
            <button type="button" onClick={() => copy(text, String(index))} className={`${buttonClass('outline', 'md')} shrink-0`}>
              {copied === String(index) ? 'Copied' : 'Copy'}
            </button>
          </li>
        ))}
      </ul>

      {failed && (
        <p role="alert" className="text-[15px] text-missing-dark">
          Copy did not work in this browser. Select the text and copy it yourself.
        </p>
      )}
      <p className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </p>

      <div className="flex flex-col gap-3 md:flex-row">
        <button type="button" onClick={() => copy(finals.join('\n'), 'all')} className={buttonClass('primary')}>
          {copied === 'all' ? 'Copied all' : 'Copy all'}
        </button>
        <button type="button" onClick={onRestart} className={buttonClass('outline')}>
          Rewrite more bullets
        </button>
        <ButtonLink to="/match" variant="outline">
          Check your match
        </ButtonLink>
      </div>
    </div>
  )
}
