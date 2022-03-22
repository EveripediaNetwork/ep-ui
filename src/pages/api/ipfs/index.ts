import { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'ipfs-http-client'
import axios from 'axios'
import { Wiki } from '@/types/Wiki'

const pinToPinata = async (payload: Wiki): Promise<string> => {
  const body = {
    pinataMetadata: {
      name: (<Wiki>payload).content !== undefined ? payload.title : 'image',
    },
    pinataContent: {
      ...payload,
    },
  }
  const resp = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    body,
    {
      headers: {
        pinata_api_key: process.env.PINATA_KEY || '',
        pinata_secret_api_key: process.env.PINATA_SECRET || '',
      },
    },
  )

  const data = resp.data as {
    IpfsHash: string
    PinSize: number
    Timestamp: string
  }
  return data.IpfsHash
}

const pinToIPFS = async (payload: Wiki | Partial<Wiki>): Promise<string> => {
  const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' })
  const { cid } = await ipfs.add(JSON.stringify(payload))
  return cid.toString()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const IpfsHash = process.env.PROD
    ? await pinToPinata(req.body)
    : await pinToIPFS(req.body)

  res.status(200).json({ ipfs: IpfsHash })
}
