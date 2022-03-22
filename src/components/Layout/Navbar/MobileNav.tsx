import React, { useState } from 'react'
import {
  Box,
  Flex,
  Stack,
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
} from 'react-icons/ri'
import { useAccount } from 'wagmi'
import { NavItem } from '@/types/NavItemType'
import { mobileWalletDetails, MOBILE_NAV_ITEMS } from '@/data/NavItemData'
import { MobileNavItem, MobileSubNav } from '@/components/Layout/Navbar'
import { NavSearch } from '@/components/Layout/Navbar/NavSearch'
import { useGetCategoriesLinksQuery } from '@/services/categories'
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
  const { data: categoriesLinks } = useGetCategoriesLinksQuery()
  const iconSize = 20

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
        <NavSearch
          inputGroupProps={{ display: { base: 'inherit', md: 'none' } }}
          inputProps={{
            borderTopWidth: 1,
            rounded: 'none',
            borderX: 'none',
            py: 8,
          }}
          listProps={{ w: 'full', rounded: 'none', mt: 0 }}
        />

        <Divider />
        {!showSubNav ? (
          <Stack
            bg="subMenuBg"
            px={6}
            pb={6}
            display={{ lg: 'flex', xl: 'none' }}
          >
            {MOBILE_NAV_ITEMS(categoriesLinks || []).map(navItem => (
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
