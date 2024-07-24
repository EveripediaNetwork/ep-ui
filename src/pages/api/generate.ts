import { env } from '@/env.mjs'
import { generateOutputSchema } from '@/hooks/useStream/schema'
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
    const response = await fetch('https://chat.iqgpt.com/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-key': `${env.BOT_API_KEY}`,
      },
      body: JSON.stringify(requestObject),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    if (!response.body) {
      return res.status(500).send('Empty response body from the API')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let result = ''
    let finalOutput = null

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      const chunk = decoder.decode(value)
      result += chunk
    }

    const lines = result.split('\n').slice(1)
    for (const line of lines) {
      const eventMatch = line.match(/^event: (.*)$/)
      if (!eventMatch) continue

      const event = eventMatch[1]
      const dataLine = lines[lines.indexOf(line) + 1]

      if (dataLine?.startsWith('data: ')) {
        let data
        try {
          const dataContent = dataLine.slice(6).trim()
          data = JSON.parse(dataContent)
        } catch (error) {
          console.error('Error parsing data:', error)
          continue
        }
        if (event === 'FINAL_OUTPUT') {
          finalOutput = data
          break
        }
      }
    }

    if (!finalOutput) {
      return res
        .status(500)
        .send('FINAL_OUTPUT event not found in the response')
    }
    const parsedData = generateOutputSchema.safeParse(finalOutput)

    if (!parsedData.success) {
      console.error('Error parsing the response:', parsedData.error)
      return res.status(500).send('Error parsing the response')
    }

    const { search, answer, answerSources, messageId, duration, chat } =
      parsedData.data
    return res.status(200).json({
      search,
      answer,
      answerSources,
      messageId,
      duration,
      chat,
    })
  } catch (error) {
    console.error('Error:', error)
    return res
      .status(500)
      .send('An error occurred while processing the request')
  }
}
