import config from '@/config'
import { MEDIA_POST_DEFAULT_ID } from '@/data/Constants'
import { Media } from '@/types/Wiki'

const YOUTUBE_DEFAULT_URL = 'https://www.youtube.com/watch?v='
const VIMEO_DEFAULT_URL = 'https://vimeo.com/'

export const checkMediaDefaultId = (id: string) => {
  return id.includes(MEDIA_POST_DEFAULT_ID)
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
