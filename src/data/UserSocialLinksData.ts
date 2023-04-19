import { RiInstagramLine, RiLink, RiTwitterLine } from 'react-icons/ri'

export const UserSocialLinksData = {
  twitter: {
    label: 'Twitter',
    icon: RiTwitterLine,
    urlPrefix: (username?: string) => {
      if (username?.startsWith('https://twitter.com')) return username
      return `https://twitter.com/${username}`
    },
  },
  website: {
    label: 'Website',
    icon: RiLink,
    urlPrefix: (website?: string) => website,
  },
  instagram: {
    label: 'Instagram',
    icon: RiInstagramLine,
    urlPrefix: (username?: string) => {
      if (username?.startsWith('https://instagram.com')) return username
      return `https://instagram.com/${username}`
    },
  },
  lens: {
    label: 'Lenster',
    icon: RiInstagramLine,
    urlPrefix: (username?: string) => {
      if (username?.startsWith('https://lenster.xyz')) return username
      return `https://lenster.xyz/u/${username}`
    },
  },
}
