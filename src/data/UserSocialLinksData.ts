import { RiInstagramLine, RiLink, RiTwitterLine } from 'react-icons/ri'

export const UserSocialLinksData = {
  twitter: {
    label: 'Twitter',
    icon: RiTwitterLine,
    urlPrefix: (username?: string) => `https://twitter.com/${username}`,
  },
  website: {
    label: 'Website',
    icon: RiLink,
    urlPrefix: (website?: string) => website,
  },
  instagram: {
    label: 'Instagram',
    icon: RiInstagramLine,
    urlPrefix: (username?: string) => `https://instagram.com/${username}`,
  },
}
