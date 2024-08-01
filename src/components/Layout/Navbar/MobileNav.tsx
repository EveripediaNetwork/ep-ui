import { MobileNavItem, MobileSubNav } from '@/components/Layout/Navbar'
import { MOBILE_NAV_ITEMS, mobileWalletDetails } from '@/data/NavItemData'
import { useAddress } from '@/hooks/useAddress'
import { RootState } from '@/store/store'
import { NavItem } from '@/types/NavItemType'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  LinkBox,
  Menu,
  Text,
  UseDisclosureReturn,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useState } from 'react'
import {
  RiArrowRightSLine,
  RiFacebookFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTelegramFill,
  RiTwitterFill,
} from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { ColorModeToggle } from './ColorModeToggle'
import { LogOutBtn } from './Logout'
import { ProfileLink } from './ProfileLink'
import SettingsLink from './SettingsLink'
import SuggestWikiModal from './SuggestWiki'

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
    label: lang === 'en' ? 'ENG' : lang === 'ko' ? 'KOR' : 'CHN',
    src: lang === 'en' ? '/US.svg' : lang === 'ko' ? '/KR.svg' : '/ZH.svg',
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
      {
        id: 103,
        label: 'CHN',
        href: 'zh',
        src: '/ZH.svg',
        isLocale: true,
      },
    ],
  }

  return (
    <VStack
      justify="space-between"
      align="stretch"
      backgroundColor="subMenuBg"
      h="95vh"
    >
      <Box borderTopWidth={1}>
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
                .filter((i) => i.label !== 'Account' || userAddress)
                .map((navItem) => (
                  <MobileNavItem
                    handleClick={(item) => handleClick(item)}
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
          h="65px"
          mb={10}
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
