import { env } from '@/env.mjs'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { feedback, contact } = req.body

  if (!feedback) {
    return res.status(400).json({ error: 'Feedback is required' })
  }

  const webHookURL = `https://discord.com/api/webhooks/${env.DISCORD_WEBHOOK_ID}/${env.DISCORD_WEBHOOK_TOKEN}`

  try {
    const discordResponse = await fetch(webHookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'IQ.Wiki',
        content:
          'Hi <@855035222969679902> \n\ncc <@841092527633072128> , <@1245330291938033796>',
        embeds: [
          {
            title: 'New Wiki Suggestion',
            description: `Check out the latest Wiki suggestions ${
              contact ? `from ${contact}` : ' from Anonymous'
            }
            ${feedback}`,
          },
        ],
      }),
    })

    if (discordResponse.ok) {
      return res.status(200).json({ message: 'Feedback sent successfully' })
    } else {
      throw new Error('Failed to send feedback to Discord')
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}
