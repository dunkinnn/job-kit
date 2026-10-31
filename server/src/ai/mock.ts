import type { Analysis, BulletQuestions } from './schemas.js'

// Sample data for AI_MOCK=1, so the UI can be built without spending API credits.
export const SAMPLE_RESUME = `Juan Dela Cruz - Junior Web Developer
Projects: Built a capstone enrollment system in React.
Made a website for our capstone.
Skills: HTML, CSS, JavaScript, React, MySQL
OJT: IT support intern at the municipal office.`

export const SAMPLE_ANALYSIS: Analysis = {
  jobTitle: 'Junior Web Developer',
  requiredSkills: [
    { skill: 'React', status: 'found', evidence: 'Built a capstone enrollment system in React.' },
    { skill: 'JavaScript', status: 'found', evidence: 'HTML, CSS, JavaScript, React, MySQL' },
    { skill: 'SQL databases', status: 'found', evidence: 'MySQL' },
    { skill: 'Git', status: 'missing', evidence: '' },
    { skill: 'REST APIs', status: 'missing', evidence: '' },
  ],
  projects: { rating: 'strong', reason: 'Your capstone is a real web app close to this role.' },
  results: {
    rating: 'weak',
    reason: 'Most bullets say what you did, not what changed.',
    weakBullets: ['Made a website for our capstone.'],
  },
  format: { rating: 'clear', reason: 'Sections are short and easy to scan.' },
  strengths: ['Capstone built with React, which the post lists first', 'OJT in an IT office counts as work experience here'],
  summary: 'Your capstone fits this role well, but the post asks for two skills your resume does not show yet.',
}

export const SAMPLE_QUESTIONS: BulletQuestions = {
  whyWeak: "It doesn't say what you built, who used it, or what changed.",
  questions: [
    { question: 'What did the website do?', kind: 'text' },
    { question: 'About how many people used it?', kind: 'number' },
    { question: 'What did you build it with?', kind: 'text' },
  ],
}

// Contains 150 on purpose, so mock mode shows the invented-number check at work.
export const SAMPLE_SUGGESTION = 'Built a React web app used by 150+ students for enrollment tracking.'
