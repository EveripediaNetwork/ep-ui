import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Center,
  VStack,
  Divider,
  Menu,
  Text,
} from '@chakra-ui/react'
import {
  RiInstagramFill,
  RiLinkedinFill,
  RiFacebookFill,
  RiTelegramFill,
  RiTwitterFill,
  RiSearch2Line,
} from 'react-icons/ri'
import { useAccount } from 'wagmi'
import { NavItem } from '@/types/NavItemType'
import { mobileWalletDetails, MOBILE_NAV_ITEMS } from '@/data/NavItemData'
import { MobileNavItem, MobileSubNav } from '@/components/Layout/Navbar'
import { useGetTopCategoriesLinksQuery } from '@/services/categories'
import { ColorModeToggle } from './ColorModeToggle'

type MobileNavType = {
  toggleWalletDrawer: () => void
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNav = ({ toggleWalletDrawer, setHamburger }: MobileNavType) => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })
  const [showSubNav, setShowSubNav] = useState<boolean>(false)
  const [currentMenu, setCurrentMenu] = useState<NavItem | null>(null)
  const iconSize = 20
  const [navData, setNavData] = useState<NavItem[]>(MOBILE_NAV_ITEMS)
  const { data: topCategoriesLinks } = useGetTopCategoriesLinksQuery()

  // Update nav data when top categories links are loaded
  useEffect(() => {
    if (topCategoriesLinks) {
      const topCategories = topCategoriesLinks.map(
        ({ title, id, icon }, i) => ({
          id: parseInt(`10${i}${2}`, 10),
          label: title || id,
          href: `/categories/${id}`,
          hasImage: true,
          icon,
        }),
      )
      setNavData([
        ...MOBILE_NAV_ITEMS.map(navItem => {
          if (navItem.label === 'Explore') {
            return {
              ...navItem,
              subItem: [...(navItem.subItem || []), ...topCategories],
            }
          }
          return navItem
        }),
      ])
    }
  }, [topCategoriesLinks])

  const handleClick = (currentNav: NavItem | null) => {
    if (currentNav && currentNav.subItem) {
      setCurrentMenu(currentNav)
      setShowSubNav(true)
    }
  }
  const handleWalletButtonClick = () => {
    setHamburger(false)
    toggleWalletDrawer()
  }

  return (
    <VStack
      justify="space-between"
      align="stretch"
      backgroundColor="subMenuBg"
      h="calc((100vh - 0px) - 72px)"
    >
      <Box>
        <InputGroup
          display={{ sm: 'flex', md: 'none' }}
          py={2}
          mx={2}
          width="unset"
          backgroundColor="subMenuBg"
          size="lg"
        >
          <InputLeftElement pt={4} pl={0} pointerEvents="none">
            <RiSearch2Line color="gray.300" />
          </InputLeftElement>
          <Input
            pl={10}
            borderColor="mobileMenuBorderColor"
            _focus={{ borderColor: 'borderColorHover' }}
            _hover={{ borderColor: 'borderColorHover' }}
            placeholder="Search wikis, categories and accounts"
            _placeholder={{
              fontSize: 'md',
              transform: 'translateY(-1px)',
            }}
          />
        </InputGroup>
        <Divider />
        {!showSubNav ? (
          <Stack
            bg="subMenuBg"
            px={6}
            pb={6}
            display={{ lg: 'flex', xl: 'none' }}
          >
            {navData.map(navItem => (
              <MobileNavItem
                handleClick={item => handleClick(item)}
                key={navItem.label}
                navItem={navItem}
                setHamburger={setHamburger}
              />
            ))}
            <Menu>
              <Box mx="-8" pt={2}>
                <ColorModeToggle isInMobileMenu />
              </Box>
            </Menu>
            {accountData && (
              <Box display={{ sm: 'block', md: 'none', lg: 'none' }}>
                <MobileNavItem
                  handleClick={handleWalletButtonClick}
                  key={mobileWalletDetails.label}
                  navItem={mobileWalletDetails}
                  setHamburger={setHamburger}
                />
              </Box>
            )}
          </Stack>
        ) : (
          <Box h="calc(100vh - 220px)">
            <MobileSubNav
              setHamburger={setHamburger}
              setShowSubNav={setShowSubNav}
              activeMenu={currentMenu}
              setActiveMenu={setCurrentMenu}
            />
          </Box>
        )}
      </Box>
      <Box display={{ lg: 'block', xl: 'none' }}>
        {!showSubNav && !accountData && (
          <Box mb={3} px={6} display={{ sm: 'flex', md: 'none' }}>
            <Button onClick={handleWalletButtonClick} size="lg" w="full">
              <Text>Connect wallet</Text>
            </Button>
          </Box>
        )}
        <Center
          bg="subMenuBg"
          h="80px"
          borderTopWidth="thin"
          borderTopColor="borderColor"
          color="gray.500"
        >
          <Flex gap={8}>
            <RiInstagramFill size={iconSize} />
            <RiLinkedinFill size={iconSize} />
            <RiFacebookFill size={iconSize} />
            <RiTelegramFill size={iconSize} />
            <RiTwitterFill size={iconSize} />
          </Flex>
        </Center>
      </Box>
    </VStack>
  )
}

export default MobileNav
