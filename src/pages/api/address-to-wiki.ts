/* eslint-disable consistent-return */
import { addressToWiki } from '@/services/address-to-wiki'
import type { NextApiRequest, NextApiResponse } from 'next'

interface AddressToWikiRes {
  addressToWiki: {
    wiki: string
  }[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { address } = req.query

  try {
    const ress = (await addressToWiki(address as string)) as AddressToWikiRes
    if (ress) {
      return res
        .status(200)
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PUT, DELETE, OPTIONS',
        )
        .setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        )
        .json(ress.addressToWiki.map(w => w.wiki))
    }
  } catch (_e) {
    return res.status(500).json({ error: 'an error occurred' })
  }
}
