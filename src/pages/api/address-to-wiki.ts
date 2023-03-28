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
      return res.status(200).json(ress.addressToWiki.map(w => w.wiki))
    }
  } catch (e) {
    return res.status(500).json({ error: 'an error occurred' })
  }
}
