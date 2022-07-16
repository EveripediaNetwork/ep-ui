import {
  RiSettings5Fill,
  RiAccountCircleFill,
  RiCompass3Fill,
  RiBarChartFill,
  RiFoldersFill,
  RiAddBoxFill,
  RiWallet2Line,
} from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import {
  BsCurrencyBitcoin,
  BsCurrencyExchange,
  BsFillFileImageFill,
  BsFillPeopleFill,
  BsFillPersonFill,
  BsRecycle,
} from 'react-icons/bs'

export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: 'Explore',
    href: '#',
    icon: RiCompass3Fill,
    subItem: [
      {
        id: 101,
        label: 'NFTs',
        icon: BsFillFileImageFill,
        href: '/categories/nft',
        hasImage: true,
      },
      {
        id: 102,
        label: 'Decentralized Finance',
        icon: BsRecycle,
        href: '/categories/defi',
        hasImage: true,
      },
      {
        id: 103,
        label: 'Exchanges',
        icon: BsCurrencyExchange,
        href: '/categories/exchanges',
        hasImage: true,
      },
      {
        id: 104,
        label: 'Cryptocurrencies',
        icon: BsCurrencyBitcoin,
        href: '/categories/cryptocurrencies',
        hasImage: true,
      },
      {
        id: 105,
        label: 'DAOs',
        icon: BsFillPeopleFill,
        href: '/categories/daos',
        hasImage: true,
      },
      {
        id: 106,
        label: 'People in crypto',
        icon: BsFillPersonFill,
        href: '/categories/people',
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
    label: 'Resources',
    href: '#',
    icon: RiFoldersFill,
    subItem: [
      {
        id: 301,
        label: 'Help Center',
        href: 'https://learn.everipedia.org',
        hasImage: false,
      },
      {
        id: 302,
        label: 'About us',
        href: '/static/about',
        hasImage: false,
      },
    ],
  },
  {
    id: 4,
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
  icon: RiWallet2Line,
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
    icon: RiAccountCircleFill,
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
            id: 7005,
            label: 'Support Settings',
            href: '/account/settings?tab=support',
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
