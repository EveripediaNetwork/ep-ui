import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { feedbackType, messageId } = JSON.parse(req.body)
  try {
    const result = await fetch('http://localhost:3000/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        feedbackType: feedbackType,
        messageId: messageId,
      }),
    })

    if (result) return res.status(200).json(result.json())
  } catch (_err) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
