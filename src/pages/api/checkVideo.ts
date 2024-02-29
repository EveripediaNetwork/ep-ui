import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { url } = req.query as { url: string }
  let isUnavailable
  if (!url) {
    return res.status(400).json({
      error: 'Please provide a YouTube video URL',
      isUnavailable: true,
    })
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {},
    })

    const text = await response.text()
    isUnavailable = text.includes('Video unavailable')

    res.status(200).json({ isUnavailable })
  } catch (error) {
    console.error('Error fetching video page:', error)
    res
      .status(500)
      .json({ error: 'Error fetching video page', isUnavailable: true })
  }
}
