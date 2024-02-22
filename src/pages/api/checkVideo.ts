import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //cast as string
  const { url } = req.query as { url: string }
  let isUnavailable
  console.log('url', url)
  if (!url) {
    return res.status(400).json({
      error: 'Please provide a YouTube video URL',
      videoUnavailable: true,
    })
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {},
    })

    const text = await response.text()
    console.log('text', text.slice(0, 50))
    isUnavailable = text.includes('Video unavailable')

    res.status(200).json({ videoUnavailable: isUnavailable })
  } catch (error) {
    console.error('Error fetching video page:', error)
    res
      .status(500)
      .json({ error: 'Error fetching video page', videoUnavailable: true })
  }
}
