import { SupportedLanguages } from '@/data/LanguageData'
import { getWikiChunks } from '@/utils/WikiUtils/getWikiChunks'
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

type supportedLanguagesWithoutEn = Exclude<SupportedLanguages, 'en'>
const symbolLanguageMap: Record<supportedLanguagesWithoutEn, string> = {
  ko: 'Korean',
  zh: 'Chinese',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { content, title } = req.body
  const lang = req.body.lang as supportedLanguagesWithoutEn
  if (!content || !title)
    return res.status(400).json({ msg: 'Title or content is missing ' })
  const chunks = getWikiChunks(content)
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const targetLanguage = symbolLanguageMap[lang]
  const [translatedTitle, ...translatedTexts] = await Promise.all(
    chunks.map(async (chunk: string) => {
      return openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: `A piece of markdown will be provided after the keyword 'START'. Translate the peiece of markdown text to ${targetLanguage}, using the following rules:
  1. Do not translate names of people or organizations to ${targetLanguage}
  2. Any piece of characters that start and end with double asterisks(**) should be immediately fellowed by an empty space( ).

  START:
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

  return res.json({ content: translatedContent })
}
