import React from 'react'
import { Icon, useDisclosure, Text, LinkBox } from '@chakra-ui/react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import { StaticContent } from '@/components/StaticElement'
import LinkOverlay from '@/components/Elements/LinkElements/LinkOverlay'
import { useTranslation } from 'next-i18next'

interface MobileNavItemProps {
  navItem: NavItem
  handleClick: (item: NavItem) => void
}

const MobileNavItem = ({ navItem, handleClick }: MobileNavItemProps) => {
  const { onToggle } = useDisclosure()
  const { t } = useTranslation('common')
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
            {t(navItem.label)}
          </Text>
        ) : (
          <LinkOverlay
            href={navItem.href}
            fontWeight={600}
            color="linkColor"
            mr="auto"
          >
            {t(navItem.label)}
          </LinkOverlay>
        )}
        <Text color="linkColor" cursor="pointer" ml="auto">
          {navItem.subItem && <RiArrowRightSLine />}
        </Text>
      </LinkBox>
    </StaticContent>
  )
}

export default MobileNavItem
