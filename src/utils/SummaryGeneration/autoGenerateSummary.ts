/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import { WIKI_SUMMARY_LIMIT } from '@/data/Constants'
import axios, { AxiosError } from 'axios'

const COST_PER_1K_TOKENS = 0.02
const MAX_TRIES = 3

export const generateSummary = async (
  content: string,
  title: string,
  isAboutPerson = false,
) => {
  let summary: string | undefined
  let tries = 0
  let totalTokensUsed = 0

  const requestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  }
  const requestBody = {
    model: 'text-davinci-003',
    prompt: `
      Content about ${title}:
      ${content}
      Generate a generalized summary on topic "${
        isAboutPerson ? 'who' : 'what'
      } is ${title} ?". IT MUST BE UNDER 210 CHARACTERS.`,
    max_tokens: 255,
  }

  try {
    do {
      const completion = (
        await axios.post(
          'https://api.openai.com/v1/completions',
          requestBody,
          requestConfig,
        )
      ).data

      summary = completion.choices[0].text
      totalTokensUsed += completion.usage?.total_tokens || 0
      tries += 1
    } while (
      summary &&
      summary?.length > WIKI_SUMMARY_LIMIT &&
      tries < MAX_TRIES
    )
  } catch (e) {
    const { response } = e as AxiosError
    console.error(response?.data.error)
  }
  if (!summary) return undefined

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
