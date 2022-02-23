import React from 'react'
import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Box,
} from '@chakra-ui/react'
import Link from '@/components/Elements/Link/Link'
import { NavItem } from '@/types/NavItemType'

interface NavMenuType {
  visibleMenu: number | null
  children?: React.ReactNode
  navItem: NavItem
  setVisibleMenu: React.Dispatch<React.SetStateAction<number | null>>
  labelIsIcon?: boolean
  label: React.ReactNode
}
const NavMenu = ({
  visibleMenu,
  navItem,
  setVisibleMenu,
  children,
  labelIsIcon,
  label,
}: NavMenuType) => (
  <Menu placement="bottom" isOpen={visibleMenu === navItem.id}>
    <MenuButton
      pr={4}
      fontSize="lg"
      fontWeight={600}
      color="linkColor"
      _hover={{
        textDecoration: 'none',
        color: 'linkHoverColor',
      }}
      whiteSpace="nowrap"
      onMouseEnter={() => setVisibleMenu(navItem.id)}
      onClick={() => setVisibleMenu(visibleMenu ? null : navItem.id)}
    >
      {label}
    </MenuButton>
    {navItem.hasSubItem && (
      <MenuList
        bg="subMenuBg"
        onMouseEnter={() => setVisibleMenu(navItem.id)}
        mt={!labelIsIcon ? 4 : 1.5}
      >
        {navItem.subItem?.map((item, key) => (
          <Link
            href={item.href}
            _hover={{
              textDecoration: 'none',
              color: 'linkHoverColor',
            }}
            color="linkColor"
            key={key}
          >
            <MenuItem minH="48px" bg="subMenuBg">
              {item.hasImage && (
                <Icon
                  cursor="pointer"
                  fontSize="4xl"
                  fontWeight={600}
                  as={item.icon}
                  pr={3}
                />
              )}
              <Box fontSize="md" fontWeight={600} color="linkColor">
                {item.label}
              </Box>
            </MenuItem>
            {navItem.subItem?.length !== key + 1 && <Divider />}
          </Link>
        ))}
        {children}
      </MenuList>
    )}
  </Menu>
)

export default NavMenu
