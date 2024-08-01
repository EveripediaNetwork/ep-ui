import { NavItem } from '@/types/NavItemType'
import {
  RiAddBoxFill,
  RiBarChartFill,
  RiBook2Fill,
  RiCodeBoxFill,
  RiFoldersFill,
  RiGroup2Fill,
  RiHashtag,
  RiLightbulbFlashFill,
  RiNewspaperFill,
  RiNumbersFill,
  RiSearchEyeFill,
  RiSettings5Fill,
  RiStarSFill,
  RiUserSearchFill,
  RiWalletFill,
} from 'react-icons/ri'

export const NAV_ITEMS: NavItem[] = [
  {
    id: 3,
    label: 'Activity',
    href: '/activity',
    icon: RiBarChartFill,
  },
  {
    id: 4,
    label: 'About',
    href: '/about',
    icon: RiUserSearchFill,
  },
  {
    id: 5,
    label: 'Events',
    href: '/events',
    icon: RiHashtag,
  },
  {
    id: 6,
    label: 'More',
    href: '#',
    icon: RiFoldersFill,
    subItem: [
      {
        id: 401,
        label: 'IQ Learn',
        icon: RiBook2Fill,
        href: 'https://learn.everipedia.org/iq/',
        hasImage: true,
        target: '_blank',
      },
      {
        id: 402,
        label: 'IQ Dashboard',
        icon: RiNumbersFill,
        href: 'https://iq.braindao.org',
        hasImage: true,
        target: '_blank',
      },
      {
        id: 403,
        label: 'Glossary',
        icon: RiStarSFill,
        href: '/glossary',
        hasImage: true,
      },
      {
        id: 404,
        label: 'IQ GPT',
        icon: RiSearchEyeFill,
        href: 'https://iqgpt.com',
        hasImage: true,
        target: '_blank',
      },
      {
        id: 405,
        label: 'IQ Code',
        icon: RiCodeBoxFill,
        href: 'https://iqcode.ai',
        hasImage: true,
        target: '_blank',
      },
      {
        id: 406,
        label: 'Blog',
        icon: RiNewspaperFill,
        href: '/blog',
        hasImage: true,
      },
      {
        id: 407,
        label: 'BrainDAO',
        icon: RiGroup2Fill,
        href: 'https://braindao.org',
        hasImage: true,
        target: '_blank',
      },
    ],
  },
]

export const NAV_ICON = {
  label: 'Accounts',
  id: 5,
  href: '#',
  subItem: [
    {
      id: 503,
      label: 'Settings',
      href: '/settings/account',
      hasImage: true,
      icon: RiSettings5Fill,
    },
  ],
}

export const mobileWalletDetails: NavItem = {
  label: 'Wallet',
  href: '#',
  id: 6,
  icon: RiWalletFill,
}

export const MOBILE_NAV_ITEMS = ({
  address,
}: {
  address: string | undefined
}): NavItem[] => {
  const filteredNavItems = NAV_ITEMS.filter(
    (item) => item.label !== 'Create Wiki' && item.label !== 'Suggest Wiki',
  )

  if (address) {
    filteredNavItems.push({
      id: 6,
      label: 'Create Wiki',
      href: '/create-wiki',
      icon: RiAddBoxFill,
    })
  } else {
    filteredNavItems.push({
      id: 7,
      label: 'Suggest Wiki',
      href: '#',
      icon: RiLightbulbFlashFill,
    })
  }

  return [...filteredNavItems]
}
