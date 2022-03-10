import React, { useRef, useState, useEffect } from 'react'
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
  HStack,
  Heading,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { RiWallet2Line, RiAccountCircleLine } from 'react-icons/ri'
import { useAccount } from 'wagmi'
import Link from '@/components/Elements/Link/Link'
import { Logo } from '@/components/Elements/'
import { NAV_ICON } from '@/data/NavItemData'
import NavMenu from '@/components/Layout/Navbar/NavMenu'
import { ColorModeToggle } from '@/components/Layout/Navbar/ColorModeToggle'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { useRouter } from 'next/router'
import { NavSearch } from '@/components/Layout/Navbar/NavSearch'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import WalletDrawer from '../WalletDrawer/WalletDrawer'

const Navbar = () => {
  const router = useRouter()

  const { isOpen, onClose, onToggle } = useDisclosure()

  const loginButtonRef = useRef<HTMLButtonElement>(null)

  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)

  const [isHamburgerOpen, setHamburger] = useState<boolean>(false)

  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  })

  const handleWalletIconAction = () => {
    if (isHamburgerOpen) {
      setHamburger(false)
    }
    onToggle()
  }

  useEffect(() => {
    const handleRouteChange = () => isOpen && onToggle()

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, isOpen, onToggle])

  return (
    <Box
      boxShadow="sm"
      position="fixed"
      zIndex={1500}
      w="full"
      h={isHamburgerOpen ? '100%' : '20'}
      bg="subMenuBg"
      px={{ base: 4, md: 8 }}
      borderBottomWidth={1}
    >
      <Flex mx="auto" align="center">
        <Box flex={1}>
          <Flex
            gap={{ base: 8, lg: 40, xl: 8 }}
            h="70px"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link
              href="/"
              mr={{ base: 0, xl: '9vw' }}
              _hover={{ textDecoration: 'none' }}
            >
              <HStack width="150px">
                <Logo />
                <Heading size="md" color="gray.900" _dark={{ color: 'white' }}>
                  Everipedia
                </Heading>
              </HStack>
            </Link>
            <NavSearch />
            <HStack
              ml={4}
              spacing={4}
              display={{
                base: 'none',
                xl: 'flex',
              }}
            >
              <DesktopNav />
              <Box onMouseLeave={() => setVisibleMenu(null)}>
                <NavMenu
                  navItem={NAV_ICON}
                  setVisibleMenu={setVisibleMenu}
                  visibleMenu={visibleMenu}
                  label={
                    accountData ? (
                      <DisplayAvatar accountData={accountData} />
                    ) : (
                      <Icon
                        cursor="pointer"
                        fontSize="3xl"
                        color="gray.600"
                        _dark={{ color: 'gray.200' }}
                        fontWeight={600}
                        as={RiAccountCircleLine}
                        mt={2}
                        _hover={{
                          textDecoration: 'none',
                          color: 'linkHoverColor',
                        }}
                      />
                    )
                  }
                >
                  <ColorModeToggle isInMobileMenu={false} />
                </NavMenu>
              </Box>
              <Icon
                color="linkColor"
                cursor="pointer"
                fontSize="3xl"
                onClick={handleWalletIconAction}
                fontWeight={600}
                as={RiWallet2Line}
                onMouseEnter={() => setVisibleMenu(null)}
                _hover={{
                  textDecoration: 'none',
                  color: 'linkHoverColor',
                }}
              />
            </HStack>
            <Box
              display={{
                base: 'block',
                xl: 'none',
              }}
            >
              <IconButton
                onClick={() => setHamburger(!isHamburgerOpen)}
                icon={
                  isHamburgerOpen ? (
                    <CloseIcon w={4} h={4} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant="ghost"
                aria-label="Toggle Navigation"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>

      <WalletDrawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={loginButtonRef}
        setHamburger={setHamburger}
      />

      <Collapse
        in={isHamburgerOpen}
        animateOpacity
        style={{ margin: '0 -15px' }}
      >
        <MobileNav setHamburger={setHamburger} toggleWalletDrawer={onToggle} />
      </Collapse>
    </Box>
  )
}

export default Navbar
