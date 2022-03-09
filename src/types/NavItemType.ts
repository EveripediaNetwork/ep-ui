import { IconType } from 'react-icons/lib'

export interface NavItem {
  id: number
  label: string
  href: string
  hasImage?: boolean
  icon?: IconType
  subItem?: NavItem[]
}
