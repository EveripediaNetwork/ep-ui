import React from 'react'
import { Icon, useDisclosure, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { RiArrowRightSLine } from 'react-icons/ri'
import Link from 'next/link'
import { NavItem } from '@/types/NavItemType'
import { useRouter } from 'next/router'
import { StaticContent } from '@/components/StaticElement'

interface MobileNavItemProps {
  navItem: NavItem
  handleClick: (item: NavItem) => void
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNavItem = ({
  navItem,
  handleClick,
  setHamburger,
}: MobileNavItemProps) => {
  const { onToggle } = useDisclosure()
  const router = useRouter()
  return (
    <StaticContent>
      <LinkBox
        onClick={() => {
          onToggle()
          handleClick(navItem)
          if (!navItem.subItem) {
            router.push(navItem.href)
            setHamburger(false)
          }
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
        <Link href={navItem.href} passHref>
          <LinkOverlay fontWeight={600} color="linkColor" mr="auto">
            {navItem.label}
          </LinkOverlay>
        </Link>
        {navItem.subItem && <RiArrowRightSLine />}
      </LinkBox>
    </StaticContent>
  )
}

export default MobileNavItem
