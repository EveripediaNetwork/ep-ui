import React, { memo, RefObject, useState } from 'react'
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  MenuButton,
  Menu,
  HStack,
  MenuList,
  MenuItem,
  Spinner,
  useToast,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { FocusableElement } from '@chakra-ui/utils'
import { RiArrowLeftSLine, RiRefreshLine } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { shortenAccount } from '@/utils/textUtils'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import DisplayAvatar from '@/components/Elements/Avatar/DisplayAvatar'
import { useDispatch } from 'react-redux'
import { updateWalletDetails } from '@/store/slices/user-slice'
import NetworkMenu from '@/components/Layout/Network/NetworkMenu'
import { useENSData } from '@/hooks/useENSData'
import { useHiIQBalance } from '@/hooks/useHiIQBalance'
import { useFetchWalletBalance } from '@/hooks/UseFetchWallet'
import CopyIcon from '@/components/Icons/CopyIcon'
import { Link } from '@/components/Elements'
import { useTranslation } from 'next-i18next'
import { ColorModeToggle } from '../Navbar/ColorModeToggle'
import { LogOutBtn } from '../Navbar/Logout'
import { ProfileLink } from '../Navbar/ProfileLink'
import { SettingsLink } from '../Navbar/SettingsLink'

type WalletDrawerType = {
  toggleOperations: {
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
  }
  finalFocusRef: RefObject<FocusableElement>
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletDrawer = ({
  toggleOperations,
  finalFocusRef,
  setHamburger,
}: WalletDrawerType) => {
  const { address: userAddress, isConnected: isUserConnected } = useAccount()
  const [, username] = useENSData(userAddress)
  useHiIQBalance(userAddress)
  const [accountRefreshLoading, setAccountRefreshLoader] =
    useState<boolean>(false)
  const toast = useToast()
  const { refreshBalance } = useFetchWalletBalance(userAddress)
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const handleNavigation = () => {
    toggleOperations.onClose()
    setHamburger(true)
  }

  const handleAccountRefresh = () => {
    if (typeof userAddress !== 'undefined') {
      setAccountRefreshLoader(true)
      refreshBalance().then((response) => {
        dispatch(updateWalletDetails(response))
        setAccountRefreshLoader(false)
        toast({
          description: 'Account successfully refreshed',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'bottom-right',
        })
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userAddress as string)
    toast({
      description: 'Address copied to clipboard',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    })
  }

  return toggleOperations.isOpen ? (
    <Drawer
      isOpen={toggleOperations.isOpen}
      onClose={toggleOperations.onClose}
      placement="right"
      finalFocusRef={finalFocusRef}
      trapFocus={false}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader mt={7}>
          <Flex
            w="full"
            cursor="pointer"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <HStack flex="1">
              <Box
                onClick={handleNavigation}
                display={{ sm: 'block', md: 'none' }}
              >
                <RiArrowLeftSLine size="30" />
              </Box>
              <DisplayAvatar address={userAddress} alt={userAddress} />
              <Box>
                <Menu>
                  <MenuButton pl={1} fontSize="md" fontWeight={600}>
                    {t('myWallet')} {isUserConnected && <ChevronDownIcon />}
                  </MenuButton>
                  {isUserConnected && (
                    <MenuList py={0}>
                      <MenuItem
                        onClick={handleAccountRefresh}
                        closeOnSelect={false}
                        py={3}
                        icon={<RiRefreshLine size={25} />}
                      >
                        <Flex>
                          <Text flex="1" fontSize="small" fontWeight="bold">
                            Refresh
                          </Text>
                          {accountRefreshLoading && <Spinner size="sm" />}
                        </Flex>
                      </MenuItem>
                    </MenuList>
                  )}
                </Menu>
                {isUserConnected && (
                  <HStack>
                    <Link
                      fontSize="sm"
                      color="fadedText2"
                      href={`/account/${userAddress}`}
                      pl={1}
                    >
                      {username || (userAddress && shortenAccount(userAddress))}
                    </Link>
                    <Icon
                      cursor="pointer"
                      as={CopyIcon}
                      onClick={copyToClipboard}
                    />
                  </HStack>
                )}
              </Box>
            </HStack>
            <NetworkMenu />
          </Flex>
        </DrawerHeader>
        <Divider />
        <DrawerBody shadow="sm">
          <Connectors openWalletDrawer={toggleOperations.onOpen} />
          {isUserConnected && (
            <>
              <Divider py={2} />
              <VStack alignItems="flex-start">
                <ProfileLink />
                <SettingsLink />
                <ColorModeToggle isInMobileMenu={false} />
                {userAddress && <LogOutBtn isInMobileMenu={false} />}
              </VStack>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ) : null
}

export default memo(WalletDrawer)
