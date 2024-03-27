import { env } from '@/env.mjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type ResponseData = {
  status: boolean
  message: string
  response?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const { tokenName } = req.query
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tokenName}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': env.CMC_API_KEY,
        },
      },
    )
    res.setHeader('Cache-Control', 's-maxage=120')
    return res.status(200).json({
      response: response.data,
      status: true,
      message: 'token details successfully fetched',
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    return res.status(500).json({
      status: false,
      message: 'Error fetching token details',
    })
  }
}
