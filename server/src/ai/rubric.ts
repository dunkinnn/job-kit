import type { Analysis } from './schemas.js'

export const RUBRIC_VERSION = 'draft-1'

// DRAFT weights; replace with what the recruiter interview shows matters most.
const WEIGHTS = { skills: 0.5, projects: 0.25, results: 0.15, format: 0.1 }
const PROJECTS = { strong: 1, some: 0.6, weak: 0.3, none: 0 }
const RESULTS = { strong: 1, some: 0.6, weak: 0.2 }
const FORMAT = { clear: 1, okay: 0.6, messy: 0.2 }
const LABELS: Record<string, string> = {
  strong: 'Strong', some: 'Some', weak: 'Weak', none: 'None', clear: 'Clear', okay: 'Okay', messy: 'Messy',
}

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

const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, ' ').trim()

// True only when the quote really appears in the resume, so the AI cannot invent evidence.
const inResume = (quote: string, resume: string) => {
  const needle = normalize(quote)
  return needle.length >= 3 && resume.includes(needle)
}

const percent = (value: number) => Math.round(value * 100)

export function scoreMatch(analysis: Analysis, resumeText: string): MatchResult {
  const resume = normalize(resumeText)
  const skills = analysis.requiredSkills
    .slice(0, 10)
    .map((skill) => (skill.status !== 'missing' && !inResume(skill.evidence, resume) ? { ...skill, status: 'missing' as const } : skill))

  const found = skills.filter((skill) => skill.status === 'found').length
  const partial = skills.filter((skill) => skill.status === 'partial')
  const skillValue = skills.length ? (found + partial.length * 0.5) / skills.length : 0.5
  const projectValue = PROJECTS[analysis.projects.rating]
  const resultValue = RESULTS[analysis.results.rating]
  const formatValue = FORMAT[analysis.format.rating]

  const score = Math.round(
    100 *
      (WEIGHTS.skills * skillValue + WEIGHTS.projects * projectValue + WEIGHTS.results * resultValue + WEIGHTS.format * formatValue),
  )

  return {
    rubricVersion: RUBRIC_VERSION,
    jobTitle: analysis.jobTitle,
    score,
    summary: analysis.summary,
    rows: [
      {
        label: 'Required skills',
        value: skills.length ? `${found} of ${skills.length}` : 'None listed',
        percent: percent(skillValue),
        reason: partial.length ? `${partial.length} more only partly shown.` : '',
      },
      { label: 'Relevant projects', value: LABELS[analysis.projects.rating] ?? '', percent: percent(projectValue), reason: analysis.projects.reason },
      { label: 'Results in bullet points', value: LABELS[analysis.results.rating] ?? '', percent: percent(resultValue), reason: analysis.results.reason },
      { label: 'Clear format', value: LABELS[analysis.format.rating] ?? '', percent: percent(formatValue), reason: analysis.format.reason },
    ],
    missing: skills.filter((skill) => skill.status === 'missing').map((skill) => skill.skill),
    partial: partial.map((skill) => skill.skill),
    strengths: analysis.strengths.slice(0, 3),
    weakBullets: analysis.results.weakBullets.filter((bullet) => inResume(bullet, resume)).slice(0, 3),
  }
}
