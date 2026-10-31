import { askAI, isMock } from './client.js'
import { BulletQuestions, Suggestion, type Answer } from './schemas.js'
import { QUESTIONS_PROMPT, REWRITE_PROMPT, buildRewriteInput } from './prompts.js'
import { SAMPLE_QUESTIONS, SAMPLE_SUGGESTION } from './mock.js'

export type RewriteResult = { suggestion: string; removedNumbers: boolean }

const NUMBER_WORDS: Record<string, string> = {
  one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: '10',
  eleven: '11', twelve: '12', fifteen: '15', twenty: '20', thirty: '30', fifty: '50', hundred: '100',
}

// Collects every number the user actually gave, including ones written as words.
function givenNumbers(sources: string): Set<string> {
  const words = sources.toLowerCase().match(/[a-z]+/g) ?? []
  const digits = sources.replace(/(\d),(\d)/g, '$1$2').match(/\d+/g) ?? []
  return new Set([...digits, ...words.flatMap((word) => NUMBER_WORDS[word] ?? [])])
}

// Swaps any number the AI added on its own for a [number] blank the user must fill in.
export function removeUnsupportedNumbers(suggestion: string, sources: string): RewriteResult {
  const allowed = givenNumbers(sources)
  let removedNumbers = false
  const cleaned = suggestion.replace(/\d[\d,.]*\+?%?/g, (match) => {
    if (allowed.has(match.replace(/[^\d.]/g, '').replace(/\.$/, ''))) return match
    removedNumbers = true
    return '[number]'
  })
  return { suggestion: cleaned, removedNumbers }
}

export async function getQuestions(bullet: string, jobTitle: string): Promise<BulletQuestions> {
  const result = isMock
    ? SAMPLE_QUESTIONS
    : await askAI(QUESTIONS_PROMPT, buildRewriteInput(bullet, jobTitle), BulletQuestions, 'bullet_questions')
  return { ...result, questions: result.questions.slice(0, 3) }
}

export async function rewriteBullet(bullet: string, jobTitle: string, answers: Answer[]): Promise<RewriteResult> {
  const answered = answers.filter((answer) => answer.answer)
  const suggestion = isMock
    ? SAMPLE_SUGGESTION
    : (await askAI(REWRITE_PROMPT, buildRewriteInput(bullet, jobTitle, answered), Suggestion, 'bullet_suggestion')).suggestion
  return removeUnsupportedNumbers(suggestion, [bullet, ...answered.map((answer) => answer.answer)].join(' '))
}
