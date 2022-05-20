import React from 'react'
import {
  Flex,
  Stack,
  Text,
  Icon,
  HStack,
  Box,
  LinkBox,
  LinkOverlay,
  FlexProps,
} from '@chakra-ui/react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import NextLink from 'next/link'

const MobileSubNavItem = ({ item, ...rest }: { item: NavItem } & FlexProps) => (
  <LinkBox
    display="flex"
    py={3}
    justifyContent="space-between"
    alignItems="center"
    _hover={{
      textDecoration: 'none',
    }}
    fontSize="lg"
    px={6}
    {...rest}
  >
    <HStack>
      {item.hasImage && (
        <Icon
          cursor="pointer"
          fontSize="3xl"
          color="linkColor"
          fontWeight={600}
          as={item.icon}
          pr={3}
        />
      )}

      <NextLink href={item.href} passHref>
        <LinkOverlay fontWeight={600} color="linkColor">
          {item.label}
        </LinkOverlay>
      </NextLink>
    </HStack>
    {item.subItem && <Icon as={RiArrowRightSLine} fontSize={24} />}
  </LinkBox>
)

const MobileSubNav = ({
  activeMenu,
  setShowSubNav,
  setHamburger,
  setActiveMenu,
}: {
  activeMenu: NavItem | null
  setShowSubNav: (status: boolean) => void
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
  setActiveMenu: (menu: NavItem | null) => void
}) => (
  <Stack
    direction="column"
    pb={6}
    display={{ lg: 'flex', xl: 'none' }}
    bg="subMenuBg"
    spacing={4}
    height="xl"
  >
    <Flex
      justify="flex-start"
      align="center"
      _hover={{
        textDecoration: 'none',
      }}
      fontSize="lg"
      cursor="pointer"
      onClick={() => setShowSubNav(false)}
      bg="pageBg"
      p={4}
      borderBottomColor="gray.200"
      borderBottomWidth="thin"
    >
      <RiArrowLeftSLine size="30" />
      <Text fontWeight={600} color="color">
        {activeMenu?.label}
      </Text>
    </Flex>
    <Box h="calc(100vh - 300px)" px={4} overflowY="scroll">
      {activeMenu?.subItem?.map((item, key) => {
        if (item.subItem) {
          return (
            <Box onClick={() => setActiveMenu(item)}>
              <MobileSubNavItem key={key} item={item} />
            </Box>
          )
        }
        return (
          <MobileSubNavItem
            key={key}
            item={item}
            onClick={() => setHamburger(false)}
          />
        )
      })}
    </Box>
  </Stack>
)

export default MobileSubNav
