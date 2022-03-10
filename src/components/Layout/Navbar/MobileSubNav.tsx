import React from 'react'
import { Flex, Stack, Text, Icon, HStack, Link, Box } from '@chakra-ui/react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import NextLink from 'next/link'

const MobileSubNavItem = ({ item }: { item: NavItem }) => (
  <Flex
    py={3}
    justifyContent="space-between"
    alignItems="center"
    _hover={{
      textDecoration: 'none',
    }}
    fontSize="lg"
    px={6}
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

      <Text fontWeight={600} color="linkColor">
        {item.label}
      </Text>
    </HStack>
    {item.subItem && <Icon as={RiArrowRightSLine} fontSize={24} />}
  </Flex>
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
      py={4}
      justify="flex-start"
      align="center"
      _hover={{
        textDecoration: 'none',
      }}
      fontSize="lg"
      onClick={() => setShowSubNav(false)}
      bg="pageBg"
      px={2}
      borderBottomColor="gray.200"
      borderBottomWidth="thin"
    >
      <RiArrowLeftSLine size="30" />
      <Text fontWeight={600} color="color">
        {activeMenu?.label}
      </Text>
    </Flex>
    <Box h="calc(100vh - 300px)" overflowY="scroll">
      {activeMenu?.subItem?.map((item, key) => {
        if (item.subItem) {
          return (
            <Box onClick={() => setActiveMenu(item)}>
              <MobileSubNavItem key={key} item={item} />
            </Box>
          )
        }
        return (
          <NextLink href={item.href} key={key} passHref>
            <Link href="passRef" onClick={() => setHamburger(false)}>
              <MobileSubNavItem item={item} />
            </Link>
          </NextLink>
        )
      })}
    </Box>
  </Stack>
)

export default MobileSubNav
