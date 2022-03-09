import {
  RiGridFill,
  RiSettings5Fill,
  RiAccountCircleFill,
  RiCompass3Fill,
  RiBarChartFill,
  RiFoldersFill,
  RiAddBoxFill,
  RiWallet2Line,
} from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import { sampleCategories } from './CategoriesData'

export const NAV_ITEMS: NavItem[] = [
  {
    id: 1,
    label: 'Explore',
    href: '#',
    icon: RiCompass3Fill,
    subItem: [
      {
        id: 101,
        label: 'All Categories',
        href: '/categories',
        hasImage: true,
        icon: RiGridFill,
      },
      // destructure sample categories and add to subItem by mapping and take first 9
      ...sampleCategories
        .map(({ title, slug, icon }, i) => ({
          id: parseInt(`10${i}${2}`, 10),
          label: title,
          href: slug,
          hasImage: true,
          icon,
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

export const NAV_ICON: NavItem = {
  label: 'Account',
  id: 5,
  href: '#',
  subItem: [
    {
      id: 501,
      label: 'Profile',
      href: '/user/profile',
      hasImage: true,
      icon: RiAccountCircleFill,
    },
    {
      id: 502,
      label: 'My Wikis',
      href: '#',
      hasImage: true,
      icon: RiGridFill,
    },
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

export const MOBILE_NAV_ITEMS: NavItem[] = [
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
        href: '/user/profile',
        hasImage: false,
      },
      {
        id: 702,
        label: 'My Wikis',
        href: '#',
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
            href: '/account/settings?tab=notification',
            hasImage: false,
          },
        ],
      },
    ],
  },
]
