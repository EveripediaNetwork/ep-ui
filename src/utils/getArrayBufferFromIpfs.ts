import axios from 'axios'
import config from '@/config'

import getImgFromArrayBuffer from './getImgFromArrayBuffer'

const getArrayBufferFromIpfs = async (imgHash: string) => {
  const { data } = await axios.get(`${config.pinataBaseUrl}${imgHash}`, {
    responseType: 'arraybuffer',
  })

  console.log(data)

  return getImgFromArrayBuffer(data)
  // return URL.createObjectURL(data)
}

export default getArrayBufferFromIpfs
