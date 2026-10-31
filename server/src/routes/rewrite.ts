import { Router } from 'express'
import { QuestionsInput, RewriteInput } from '../ai/schemas.js'
import { getQuestions, rewriteBullet } from '../ai/rewrite.js'

export const rewriteRouter = Router()

rewriteRouter.post('/questions', async (req, res) => {
  const input = QuestionsInput.safeParse(req.body)
  if (!input.success) {
    res.status(400).json({ error: input.error.issues[0]?.message ?? 'Please check your input.' })
    return
  }
  res.json(await getQuestions(input.data.bullet, input.data.jobTitle))
})

rewriteRouter.post('/', async (req, res) => {
  const input = RewriteInput.safeParse(req.body)
  if (!input.success) {
    res.status(400).json({ error: input.error.issues[0]?.message ?? 'Please check your input.' })
    return
  }
  res.json(await rewriteBullet(input.data.bullet, input.data.jobTitle, input.data.answers))
})
