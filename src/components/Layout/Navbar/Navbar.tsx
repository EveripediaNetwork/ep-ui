import React, { useRef, useState, useEffect, useCallback } from 'react'
import {
  Box,
  Collapse,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
  HStack,
  Heading,
  SkeletonCircle,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { RiWalletLine } from 'react-icons/ri'
import { useAccount } from 'wagmi'
import { useDispatch } from 'react-redux'
import config from '@/config'
import detectEthereumProvider from '@metamask/detect-provider'
import Link from '@/components/Elements/Link/Link'
import { Logo } from '@/components/Elements/'
import { useRouter } from 'next/router'
import { NavSearch } from '@/components/Layout/Navbar/NavSearch'
import networkMap from '@/utils/networkMap'
import NetworkErrorNotification from '@/components/Layout/Network/NetworkErrorNotification'
import { ProviderDataType } from '@/types/ProviderDataType'
import { logEvent } from '@/utils/googleAnalytics'
import dynamic from 'next/dynamic'
import SearchSEO from '@/components/SEO/Search'
import WalletDrawer from '../WalletDrawer/WalletDrawer'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const ProfileNavMenu = dynamic(() => import('./ProfileNavItem'), {
  ssr: false,
  loading: () => (
    <Box pr={4}>
      <SkeletonCircle size="25px" startColor="gray.500" endColor="gray.500" />
    </Box>
  ),
})

const Navbar = () => {
  const router = useRouter()
  const { isOpen, onClose, onToggle } = useDisclosure()
  const loginButtonRef = useRef<HTMLButtonElement>(null)
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)
  const [openSwitch, setOpenSwitch] = useState<boolean>(false)
  const [isHamburgerOpen, setHamburger] = useState<boolean>(false)
  const [detectedProvider, setDetectedProvider] =
    useState<ProviderDataType | null>(null)
  const {
    address: userAddress,
    isConnected: isUserConnected,
    connector,
  } = useAccount()
  const dispatch = useDispatch()

  const { chainId, chainName, rpcUrls } =
    config.alchemyChain === 'maticmum'
      ? networkMap.MUMBAI_TESTNET
      : networkMap.POLYGON_MAINNET

  const handleWalletIconAction = () => {
    logEvent({
      action: 'OPEN_DRAWER',
      params: { address: userAddress },
    })
    if (isHamburgerOpen) {
      setHamburger(false)
    }
    onToggle()
  }

  const handleChainChanged = useCallback(
    (chainDetails: string) => {
      if (chainDetails !== chainId && isUserConnected && connector) {
        if (connector.id !== 'magic') setOpenSwitch(true)
      }
    },
    [chainId, connector, isUserConnected],
  )

  useEffect(() => {
    const handleRouteChange = () => isOpen && onToggle()
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, isOpen, onToggle])

  useEffect(() => {
    const getConnectedChain = async (provider: ProviderDataType) => {
      const connectedChainId = await provider.request({
        method: 'eth_chainId',
      })

      if (connectedChainId) handleChainChanged(connectedChainId)
    }

    const getDetectedProvider = async () => {
      const provider = (await detectEthereumProvider()) as ProviderDataType
      setDetectedProvider(provider as ProviderDataType)
      if (provider) getConnectedChain(provider)
    }

    if (!detectedProvider) {
      getDetectedProvider()
    } else {
      getConnectedChain(detectedProvider)
      detectedProvider.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (detectedProvider) {
        detectedProvider.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [detectedProvider, handleChainChanged, dispatch, isUserConnected])

  const handleSwitchNetwork = async () => {
    try {
      await detectedProvider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      setOpenSwitch(false)
    } catch (switchError) {
      const err = switchError as Record<string, number>
      if (err.code === 4902) {
        try {
          await detectedProvider?.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId,
                chainName,
                rpcUrls,
              },
            ],
          })
          setOpenSwitch(false)
        } catch (addError) {
          return null
        }
      }
    }
    return null
  }

  return (
    <>
      <SearchSEO />
      <Box
        boxShadow="sm"
        position="fixed"
        zIndex="banner"
        w="full"
        h={{ base: isHamburgerOpen ? '100%' : 'unset', md: 'unset' }}
        bg="subMenuBg"
        borderBottomWidth={1}
      >
        <Flex mx="auto" align="center">
          <Box flex={1}>
            <Flex
              gap={{ base: 8, lg: 40, xl: 8 }}
              h="70px"
              alignItems="center"
              justifyContent="space-between"
              px={{ base: 4, md: 8 }}
            >
              <Link
                href="/"
                mr={{ base: 0, xl: '9vw' }}
                _hover={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
              >
                <HStack width="150px">
                  <Logo />
                  <Heading
                    size="md"
                    color="gray.900"
                    _dark={{ color: 'white' }}
                  >
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
                <ProfileNavMenu
                  setVisibleMenu={setVisibleMenu}
                  visibleMenu={visibleMenu}
                  address={userAddress}
                />
                <Icon
                  color="linkColor"
                  cursor="pointer"
                  fontSize="3xl"
                  onClick={handleWalletIconAction}
                  fontWeight={600}
                  as={RiWalletLine}
                  onMouseEnter={() => setVisibleMenu(null)}
                  _hover={{
                    textDecoration: 'none',
                    color: 'linkHoverColor',
                  }}
                />
              </HStack>
              <HStack
                display={{
                  base: 'flex',
                  xl: 'none',
                }}
              >
                <Icon
                  display={{ base: 'none', md: 'flex' }}
                  color="linkColor"
                  cursor="pointer"
                  fontSize="3xl"
                  onClick={handleWalletIconAction}
                  fontWeight={600}
                  as={RiWalletLine}
                  onMouseEnter={() => setVisibleMenu(null)}
                  _hover={{
                    textDecoration: 'none',
                    color: 'linkHoverColor',
                  }}
                />
                <IconButton
                  onClick={() => setHamburger(!isHamburgerOpen)}
                  icon={
                    isHamburgerOpen ? (
                      <CloseIcon w={4} h={4} />
                    ) : (
                      <HamburgerIcon
                        boxSize={{ base: 6, lg: 7 }}
                        ml={{ base: 4, lg: 0 }}
                      />
                    )
                  }
                  variant="ghost"
                  aria-label="Toggle Navigation"
                />
              </HStack>
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
          <MobileNav
            setHamburger={setHamburger}
            toggleWalletDrawer={onToggle}
          />
        </Collapse>
      </Box>
      <NetworkErrorNotification
        switchNetwork={handleSwitchNetwork}
        onClose={() => setOpenSwitch(false)}
        isOpen={openSwitch}
      />
    </>
  )
}

export default Navbar
