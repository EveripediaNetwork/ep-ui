import { IconType } from 'react-icons/lib'
import {
  RiTwitterFill,
  RiRedditFill,
  RiFacebookFill,
  RiTelegramFill,
  RiGithubFill,
  RiInstagramFill,
  RiDiscordFill,
} from 'react-icons/ri'

type Social = {
  id: number
  href: string
  name: string
  icon: IconType
}

export const Socials: Social[] = [
  {
    id: 1,
    href: 'https://twitter.com/everipedia',
    name: 'twitter',
    icon: RiTwitterFill,
  },
  {
    id: 2,
    href: 'https://www.reddit.com/r/Everipedia/',
    name: 'reddit',
    icon: RiRedditFill,
  },
  {
    id: 3,
    href: 'https://t.me/everipedia',
    name: 'telegram',
    icon: RiTelegramFill,
  },
  {
    id: 4,
    href: 'https://instagram.com/everipedia',
    name: 'instagram',
    icon: RiInstagramFill,
  },
  {
    id: 5,
    href: 'https://github.com/EveripediaNetwork',
    name: 'github',
    icon: RiGithubFill,
  },
  {
    id: 6,
    href: 'https://discord.com/invite/brainies',
    name: 'discord',
    icon: RiDiscordFill,
  },
  {
    id: 7,
    href: 'https://web.facebook.com/everipedia?_rdc=1&_rdr',
    name: 'facebook',
    icon: RiFacebookFill,
  },
]
