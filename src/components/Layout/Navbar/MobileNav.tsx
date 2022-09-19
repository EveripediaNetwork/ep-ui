import React, { useContext, useState } from 'react'
import {
  Box,
  Flex,
  Button,
  Center,
  VStack,
  Divider,
  Menu,
  Text,
  UseDisclosureReturn,
} from '@chakra-ui/react'
import {
  RiInstagramFill,
  RiLinkedinFill,
  RiFacebookFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import { mobileWalletDetails, MOBILE_NAV_ITEMS } from '@/data/NavItemData'
import { MobileNavItem, MobileSubNav } from '@/components/Layout/Navbar'
import NavSearch from '@/components/Layout/Navbar/NavSearch'
import { getUserAddressFromCache } from '@/utils/getUserAddressFromCache'
import { WagmiStatusContext } from '@/components/Wagmi/DynamicWagmiProvider'
import { ColorModeToggle } from './ColorModeToggle'
import { LogOutBtn } from './Logout'

type MobileNavType = {
  drawerOperations: UseDisclosureReturn
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNav = ({ drawerOperations, setHamburger }: MobileNavType) => {
  const userAddress = getUserAddressFromCache()
  const [showSubNav, setShowSubNav] = useState<boolean>(false)
  const [currentMenu, setCurrentMenu] = useState<NavItem | null>(null)
  const { isWagmiWrapped } = useContext(WagmiStatusContext)

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
    drawerOperations.onToggle()
  }

  return (
    <VStack justify="space-between" align="stretch" backgroundColor="subMenuBg">
      <Box borderTopWidth={1}>
        <NavSearch
          inputGroupProps={{
            display: { base: 'inherit', md: 'none' },
          }}
          inputProps={{
            my: 2,
            width: '90%',
            mx: '5%',
          }}
          listProps={{ w: 'full', rounded: 'none', mt: 0 }}
          setHamburger={setHamburger}
        />

        <Divider />
        {!showSubNav ? (
          <Box
            px={{ base: 4, md: 8 }}
            h={{
              base: !userAddress
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
              h={!userAddress ? 'min(100%, 400px)' : 'min(100%, 500px)'}
              bg="subMenuBg"
              px={6}
              pb={6}
            >
              {MOBILE_NAV_ITEMS({
                address: userAddress || undefined,
              })
                .filter(i => i.label !== 'Account' || userAddress)
                .map(navItem => (
                  <MobileNavItem
                    handleClick={item => handleClick(item)}
                    key={navItem.label}
                    navItem={navItem}
                  />
                ))}

              {userAddress && (
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
                  {isWagmiWrapped && <LogOutBtn isInMobileMenu />}
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
        {!showSubNav && !userAddress && (
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
