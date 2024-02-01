import { getWikiChunks } from '@/utils/WikiUtils/getWikiChunks'
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { content, title } = req.body
  if (!content || !title)
    return res.status(400).json({ msg: 'Title or content is missing ' })
  const chunks = getWikiChunks(content)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const [translatedTitle, ...translatedTexts] = await Promise.all(
    chunks.map(async (chunk: string) => {
      return openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You will be provided with a peice of markdown text in English. Your task is to translate it into Korean, preserving the formatting. Note the following:
              1. Any peice of text surrounded by double asterisks should be immediately fellowed by a space. 
              For example: **ABC**D becomes **ABC** D .Where A, B, C are letters in Korean.
              Example 2: **리플 (Ripple)**은 becomes **리플 (Ripple)** 은 
              `,
          },
          {
            role: 'user',
            content: chunk,
          },
        ],
      })
    }),
  )

  const translatedContent = [translatedTitle, ...translatedTexts].map(
    (result) => result.choices[0].message.content,
  )

  console.log('Content: ', translatedContent.join('\n\n'))
  return res.json({ content: translatedContent })
}
