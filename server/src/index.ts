import express, { type ErrorRequestHandler } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { matchRouter } from './routes/match.js'
import { rewriteRouter } from './routes/rewrite.js'
import { AIBusyError, isMock } from './ai/client.js'

const port = Number(process.env.PORT ?? 3001)
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173'

// Fails at startup so a missing key is caught before the first request.
if (!isMock && (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL)) {
  console.error('Set OPENAI_API_KEY and OPENAI_MODEL in server/.env, or AI_MOCK=1 for sample results.')
  process.exit(1)
}

const app = express()
// Hosts like Render sit behind a proxy, so the rate limit needs the real client IP.
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: clientOrigin }))
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mock: isMock })
})

// Caps AI calls per visitor to protect API credits; the rewriter makes two calls per bullet.
const perVisitor = (limit: number) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Too many requests in a short time. Please wait a few minutes and try again.' },
  })
app.use('/api/match', perVisitor(10), matchRouter)
app.use('/api/rewrite', perVisitor(30), rewriteRouter)

// Never sends error details to the client; request bodies are never logged.
const onError: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AIBusyError) {
    res.status(503).json({ error: err.message })
    return
  }
  const status = typeof err?.status === 'number' && err.status >= 400 && err.status < 500 ? err.status : 500
  if (status === 500) console.error(err instanceof Error ? err.message : 'Unknown error')
  res.status(status).json({ error: status === 500 ? 'Something went wrong. Please try again.' : 'Invalid request.' })
}
app.use(onError)

app.listen(port, () => {
  console.log(`API running on http://localhost:${port} (${isMock ? 'mock AI' : `model: ${process.env.OPENAI_MODEL}`})`)
})
