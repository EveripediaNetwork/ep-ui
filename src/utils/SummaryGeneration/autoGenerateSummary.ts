/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import { GPT3_MAX_TRIES } from '@/data/Constants'
import axios, { AxiosError } from 'axios'
import { GPT3Completion } from '@/types/GPT3'
import { logExecutionSummary } from './logSummaryGeneration'

export const generateSummary = async (
  content: string,
  title: string,
  isAboutPerson = false,
) => {
  let validChoices: string[] = []
  let completion: GPT3Completion
  let allGeneratedSummaries: string[] = []
  let tries = 0

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
      Generate a wikipedia style summary on topic "${
        isAboutPerson ? 'who' : 'what'
      } is ${title} ?". IT MUST BE UNDER 210 CHARACTERS.`,
    max_tokens: 255,
    n: 3,
  }

  try {
    do {
      tries += 1
      completion = await axios.post(
        'https://api.openai.com/v1/completions',
        requestBody,
        requestConfig,
      )
      const choices = completion.data.choices.map(c => c.text as string)
      validChoices = choices.filter(c => c.length <= 255)
      allGeneratedSummaries = [...allGeneratedSummaries, ...choices]
    } while (validChoices.length === 0 && tries <= GPT3_MAX_TRIES)

    logExecutionSummary(content, allGeneratedSummaries, tries, completion)
  } catch (e) {
    const { response } = e as AxiosError
    console.error(response?.data.error)
  }

  if (!validChoices) return undefined
  return validChoices.map(c => c.trim().replaceAll('\\n', ' '))
}
