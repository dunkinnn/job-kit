import { z } from 'zod'

const pastedText = (label: string) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(50, `${label} looks too short. Paste the full text.`)
    .max(8000, `${label} is too long. Keep it under 8,000 characters.`)

export const MatchInput = z.object({
  jobPost: pastedText('The job post'),
  resume: pastedText('Your resume'),
})

// Shape the AI must return; the score itself is computed in rubric.ts, not by the AI.
export const Analysis = z.object({
  jobTitle: z.string(),
  requiredSkills: z.array(
    z.object({
      skill: z.string(),
      status: z.enum(['found', 'partial', 'missing']),
      evidence: z.string(),
    }),
  ),
  projects: z.object({ rating: z.enum(['strong', 'some', 'weak', 'none']), reason: z.string() }),
  results: z.object({
    rating: z.enum(['strong', 'some', 'weak']),
    reason: z.string(),
    weakBullets: z.array(z.string()),
  }),
  format: z.object({ rating: z.enum(['clear', 'okay', 'messy']), reason: z.string() }),
  strengths: z.array(z.string()),
  summary: z.string(),
})

export type Analysis = z.infer<typeof Analysis>

const shortText = (label: string, max: number) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(5, `${label} is too short.`)
    .max(max, `${label} is too long. Keep it under ${max} characters.`)

export const QuestionsInput = z.object({
  bullet: shortText('The bullet point', 300),
  jobTitle: z.string().trim().max(80, 'The job title is too long.').default(''),
})

const AnswerSchema = z.object({ question: z.string().max(200), answer: z.string().trim().max(300, 'An answer is too long.') })
export type Answer = z.infer<typeof AnswerSchema>

export const RewriteInput = QuestionsInput.extend({
  answers: z.array(AnswerSchema).max(3, 'Send up to 3 answers.').default([]),
})

export const BulletQuestions = z.object({
  whyWeak: z.string(),
  questions: z.array(z.object({ question: z.string(), kind: z.enum(['number', 'text']) })),
})
export type BulletQuestions = z.infer<typeof BulletQuestions>

export const Suggestion = z.object({ suggestion: z.string() })
