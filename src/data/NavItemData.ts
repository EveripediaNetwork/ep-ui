import {
  RiSettings5Fill,
  RiUserFill,
  RiCompass3Fill,
  RiBarChartFill,
  RiFoldersFill,
  RiAddBoxFill,
  RiWalletFill,
  RiRecycleFill,
  RiImage2Fill,
  RiCoinFill,
  RiBitCoinFill,
  RiUser3Fill,
  RiNewspaperFill,
  RiBook2Fill,
  RiTeamFill,
  RiUserSearchFill,
  RiAppStoreFill,
  RiNumbersFill,
  RiGroup2Fill,
} from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'

export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: 'Categories',
    href: '#',
    icon: RiCompass3Fill,
    subItem: [
      {
        id: 101,
        label: 'NFTs',
        icon: RiImage2Fill,
        href: '/categories/nfts',
        hasImage: true,
      },
      {
        id: 102,
        label: 'Decentralized Finance',
        icon: RiRecycleFill,
        href: '/categories/defi',
        hasImage: true,
      },
      {
        id: 103,
        label: 'Exchanges',
        icon: RiCoinFill,
        href: '/categories/exchanges',
        hasImage: true,
      },
      {
        id: 104,
        label: 'Cryptocurrencies',
        icon: RiBitCoinFill,
        href: '/categories/cryptocurrencies',
        hasImage: true,
      },
      {
        id: 105,
        label: 'DAOs',
        icon: RiTeamFill,
        href: '/categories/daos',
        hasImage: true,
      },
      {
        id: 106,
        label: 'People in crypto',
        icon: RiUser3Fill,
        href: '/categories/people',
        hasImage: true,
      },
      {
        id: 107,
        label: 'Dapps',
        icon: RiAppStoreFill,
        href: '/categories/dapps',
        hasImage: true,
      },
    ],
  },
  {
    id: 2,
    label: 'Activity',
    href: '/activity',
    icon: RiBarChartFill,
  },
  {
    id: 3,
    label: 'Rank',
    href: '/rank',
  },
  {
    id: 4,
    label: 'Learn',
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
        id: 404,
        label: 'IQ Dashboard',
        icon: RiNumbersFill,
        href: 'https://iq.braindao.org',
        hasImage: true,
        target: '_blank',
      },
      {
        id: 402,
        label: 'Blog',
        icon: RiNewspaperFill,
        href: '/blog',
        hasImage: true,
      },
      {
        id: 403,
        label: 'About Us',
        icon: RiUserSearchFill,
        href: '/static/about',
        hasImage: true,
      },
      {
        id: 405,
        label: 'BrainDAO',
        icon: RiGroup2Fill,
        href: 'https://braindao.org',
        hasImage: true,
        target: '_blank',
      },
    ],
  },
  {
    id: 5,
    label: 'Create Wiki',
    href: '/create-wiki',
    icon: RiAddBoxFill,
  },
]

export const NAV_ICON = {
  label: 'Account',
  id: 5,
  href: '#',
  subItem: [
    {
      id: 503,
      label: 'Settings',
      href: '/account/settings',
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
}): NavItem[] => [
  ...NAV_ITEMS,
  {
    id: 7,
    label: 'Account',
    icon: RiUserFill,
    href: '#',
    subItem: [
      {
        id: 701,
        label: 'Profile',
        href: `/account/${address}`,
        hasImage: false,
      },
      {
        id: 703,
        label: 'Settings',
        href: '#',
        hasImage: false,
        subItem: [
          {
            id: 7003,
            label: 'Profile Settings',
            href: '/account/settings?tab=profile',
            hasImage: false,
          },
          {
            id: 7004,
            label: 'Notification Settings',
            href: '/account/settings?tab=notifications',
            hasImage: false,
          },
          {
            id: 7006,
            label: 'Advanced Settings',
            href: '/account/settings?tab=advanced',
            hasImage: false,
          },
        ],
      },
    ],
  },
]
