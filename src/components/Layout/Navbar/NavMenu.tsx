import React from 'react'
import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Box,
  Text,
  HStack,
} from '@chakra-ui/react'
import Link from '@/components/Elements/LinkElements/Link'
import { NavItem } from '@/types/NavItemType'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { RiArrowDownSLine } from 'react-icons/ri'

interface NavMenuType {
  visibleMenu: number | null
  children?: React.ReactNode
  navItem: NavItem
  setVisibleMenu: React.Dispatch<React.SetStateAction<number | null>>
  label: React.ReactNode
}
const NavMenu = ({
  visibleMenu,
  navItem,
  setVisibleMenu,
  children,
  label,
}: NavMenuType) => {
  const router = useRouter()
  const { t } = useTranslation()
  const handleClick = (navItem: NavItem) => {
    navItem.subItem
      ? setVisibleMenu(visibleMenu ? null : navItem.id)
      : navItem.target
      ? window.open(navItem.href, '_blank', 'noopener,noreferrer')
      : router.push(navItem.href)
  }
  return (
    <Menu placement="bottom" isOpen={visibleMenu === navItem.id}>
      <MenuButton
        pr={4}
        fontSize="14px"
        fontWeight={600}
        height="24px"
        color="linkColor"
        _hover={{
          textDecoration: 'none',
          color: 'linkHoverColor',
        }}
        whiteSpace="nowrap"
        onMouseEnter={() => setVisibleMenu(navItem.id)}
        onClick={handleClick.bind(null, navItem)}
      >
        <HStack spacing={1}>
          <Text as="div">{label}</Text>{' '}
          {navItem.subItem && (label as string)?.length && (
            <Icon as={RiArrowDownSLine} />
          )}
        </HStack>
      </MenuButton>
      {navItem.subItem && (
        <MenuList
          display="flex"
          flexDirection="column"
          bg="subMenuBg"
          onMouseEnter={() => setVisibleMenu(navItem.id)}
          mt={-1}
          mr={4}
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
              target={item.target}
            >
              {item.label === 'Settings' && <Divider />}
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
                  {`${t(item.label)}`}
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
}
export default NavMenu
