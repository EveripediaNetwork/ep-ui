import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const { _feedbackType, _messageId } = JSON.parse(req.body)
  console.log(req.body)
  try {
    const result = await fetch('https://www.iqgpt.com/api/feedback', {
      method: 'POST',
      body: req.body,
    })

    if (result) return res.status(200).json(result.json())
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
