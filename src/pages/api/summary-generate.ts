import {
  WIKI_SUMMARY_GEN_RATE_LIMIT_INTERVAL,
  WIKI_SUMMARY_GEN_RATE_LIMIT_MAX_REQUESTS,
} from '@/data/Constants'
import { generateSummary } from '@/utils/autoGenerateSummary'
import rateLimit from '@/utils/rate-limit'
import { sanitizeContent } from '@/utils/sanitizeContent'
import type { NextApiRequest, NextApiResponse } from 'next'

const limiter = rateLimit({
  interval: WIKI_SUMMARY_GEN_RATE_LIMIT_INTERVAL,
  uniqueTokenPerInterval: 500, // Max 500 users per interval
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const { content, title, isAboutPerson } = req.body

  try {
    await limiter.check(
      res,
      WIKI_SUMMARY_GEN_RATE_LIMIT_MAX_REQUESTS,
      'CACHE_TOKEN',
    ) // 5 requests per interval per user
  } catch {
    return res.status(429).send('Rate limit exceeded')
  }

  const sanitizedContent = sanitizeContent(content)

  try {
    const summary =
      'ok' || (await generateSummary(sanitizedContent, title, isAboutPerson))

    if (!summary) return res.status(500).send('Summary generation failed')

    return res.status(200).send(summary)
  } catch (e) {
    return res.status(500).send('OpenAI request failed')
  }
}
