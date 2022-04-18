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
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { RiWallet2Line, RiAccountCircleLine } from 'react-icons/ri'
import { useAccount } from 'wagmi'
import { useDispatch } from 'react-redux'
import detectEthereumProvider from '@metamask/detect-provider'
import Link from '@/components/Elements/Link/Link'
import { Logo } from '@/components/Elements/'
import { NAV_ICON } from '@/data/NavItemData'
import NavMenu from '@/components/Layout/Navbar/NavMenu'
import { ColorModeToggle } from '@/components/Layout/Navbar/ColorModeToggle'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { useRouter } from 'next/router'
import { NavSearch } from '@/components/Layout/Navbar/NavSearch'
import networkMap from '@/utils/networkMap'
import NetworkErrorNotification from '@/components/Layout/Network/NetworkErrorNotification'
import { ProfileLink } from '@/components/Layout/Navbar/ProfileLink'
import { ProviderDataType } from '@/types/ProviderDataType'
import WalletDrawer from '../WalletDrawer/WalletDrawer'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

const Navbar = () => {
  const router = useRouter()

  const { isOpen, onClose, onToggle } = useDisclosure()

  const loginButtonRef = useRef<HTMLButtonElement>(null)

  const [visibleMenu, setVisibleMenu] = useState<number | null>(null)

  const [openSwitch, setOpenSwitch] = useState<boolean>(false)

  const [isHamburgerOpen, setHamburger] = useState<boolean>(false)

  const [detectedProvider, setDetectedProvider] =
    useState<ProviderDataType | null>(null)

  const [{ data: accountData }] = useAccount()

  const dispatch = useDispatch()

  const { chainId, chainName, rpcUrls } = networkMap.MUMBAI_TESTNET

  const handleWalletIconAction = () => {
    if (isHamburgerOpen) {
      setHamburger(false)
    }
    onToggle()
  }

  const handleChainChanged = useCallback(
    (chainDetails: string) => {
      if (chainDetails !== chainId) {
        setOpenSwitch(true)
      }
    },
    [chainId],
  )

  useEffect(() => {
    const handleRouteChange = () => isOpen && onToggle()
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, isOpen, onToggle])

  useEffect(() => {
    const getConnectedChain = async (provider: any) => {
      const connectedChainId = await provider.request({
        method: 'eth_chainId',
      })
      handleChainChanged(connectedChainId)
    }

    const getDetectedProvider = async () => {
      const provider = await detectEthereumProvider()
      setDetectedProvider(provider as ProviderDataType)
      if (provider) getConnectedChain(provider)
    }

    if (!detectedProvider) {
      getDetectedProvider()
    } else {
      detectedProvider.on('chainChanged', handleChainChanged)
    }

    return () => {
      if (detectedProvider) {
        detectedProvider.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [detectedProvider, handleChainChanged, dispatch])

  const handleSwitchNetwork = async () => {
    try {
      await detectedProvider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      setOpenSwitch(false)
    } catch (switchError: any) {
      if (switchError.code === 4902) {
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
      <Box
        boxShadow="sm"
        position="fixed"
        zIndex={1500}
        w="full"
        h={{ base: isHamburgerOpen ? '100%' : '20', md: 20 }}
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
                <Box onMouseLeave={() => setVisibleMenu(null)}>
                  <NavMenu
                    navItem={NAV_ICON}
                    setVisibleMenu={setVisibleMenu}
                    visibleMenu={visibleMenu}
                    label={
                      accountData ? (
                        <DisplayAvatar address={accountData.address} />
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
                    <ProfileLink />
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
                  as={RiWallet2Line}
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
                      <HamburgerIcon w={5} h={5} />
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
