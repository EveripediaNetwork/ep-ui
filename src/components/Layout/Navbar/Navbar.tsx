import React, { Suspense, useEffect, useRef, useState } from 'react'
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  useDisclosure,
  HStack,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { WagmiNeededComponent } from '@/components/WrapperRoutes/WagmiNeededComponent'
import { useDispatch } from 'react-redux'
import { setDrawerOpen } from '@/store/slices/app-slice'
import { store } from '@/store/store'
import Link from 'next/link'
import { StaticContent } from '@/components/StaticElement'
import DesktopNav from './DesktopNav'
import WalletNavMenu from './WalletNavMenu'

const ProfileNavMenu = dynamic(() => import('./ProfileNavItem'), {
  loading: () => (
    <SkeletonCircle
      pr={4}
      size="25px"
      startColor="gray.500"
      endColor="gray.500"
    />
  ),
})

const Logo = dynamic(() => import('@/components/Elements/Logo/Logo'))
const NavSearch = dynamic(
  () => import('@/components/Layout/Navbar/NavSearch'),
  {
    suspense: true,
  },
)
const MobileNav = dynamic(() => import('./MobileNav'))
const WalletDrawer = dynamic(() => import('../WalletDrawer/WalletDrawer'))

const Navbar = () => {
  const dispatch = useDispatch()
  const drawerOperations = useDisclosure({
    defaultIsOpen: store.getState().app.isDrawerOpen,
    onOpen: () => {
      dispatch(setDrawerOpen(true))
    },
    onClose: () => {
      dispatch(setDrawerOpen(false))
    },
  })
  const loginButtonRef = useRef<HTMLButtonElement>(null)
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)
  const [isHamburgerOpen, setHamburger] = useState<boolean>(false)
  const router = useRouter()
  const { isOpen, onToggle } = drawerOperations

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
      zIndex="banner"
      w="full"
      h={{ base: drawerOperations.isOpen ? '100%' : 'unset', md: 'unset' }}
      bg="subMenuBg"
      borderBottomWidth={1}
    >
      <Flex
        gap={{ base: 8, lg: 40, xl: 8 }}
        h="70px"
        alignItems="center"
        justifyContent="space-between"
        px={{ base: 4, md: 8 }}
      >
        <Box
          cursor="pointer"
          mr={{ base: 0, xl: '9vw' }}
          _hover={{ textDecoration: 'none' }}
        >
          <Link prefetch={false} href="/">
            <StaticContent>
              <HStack width="150px">
                <Logo />
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  color="gray.900"
                  _dark={{ color: 'white' }}
                >
                  IQ.wiki
                </Text>
              </HStack>
            </StaticContent>
          </Link>
        </Box>
        <Suspense>
          <NavSearch setHamburger={setHamburger} />
        </Suspense>
        <HStack
          ml={4}
          spacing={4}
          display={{
            base: 'none',
            xl: 'flex',
          }}
        >
          <DesktopNav />
          <ProfileNavMenu
            setVisibleMenu={setVisibleMenu}
            visibleMenu={visibleMenu}
          />
          <WalletNavMenu
            drawerOperations={drawerOperations}
            setHamburger={setHamburger}
            setVisibleMenu={setVisibleMenu}
          />
        </HStack>
        <HStack
          display={{
            base: 'flex',
            xl: 'none',
          }}
        >
          <WalletNavMenu
            drawerOperations={drawerOperations}
            setHamburger={setHamburger}
            setVisibleMenu={setVisibleMenu}
          />
          <IconButton
            onClick={() => setHamburger(!isHamburgerOpen)}
            icon={
              isHamburgerOpen ? (
                <CloseIcon w={4} h={4} />
              ) : (
                <HamburgerIcon boxSize={{ base: 6, lg: 7 }} />
              )
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </HStack>
      </Flex>
      {drawerOperations.isOpen && (
        <WagmiNeededComponent>
          <WalletDrawer
            finalFocusRef={loginButtonRef}
            setHamburger={setHamburger}
            toggleOperations={drawerOperations}
          />
        </WagmiNeededComponent>
      )}
      <Collapse
        in={isHamburgerOpen}
        animateOpacity
        style={{ margin: '0 -15px' }}
      >
        <MobileNav
          setHamburger={setHamburger}
          drawerOperations={drawerOperations}
        />
      </Collapse>
    </Box>
  )
}

export default Navbar
