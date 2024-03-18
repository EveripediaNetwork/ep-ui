import {
  RiSettings5Fill,
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
  RiNumbersFill,
  RiGroup2Fill,
  RiCopperDiamondLine,
  RiOrganizationChart,
  RiHashtag,
  RiSearchEyeFill,
  RiStarSFill,
  RiLightbulbFlashFill,
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
        label: 'People in Crypto',
        icon: RiUser3Fill,
        href: '/categories/people',
        hasImage: true,
      },
      {
        id: 107,
        label: 'Dapps',
        icon: RiCopperDiamondLine,
        href: '/categories/dapps',
        hasImage: true,
      },
      {
        id: 108,
        label: 'Organizations',
        icon: RiOrganizationChart,
        href: '/categories/organizations',
        hasImage: true,
      },
    ],
  },
  {
    id: 2,
    label: 'Rank',
    href: '/rank',
    icon: RiHashtag,
  },
  // {
  //   id: 3,
  //   label: 'Events',
  //   href: '/events',
  //   icon: RiHashtag,
  // },
  {
    id: 4,
    label: 'Activity',
    href: '/activity',
    icon: RiBarChartFill,
  },
  {
    id: 5,
    label: 'About',
    href: '/about',
    icon: RiUserSearchFill,
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
        label: 'Blog',
        icon: RiNewspaperFill,
        href: '/blog',
        hasImage: true,
      },
      {
        id: 406,
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
