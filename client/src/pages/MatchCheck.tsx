import { useState } from 'react'
import MatchForm from '../components/match/MatchForm.tsx'
import MatchResults from '../components/match/MatchResults.tsx'
import ToolPage from '../components/ToolPage.tsx'
import type { MatchResult } from '../lib/types.ts'

// Holds texts and results in memory only, so nothing outlives the browser tab.
export default function MatchCheck() {
  const [jobPost, setJobPost] = useState('')
  const [resume, setResume] = useState('')
  const [result, setResult] = useState<MatchResult | null>(null)

  function showResult(next: MatchResult) {
    setResult(next)
    window.scrollTo({ top: 0 })
  }

  // Keeps the resume so the user can check it against another job quickly.
  function startNewJob() {
    setJobPost('')
    setResult(null)
    window.scrollTo({ top: 0 })
  }

  return (
    <ToolPage>
      {result ? (
        <MatchResults result={result} onNewJob={startNewJob} onEdit={() => setResult(null)} />
      ) : (
        <MatchForm
          jobPost={jobPost}
          resume={resume}
          onJobPostChange={setJobPost}
          onResumeChange={setResume}
          onResult={showResult}
        />
      )}
    </ToolPage>
  )
}
