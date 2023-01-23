import { generateSummary } from '@/utils/autoGenerateSummary'
import rateLimit from '@/utils/rate-limit'
import { sanitizeContent } from '@/utils/sanitizeContent'
import type { NextApiRequest, NextApiResponse } from 'next'

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const { content, title, isAboutPerson } = req.body

  try {
    await limiter.check(res, 5, 'CACHE_TOKEN') // 5 requests per minute

    const sanitizedContent = sanitizeContent(content)

    const summary = await generateSummary(
      sanitizedContent,
      title,
      isAboutPerson,
    )

    if (!summary) return res.status(500).send('Summary generation failed')
    return res.status(200).send(summary)
  } catch {
    return res.status(429).send('Rate limit exceeded')
  }
}
