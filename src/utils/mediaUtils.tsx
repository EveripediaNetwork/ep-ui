import config from '@/config'
import { Media } from '@/types/Wiki'

const YOUTUBE_DEFAULT_URL = 'https://www.youtube.com/watch?app=desktop&v='
const VIMEO_DEFAULT_URL = 'https://vimeo.com/'

export const checkMediaDefaultId = (id: string) => {
  return id.includes(id)
}

export const constructMediaUrl = (media: Media) => {
  let url
  switch (media.source) {
    case 'YOUTUBE':
      url = YOUTUBE_DEFAULT_URL + media.id
      break
    case 'VIMEO':
      url = VIMEO_DEFAULT_URL + media.id
      break
    default:
      url = `${config.pinataBaseUrl}${media.id}`
  }
  return url
}
