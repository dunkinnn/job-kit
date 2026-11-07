import { useState } from 'react'
import WithBlanks from './WithBlanks.tsx'
import { buttonClass } from '../../lib/ui.ts'
import type { RewriteResult } from '../../lib/types.ts'

type Props = { result: RewriteResult; onUse: (text: string) => void }

export default function SuggestionCard({ result, onUse }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(result.suggestion)

  return (
    <div className="flex flex-col gap-3">
      <section aria-live="polite" className="flex flex-col gap-4 rounded-2xl bg-navy p-6 text-white md:p-8">
        <span className="text-sm text-sky-200">Suggested bullet</span>
        {editing ? (
          <>
            <label htmlFor="suggestion-edit" className="sr-only">
              Edit your bullet
            </label>
            <textarea
              id="suggestion-edit"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="h-32 resize-y rounded-xl bg-paper p-3.5 text-[17px] leading-relaxed text-ink focus:outline-2 focus:outline-white"
            />
          </>
        ) : (
          <p className="text-[19px] leading-snug tracking-[-0.01em] md:text-2xl">
            <WithBlanks text={draft} onDark />
          </p>
        )}
        <span className="text-[13px] text-sky-200">Uses only what you told us.</span>
        {result.removedNumbers && (
          <p className="rounded bg-white/10 px-3 py-2 text-[13px] leading-normal">
            We took out a number you didn't give us. Fill in the [number] yourself, or answer the question and write it again.
          </p>
        )}
      </section>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => setEditing((value) => !value)} className={buttonClass('outline')}>
          {editing ? 'Done editing' : 'Edit'}
        </button>
        <button type="button" disabled={!draft.trim()} onClick={() => onUse(draft.trim())} className={buttonClass('dark')}>
          Use this
        </button>
      </div>
    </div>
  )
}
