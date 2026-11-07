import OpenAI from 'openai'
import { zodTextFormat } from 'openai/helpers/zod'
import type { z } from 'zod'

export const isMock = process.env.AI_MOCK === '1'

// Errors whose message is safe to show the user; the error handler sends them as 503.
export class AIBusyError extends Error {}

let client: OpenAI | undefined
const getClient = () => (client ??= new OpenAI({ timeout: 45_000, maxRetries: 1 }))

// Runs one structured-output call; the schema fixes the exact JSON shape that comes back.
export async function askAI<T extends z.ZodType>(instructions: string, input: string, schema: T, name: string): Promise<z.infer<T>> {
  try {
    const response = await getClient().responses.parse({
      model: process.env.OPENAI_MODEL ?? '',
      instructions,
      input,
      text: { format: zodTextFormat(schema, name) },
    })
    if (!response.output_parsed) throw new AIBusyError('The AI could not read this text. Please try again.')
    return response.output_parsed as z.infer<T>
  } catch (error) {
    if (error instanceof OpenAI.APIConnectionError) {
      throw new AIBusyError('Could not reach the AI service. Please try again.')
    }
    if (error instanceof OpenAI.APIError && (error.status === 429 || (error.status ?? 0) >= 500)) {
      throw new AIBusyError('The AI service is busy. Please try again in a minute.')
    }
    // Logs only the status, since OpenAI auth errors echo part of the key.
    if (error instanceof OpenAI.APIError) throw new Error(`OpenAI request failed with status ${error.status}`, { cause: error })
    throw error
  }
}
