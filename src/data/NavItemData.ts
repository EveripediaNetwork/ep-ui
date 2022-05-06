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
import { CategoryLink } from '@/types/CategoryDataTypes'

export const NAV_ITEMS = (categories: CategoryLink[]): NavItem[] => [
  {
    id: 1,
    label: 'Explore',
    href: '#',
    icon: RiCompass3Fill,
    subItem: [
      // destructure categories and add to subItem by mapping
      ...categories
        .map(({ title, id, icon }, i) => ({
          id: parseInt(`10${i}${2}`, 10),
          label: title,
          href: `/categories/${id}`,
          hasImage: true,
          /* eslint-disable */
          icon: require(`react-icons/bs`)[icon],
          /* eslint-enable */
        }))
        .slice(0, 9),
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

export const MOBILE_NAV_ITEMS = (categories: CategoryLink[]): NavItem[] => [
  ...NAV_ITEMS(categories),
  {
    id: 7,
    label: 'Account',
    icon: RiAccountCircleFill,
    href: '#',
    subItem: [
      {
        id: 701,
        label: 'Profile',
        href: '/account/0x9fEAB70f3c4a944B97b7565BAc4991dF5B7A69ff', // TODO: get address
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
