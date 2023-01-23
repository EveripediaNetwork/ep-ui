import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import { Configuration, OpenAIApi } from 'openai'

const COST_PER_1K_TOKENS = 0.02
const MAX_TRIES = 3

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const generateSummary = async (
  content: string,
  title: string,
  isAboutPerson = false,
) => {
  let summary: string | undefined
  let tries = 0
  let totalTokensUsed = 0

  do {
    // eslint-disable-next-line no-await-in-loop
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
      Content about ${title}:
      ${content} 
      Generate a generalized summary on topic "${
        isAboutPerson ? 'who' : 'what'
      } is ${title} ?". IT MUST BE UNDER 210 CHARACTERS.
    `,
      max_tokens: 255,
    })
    summary = completion.data.choices[0].text
    totalTokensUsed += completion.data.usage?.total_tokens || 0
    tries += 1
  } while (summary && summary?.length > WIKI_SUMMARY_LIMIT)

  if (!summary) return undefined

  // eslint-disable-next-line no-console
  console.log(`
------------------------------
💨 Execution Summary:
------------------------------
📝 INPUT LENGTH: ${content.length}
📝 SUMMARY LENGTH: ${summary.length}  (should be 255 max)
🔁 TRIES: ${tries} (${MAX_TRIES} max)
🎟️ TOTAL TOKENS USED: ${totalTokensUsed}
🏦 TOTAL COST: $${(totalTokensUsed * COST_PER_1K_TOKENS) / 1000}
`)
  return summary
}
