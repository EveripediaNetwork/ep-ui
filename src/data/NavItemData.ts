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
    hasSubItem: true,
    icon: RiCompass3Fill,
    subItem: [
      {
        label: 'All Categories',
        href: '/categories',
        hasImage: true,
        icon: RiGridFill,
      },
      // destructure sample categories and add to subItem by mapping and take first 9
      ...sampleCategories
        .map(({ title, slug, icon }) => ({
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
    hasSubItem: true,
    icon: RiFoldersFill,
    subItem: [
      {
        label: 'Help Center',
        href: 'https://learn.everipedia.org',
        hasImage: false,
      },
      {
        label: 'About us',
        href: '/static/about',
        hasImage: false,
      },
    ],
  },
  {
    id: 4,
    label: 'Create Wiki',
    hasSubItem: false,
    href: '/create-wiki',
    icon: RiAddBoxFill,
  },
]

export const NAV_ICON: NavItem = {
  label: 'Account',
  id: 100,
  href: '#',
  hasSubItem: true,
  subItem: [
    {
      label: 'Profile',
      href: '/user/profile',
      hasImage: true,
      icon: RiAccountCircleFill,
    },
    {
      label: 'My Wikis',
      href: '#',
      hasImage: true,
      icon: RiGridFill,
    },
    {
      label: 'Settings',
      href: '/settings',
      hasImage: true,
      icon: RiSettings5Fill,
    },
  ],
}

export const mobileWalletDetails: NavItem = {
  label: 'Wallet',
  href: '#',
  id: 1234,
  icon: RiWallet2Line,
}
