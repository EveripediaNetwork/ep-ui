import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { feedbackType, messageId } = JSON.parse(req.body)
  try {
    const result = await axios.post('https://chat.iqgpt.com/api/feedback', {
      messageId,
      feedbackType,
    })

    return res.status(result.status).json(result.data)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}
