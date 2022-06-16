import React from 'react'
import {
  Icon,
  useDisclosure,
  Text,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { RiArrowRightSLine } from 'react-icons/ri'
import Link from 'next/link'
import { NavItem } from '@/types/NavItemType'
import { StaticContent } from '@/components/StaticElement'

interface MobileNavItemProps {
  navItem: NavItem
  handleClick: (item: NavItem) => void
}

const MobileNavItem = ({ navItem, handleClick }: MobileNavItemProps) => {
  const { onToggle } = useDisclosure()
  return (
    <StaticContent>
      <LinkBox
        onClick={() => {
          onToggle()
          handleClick(navItem)
        }}
        display="flex"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
        fontSize="lg"
        gap="4"
      >
        <Icon
          cursor="pointer"
          fontSize="4xl"
          color="linkColor"
          fontWeight={600}
          as={navItem.icon}
          pr={3}
        />
        {navItem.href === '#' ? (
          <Text fontWeight="semibold" color="linkColor" cursor="pointer">
            {navItem.label}
          </Text>
        ) : (
          <Link href={navItem.href} passHref>
            <LinkOverlay fontWeight={600} color="linkColor" mr="auto">
              {navItem.label}
            </LinkOverlay>
          </Link>
        )}
        {navItem.subItem && <RiArrowRightSLine />}
      </LinkBox>
    </StaticContent>
  )
}

export default MobileNavItem
