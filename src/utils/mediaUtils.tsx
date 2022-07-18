import config from '@/config'
import { MEDIA_POST_DEFAULT_ID } from '@/data/Constants'
import { Media } from '@/types/Wiki'

const VIMEO_DEFAULT_URL = 'https://vimeo.com/'

export const checkMediaDefaultId = (id: string) => {
  return id.includes(MEDIA_POST_DEFAULT_ID)
}

export const constructMediaUrl = (media: Media) => {
  let url
  switch (media.source) {
    case 'YOUTUBE':
      url = `https://i3.ytimg.com/vi/${media.id}/maxresdefault.jpg`
      break
    case 'VIMEO':
      url = VIMEO_DEFAULT_URL + media.id
      break
    default:
      url = `${config.pinataBaseUrl}${media.id}`
  }
  return url
}
