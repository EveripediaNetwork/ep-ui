import config from '@/config'
import { Dict } from '@chakra-ui/utils'
import axios from 'axios'

export const submitVerifiableSignature = async (
  signedData: string,
  wikiHash: string,
  address: string,
  deadline: number,
): Promise<Dict> => {
  const signature = signedData.substring(2)
  const r = `0x${signature.substring(0, 64)}`
  const s = `0x${signature.substring(64, 128)}`
  const v = parseInt(signature.substring(128, 130), 16)

  try {
    return await axios.post(`${config.epApiBaseUrl}relayer`, {
      ipfs: wikiHash,
      userAddr: address,
      deadline,
      v,
      r,
      s,
    })
  } catch (error) {
    return error as Dict
  }
}
