import axios from 'axios'
import { Wiki } from '@/types/Wiki'

const pinJSONToPinata = async (payload: Wiki): Promise<string> => {
  const body = {
    pinataMetadata: {
      name: payload.title,
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

export default async (req: any, res: any) => {
  const IpfsHash = await pinJSONToPinata(req.body)
  res.status(200).json({ ipfs: IpfsHash })
}
