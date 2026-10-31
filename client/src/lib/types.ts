// Mirrors MatchResult in server/src/ai/rubric.ts; keep the two in sync.
export type RubricRow = { label: string; value: string; percent: number; reason: string }

export type MatchResult = {
  rubricVersion: string
  jobTitle: string
  score: number
  summary: string
  rows: RubricRow[]
  missing: string[]
  partial: string[]
  strengths: string[]
  weakBullets: string[]
}

// Mirrors the rewriter shapes in server/src/ai/schemas.ts and rewrite.ts.
export type BulletQuestions = {
  whyWeak: string
  questions: { question: string; kind: 'number' | 'text' }[]
}

export type Answer = { question: string; answer: string }

export type RewriteResult = { suggestion: string; removedNumbers: boolean }
