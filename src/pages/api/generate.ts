import { env } from '@/env.mjs'
// import {
// GenerateOutput,
// generateEventsSchema,
//   generateOutputSchema,
// } from '@/hooks/useStream/schema'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { question } = req.body

  if (!question) {
    return res.status(400).send('Question is required')
  }

  if (question === 'Ask me about crypto') {
    return res.status(200).json({
      answer:
        'I can assist you with any questions about crypto. What would you like to ask?',
      search: question,
    })
  }
  const requestObject = {
    enableStream: true,
    search: question,
    language: 'en',
    isChat: true,
  }

  try {
    const response = await fetch('https://iqgpt.com/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-key': `${env.NEXT_PUBLIC_BOT_API_KEY}`,
      },
      body: JSON.stringify(requestObject),
    })
    if (!response.body) {
      return res.status(500).send('Something went wrong')
    }
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let result = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      result += decoder.decode(value, { stream: true })
      console.log('result', result)
    }
  } catch (error) {
    console.error('Error reading the stream: ', error)
    return res.status(500).send('Error reading the stream')
  }
}
