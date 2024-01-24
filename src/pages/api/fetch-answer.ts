import { env } from '@/env.mjs'
import {
  GenerateOutput,
  generateEventsSchema,
  generateOutputSchema,
} from '@/hooks/useStream/schema'
import {
  EventSourceMessage,
  fetchEventSource,
} from '@fortaine/fetch-event-source'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question } = req.body

  const handleMessage = async (
    msg: EventSourceMessage,
    resolver: (output: GenerateOutput) => void,
  ) => {
    if (msg.event === generateEventsSchema.Enum.FINAL_OUTPUT) {
      const result = generateOutputSchema.parse(JSON.parse(msg.data))
      resolver(result)
    }
  }

  if (!question) {
    return res.status(401).send('Invalid Request, check payload')
  }

  const requestObject = {
    enableStream: true,
    search: question,
    language: 'en',
    isChat: true,
  }

  console.log(requestObject)

  const result = await new Promise<GenerateOutput>((resolve) => {
    fetchEventSource('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify(requestObject),
      headers: {
        Cookie: `x-auth-key=${env.BOT_AUTH_KEY}`,
      },
      onmessage: async (msg) => {
        handleMessage(msg, resolve)
      },
    })
  })

  return res.status(200).send(JSON.stringify(result))
}
