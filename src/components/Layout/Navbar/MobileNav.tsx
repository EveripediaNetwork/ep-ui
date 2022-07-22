import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
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
import { ColorModeToggle } from './ColorModeToggle'
import { LogOutBtn } from './Logout'

type MobileNavType = {
  toggleWalletDrawer: () => void
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNav = ({ toggleWalletDrawer, setHamburger }: MobileNavType) => {
  const { isConnected: isUserConnected, address: userAddress } = useAccount()
  const [showSubNav, setShowSubNav] = useState<boolean>(false)
  const [currentMenu, setCurrentMenu] = useState<NavItem | null>(null)
  const iconSize = 20

  const handleClick = (currentNav: NavItem | null) => {
    if (currentNav && currentNav.subItem) {
      setCurrentMenu(currentNav)
      setShowSubNav(true)
    } else {
      setHamburger(false)
    }
  }
  const handleWalletButtonClick = () => {
    setHamburger(false)
    toggleWalletDrawer()
  }

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return null
  }

  return (
    <VStack justify="space-between" align="stretch" backgroundColor="subMenuBg">
      <Box borderTopWidth={1}>
        <NavSearch
          inputGroupProps={{ display: { base: 'inherit', md: 'none' } }}
          inputProps={{
            border: 'none',
            rounded: 'none',
            borderColor: 'transparent',
            py: 8,
          }}
          listProps={{ w: 'full', rounded: 'none', mt: 0 }}
        />

        <Divider />
        {!showSubNav ? (
          <Box
            px={{ base: 4, md: 8 }}
            h={{
              base: !isUserConnected
                ? 'max(calc(100vh - 300px), 350px)'
                : 'max(calc(100vh - 240px), 350px)',
              md: 'calc(100vh - 180px)',
            }}
          >
            <Box
              display={{ base: 'flex', xl: 'none' }}
              flexDirection="column"
              justifyContent="space-between"
              mt={5}
              h={!isUserConnected ? 'min(100%, 400px)' : 'min(100%, 500px)'}
              bg="subMenuBg"
              px={6}
              pb={6}
            >
              {MOBILE_NAV_ITEMS({
                address: userAddress,
              })
                .filter(i => i.label !== 'Account' || isUserConnected)
                .map(navItem => (
                  <MobileNavItem
                    handleClick={item => handleClick(item)}
                    key={navItem.label}
                    navItem={navItem}
                  />
                ))}

              {isUserConnected && (
                <Box display={{ sm: 'block', md: 'none', lg: 'none' }}>
                  <MobileNavItem
                    handleClick={handleWalletButtonClick}
                    key={mobileWalletDetails.label}
                    navItem={mobileWalletDetails}
                  />
                </Box>
              )}
              <Menu>
                <Flex gap="4" direction="column">
                  <ColorModeToggle isInMobileMenu />
                  <LogOutBtn isInMobileMenu />
                </Flex>
              </Menu>
            </Box>
          </Box>
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
        {!showSubNav && !isUserConnected && (
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
