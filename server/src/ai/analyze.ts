import { askAI, isMock } from './client.js'
import { Analysis } from './schemas.js'
import { MATCH_PROMPT, buildMatchInput } from './prompts.js'
import { SAMPLE_ANALYSIS } from './mock.js'

export async function analyze(jobPost: string, resume: string): Promise<Analysis> {
  if (isMock) return SAMPLE_ANALYSIS
  return askAI(MATCH_PROMPT, buildMatchInput(jobPost, resume), Analysis, 'match_analysis')
}
