import { Router } from 'express'
import { MatchInput } from '../ai/schemas.js'
import { analyze } from '../ai/analyze.js'
import { isMock } from '../ai/client.js'
import { SAMPLE_RESUME } from '../ai/mock.js'
import { scoreMatch } from '../ai/rubric.js'

export const matchRouter = Router()

matchRouter.post('/', async (req, res) => {
  const input = MatchInput.safeParse(req.body)
  if (!input.success) {
    res.status(400).json({ error: input.error.issues[0]?.message ?? 'Please check your input.' })
    return
  }
  const analysis = await analyze(input.data.jobPost, input.data.resume)
  // Mock evidence quotes come from the sample resume, so check against that one.
  res.json(scoreMatch(analysis, isMock ? SAMPLE_RESUME : input.data.resume))
})
