import type { IconType } from 'react-icons'
import {
  RiCalendarEventFill,
  RiDatabaseFill,
  RiHashtag,
  RiHome5Fill,
  RiSortAsc,
} from 'react-icons/ri'

type TabsType = {
  id: string
  href: string
  title: string
  icon: IconType
}

export const Tabs: TabsType[] = [
  {
    id: 'home',
    href: '/',
    title: 'Home',
    icon: RiHome5Fill,
  },
  {
    id: 'categories',
    href: '/categories/',
    title: 'Categories',
    icon: RiDatabaseFill,
  },
  {
    id: 'rank',
    href: '/rank/',
    title: 'Rank',
    icon: RiHashtag,
  },
  {
    id: 'events',
    href: '/events/',
    title: 'Events',
    icon: RiCalendarEventFill,
  },
  {
    id: 'glossary',
    href: '/glossary/',
    title: 'Glossary',
    icon: RiSortAsc,
  },
]
