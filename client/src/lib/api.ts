import type { Answer, BulletQuestions, MatchResult, RewriteResult } from './types.ts'

// Empty in development (Vite proxies /api); set VITE_API_URL to the deployed server URL.
const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function postJson<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('Could not reach Job Kit. Check your internet connection and try again.', { cause: error })
  }

  const data: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data && typeof data === 'object' && 'error' in data ? String(data.error) : ''
    throw new Error(message || 'Something went wrong. Please try again.')
  }
  return data as T
}

export const checkMatch = (jobPost: string, resume: string) => postJson<MatchResult>('/api/match', { jobPost, resume })

export const getQuestions = (bullet: string, jobTitle: string, signal?: AbortSignal) =>
  postJson<BulletQuestions>('/api/rewrite/questions', { bullet, jobTitle }, signal)

export const rewriteBullet = (bullet: string, jobTitle: string, answers: Answer[]) =>
  postJson<RewriteResult>('/api/rewrite', { bullet, jobTitle, answers })
