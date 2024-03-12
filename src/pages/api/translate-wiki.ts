import { SupportedLanguages } from '@/store/slices/app-slice'
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
            content: `A peice of markdown will be provided after the keyword 'START'. Translate the peiece of markdown text to ${targetLanguage}, using the following rules:
  1. Do not translate names of people or organizations to ${targetLanguage}
  2. Any peice of characters that start and end with double asterisks(**) should be immediately fellowed by an empty space( ).
  For example, **리플 (Ripple)**은 should be replaced with **리플 (Ripple)** 은
  Explanation:
  the text 리플 (ripple) in **리플 (ripple)**은 starts and begins with double asterisks (**), hence add a space immediately after the ending asterisks before adding the next character.
  That is, immediately after **리플 (ripple)**, add space before 은

  Example 2
  The text 아컴 인텔리전스 (Arkham Intelligence) in **아컴 인텔리전스 (Arkham Intelligence)**는 should be replaced with **아컴 인텔리전스 (Arkham Intelligence)** 는
  Explanation:
  the text 아컴 인텔리전스 (Arkham Intelligence) in **아컴 인텔리전스 (Arkham Intelligence)**는 starts and begins with double asterisks (**), hence add a space immediately after the ending double asterisks before adding the next character.
  That is, immediately after **아컴 인텔리전스 (Arkham Intelligence)**, add space before 는

  Example 4
  **컨버전스 (Convergence)**는 should be replaced with **컨버전스 (Convergence)** 는

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
