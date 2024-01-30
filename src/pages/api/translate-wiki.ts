import { getWikiChunks } from '@/utils/WikiUtils/getWikiChunks'
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { content, title } = req.body
  let chunks = getWikiChunks(content)
  chunks = [title, ...chunks]
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const [translatedTitle, ...translatedTexts] = await Promise.all(
    chunks.map(async (chunk: string) => {
      return openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You will be provided with a peice of markdown text in English, and your task is to translate it into Korean. If the name of an individual is provided, return the name as is',
          },
          {
            role: 'user',
            content: chunk,
          },
        ],
      })
    }),
  )

  const [koreanTitle, ...koreanTexts] = [
    translatedTitle,
    ...translatedTexts,
  ].map((result) => result.choices[0].message.content)

  return res.json({ title: koreanTitle, content: koreanTexts })
}
