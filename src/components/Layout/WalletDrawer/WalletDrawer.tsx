import React, { memo, RefObject } from 'react'
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
  Image,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { FocusableElement } from '@chakra-ui/utils'
import {
  RiArrowLeftSLine,
  RiLogoutBoxRLine,
  RiRefreshLine,
} from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'
import shortenAccount from '@/utils/shortenAccount'
import Connectors from '@/components/Layout/WalletDrawer/Connectors'
import { walletsLogos } from '@/data/WalletData'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'

type WalletDrawerType = {
  isOpen: boolean
  onClose: () => void
  finalFocusRef: RefObject<FocusableElement>
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>
}

const WalletDrawer = ({
  isOpen,
  onClose,
  finalFocusRef,
  setHamburger,
}: WalletDrawerType) => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  const handleNavigation = () => {
    onClose()
    setHamburger(true)
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      finalFocusRef={finalFocusRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader mt={20}>
          <Flex
            w="full"
            cursor="pointer"
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            mb="2"
          >
            <HStack flex="1">
              <Box
                onClick={handleNavigation}
                display={{ sm: 'block', md: 'none' }}
              >
                <RiArrowLeftSLine size="30" />
              </Box>
              <DisplayAvatar accountData={accountData} />
              <Menu>
                <MenuButton pl={1} fontSize="md" fontWeight={600}>
                  My Wallet {accountData && <ChevronDownIcon />}
                </MenuButton>
                {accountData && (
                  <MenuList>
                    <MenuItem py={3}>
                      <Image
                        boxSize="24px"
                        borderRadius="full"
                        src={`/images/${walletsLogos[0]}`}
                        alt="MetaMask"
                        mr={3}
                      />
                      <Text fontSize="small" fontWeight="bold">
                        MetaMask
                      </Text>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={disconnect}
                      py={3}
                      icon={<RiLogoutBoxRLine size={25} />}
                    >
                      <Text fontSize="small" fontWeight="bold">
                        Logout
                      </Text>
                    </MenuItem>
                    <Divider />
                    <MenuItem py={3} icon={<RiRefreshLine size={25} />}>
                      <Text fontSize="small" fontWeight="bold">
                        Refresh
                      </Text>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </HStack>
            {accountData && (
              <Text color="gray.500" textAlign="center" fontSize="medium">
                {accountData?.ens?.name
                  ? `${accountData.ens?.name}`
                  : shortenAccount(accountData?.address)}
              </Text>
            )}
          </Flex>
        </DrawerHeader>
        <Divider />
        <DrawerBody shadow="sm">
          <Connectors />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default memo(WalletDrawer)
