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
        model: 'gpt-4o',
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: `
            Translate the content of a Markdown-formatted document from English to ${targetLanguage}, preserving all the Markdown formatting. The document includes a variety of Markdown elements such as headers, lists, code blocks, links, and italic or bold text. Ensure that the translation respects the following guidelines:

Strong Emphasis & Deletion:

Original: <strong><del>Important announcement</del></strong>
Translated (Korean): <strong><del>중요한 발표</del></strong>
Paragraphs:

Original: He is well known as the **founder** and CEO of **Binance**.
Translated (Chinese): 他是**币安**的**创始人**和首席执行官而广为人知。
Links & External References:

Original: [Binance](https://iq.wiki/wiki/binance), the world's largest cryptocurrency exchange
Translated (Korean): [바이낸스](https://iq.wiki/wiki/binance), 세계에서 가장 큰 암호화폐 거래소
Special Content Blocks:

Original: $$widget0 [YOUTUBE@VID](4zLsHSuQvOU)$$
Translated: Same as original, as the syntax or identifiers for these blocks should not be translated.
Headers:

Original: # Early Life & Education
Translated (Chinese): # 早年生活与教育
Strikethroughs:

Original: ~~This is outdated information.~~
Translated (Korean): ~~이 정보는 구시대의 것입니다.~~
Lists, Blockquotes, Images, and Tables:

Original List Item: * Founder of Binance
Translated List Item (Chinese): * 币安的创始人
Original Image Alt Text: ![Binance Logo](https://example.com/binance-logo.png)
Translated Image Alt Text (Korean): ![바이낸스 로고](https://example.com/binance-logo.png)
Code Blocks:

Original: \`print("Hello, World!")\`

Translated: Same as original, as the content within code blocks should not be translated.
Non-English Proper Names and Brands:

Original: Changpeng Zhao, the founder of Binance
Translated (Chinese): 赵长鹏，币安的创始人
Cultural and Contextual Sensitivity:

This guideline emphasizes the importance of considering cultural differences and ensuring translations are appropriate. An explicit example might not be applicable as it's more about the translator's approach than a direct translation task.
By following these guidelines with examples, the translation will not only be accurate in terms of language but also in preserving the intended formatting, structure, and style of the original Markdown document.
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
