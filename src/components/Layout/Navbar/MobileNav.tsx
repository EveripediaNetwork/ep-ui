import React, { useState } from 'react'
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
  useDisclosure,
  LinkBox,
} from '@chakra-ui/react'
import {
  RiInstagramFill,
  RiLinkedinFill,
  RiFacebookFill,
  RiTelegramFill,
  RiTwitterFill,
  RiArrowRightSLine,
} from 'react-icons/ri'
import { NavItem } from '@/types/NavItemType'
import { mobileWalletDetails, MOBILE_NAV_ITEMS } from '@/data/NavItemData'
import { MobileNavItem, MobileSubNav } from '@/components/Layout/Navbar'
import NavSearch from '@/components/Layout/Navbar/NavSearch'
import { ColorModeToggle } from './ColorModeToggle'
import { LogOutBtn } from './Logout'
import SuggestWikiModal from './SuggestWiki'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { ProfileLink } from './ProfileLink'
import SettingsLink from './SettingsLink'
import { useAddress } from '@/hooks/useAddress'

type MobileNavType = {
  drawerOperations: UseDisclosureReturn
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const MobileNav = ({ drawerOperations, setHamburger }: MobileNavType) => {
  const [showSubNav, setShowSubNav] = useState<boolean>(false)
  const [currentMenu, setCurrentMenu] = useState<NavItem | null>(null)
  const { isConnected, address: userAddress } = useAddress()
  const {
    isOpen: isSuggestWikiOpen,
    onOpen: onSuggestWikiOpen,
    onClose: onSuggestWikiClose,
  } = useDisclosure()
  const lang = useSelector((state: RootState) => state.app.language)
  const { t } = useTranslation('common')

  const iconSize = 20

  const handleClick = (currentNav: NavItem | null) => {
    currentNav?.label === 'Suggest Wiki' ? onSuggestWikiOpen() : null
    if (currentNav?.subItem) {
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

  const langItem = {
    id: -1,
    label: lang === 'en' ? 'ENG' : 'KOR',
    src: lang === 'en' ? '/US.svg' : '/KR.svg',
    href: '#',
    subItem: [
      {
        id: 101,
        label: 'ENG',
        href: 'en',
        src: '/US.svg',
        isLocale: true,
      },
      {
        id: 102,
        label: 'KOR',
        href: 'ko',
        src: '/KR.svg',
        isLocale: true,
      },
    ],
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
            overflowY="scroll"
            px={{ base: 4, md: 8 }}
            h={{
              base: !userAddress
                ? 'max(calc(100vh - 300px), 350px)'
                : 'max(calc(100vh - 240px), 350px)',
              md: 'calc(100vh - 180px)',
            }}
            maxH={{
              base: '400px',
              md: '500px',
            }}
          >
            <Box
              display={{ base: 'flex', xl: 'none' }}
              flexDirection="column"
              justifyContent="space-between"
              gap={4}
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

              <LinkBox
                onClick={() => {
                  handleClick(langItem)
                }}
                display="flex"
                alignItems="center"
                _hover={{
                  textDecoration: 'none',
                }}
                fontSize="lg"
                gap="4"
                paddingY={1}
              >
                <Image
                  src={langItem.src}
                  alt={langItem.label}
                  width={24}
                  height={24}
                  style={{
                    marginRight: 12,
                  }}
                />
                <Text fontWeight="semibold" color="linkColor" cursor="pointer">
                  {t(langItem.label)}
                </Text>
                <Text color="linkColor" cursor="pointer" ml="auto">
                  {langItem.subItem && <RiArrowRightSLine />}
                </Text>
              </LinkBox>

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
                <Flex gap={{ base: '4' }} direction="column">
                  <ColorModeToggle isInMobileMenu />
                  <VStack display={{ md: 'none' }}>
                    <ProfileLink isInMobileMenu />
                    <SettingsLink isInMobileMenu />
                  </VStack>
                  {isConnected && <LogOutBtn isInMobileMenu />}
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
              <Text>Login</Text>
            </Button>
          </Box>
        )}
        <Center
          bg="subMenuBg"
          h="80px"
          borderTopWidth="thin"
          borderTopColor="borderColor"
          color="homeDescriptionColor"
        >
          <SuggestWikiModal
            isOpen={isSuggestWikiOpen}
            onClose={onSuggestWikiClose}
          />
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
