import config from '@/config'
import axios, { AxiosResponse } from 'axios'

export const submitVerifiableSignature = async (
  signedData: string,
  signingError: Error,
  wikiHash: string,
  address: string,
  deadline: number,
) => {
  if (signedData) {
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
      console.log(error)
    }
  }
}
