import React from 'react'
import {
  Flex,
  Icon,
  Stack,
  Text,
  useDisclosure,
  HStack,
} from '@chakra-ui/react'
import { RiArrowRightSLine } from 'react-icons/ri'
import Link from '@/components/Elements/Link/Link'
import { NavItem } from '@/types/NavItemType'
import { useRouter } from 'next/router'

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
    <Stack
      direction="column"
      spacing={4}
      onClick={() => {
        onToggle()
        handleClick(navItem)
        if (!navItem.subItem) {
          router.push(navItem.href)
          setHamburger(false)
        }
      }}
    >
      <Flex
        as={Link}
        href={navItem.href}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
        fontSize="lg"
      >
        <HStack>
          <Icon
            cursor="pointer"
            fontSize="4xl"
            color="linkColor"
            fontWeight={600}
            as={navItem.icon}
            pr={3}
          />
          <Text fontWeight={600} color="linkColor">
            {navItem.label}
          </Text>
        </HStack>
        {navItem.subItem && <RiArrowRightSLine />}
      </Flex>
    </Stack>
  )
}

export default MobileNavItem
