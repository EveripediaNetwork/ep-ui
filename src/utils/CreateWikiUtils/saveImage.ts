import config from '@/config'
import axios from 'axios'
import { POST_IMG } from '@/services/wikis/queries'
import { WikiImageObjectProps } from '@/types/CreateWikiType'

export const saveImage = async (image: WikiImageObjectProps) => {
  const formData = new FormData()
  const blob = new Blob([image.type], {
    type: 'image/jpeg', // TODO: find proper type for now its forced to bypass API enforcements
  })

  formData.append('operations', POST_IMG)
  formData.append('map', `{"0": ["variables.file"]}`)
  formData.append('0', blob)
  try {
    const {
      data: {
        data: {
          pinImage: { IpfsHash },
        },
      },
    } = await axios.post(config.graphqlUrl, formData, {})

    return IpfsHash
  } catch (err) {
    return null
  }
}
