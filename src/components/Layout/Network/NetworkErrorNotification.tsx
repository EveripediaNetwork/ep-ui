import React, { useEffect, useState } from 'react'
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Flex,
  Text,
  Icon,
  Button,
  useToast,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri'
import { ProviderDataType } from '@/types/ProviderDataType'
import { useAccount, useSwitchChain } from 'wagmi'
import { useDispatch } from 'react-redux'
import detectEthereumProvider from '@metamask/detect-provider'

const NetworkErrorNotification = ({
  modalState,
  setModalState,
  setNetworkSwitchAttempted,
}: {
  modalState: boolean
  setModalState: (state: boolean) => void
  setNetworkSwitchAttempted: (state: boolean) => void
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)
  const { chains, switchChainAsync } = useSwitchChain()
  const toast = useToast()

  const [detectedProvider, setDetectedProvider] =
    useState<ProviderDataType | null>(null)
  const { isConnected: isUserConnected } = useAccount()
  const dispatch = useDispatch()

  useEffect(() => {
    const getDetectedProvider = async () => {
      const provider = (await detectEthereumProvider({
        silent: true,
      })) as ProviderDataType
      setDetectedProvider(provider)
    }

    if (!detectedProvider) {
      getDetectedProvider()
    }
  }, [detectedProvider, dispatch, isUserConnected])

  const handleSwitchNetwork = async () => {
    setNetworkSwitchAttempted(true)

    try {
      await switchChainAsync({ chainId: chains[0].id })
      setModalState(false)
      toast({
        title: 'Chain successfully switched 🎊',
        status: 'success',
      })
    } catch (_) {
      setModalState(false)
      toast({
        title: 'Error switching chain 🎊',
        status: 'error',
      })
    }

    return true
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {
        setModalState(false)
        setNetworkSwitchAttempted(true)
      }}
      isOpen={modalState}
      isCentered
      size="lg"
    >
      <AlertDialogOverlay />
      <AlertDialogContent width={{ base: '90%', lg: '100%' }}>
        <Box p={8}>
          <Flex>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiErrorWarningFill}
              mr={5}
            />
            <Text flex="1" fontSize="xl" fontWeight="black">
              Switch Network
            </Text>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={() => {
                setModalState(false)
                setNetworkSwitchAttempted(true)
              }}
            />
          </Flex>
          <Text mt="6" w="90%" lineHeight="2">
            Your wallet is currently connected to an unsupported network. To
            continue with Polygon network, Switch the network in your wallet to
            Polygon.
          </Text>
          <Text mt="6" w="90%" lineHeight="2">
            Switch wallet if unable to change wallet network.
          </Text>
          <Flex mt="6">
            <Text
              onClick={() => {
                setModalState(false)
                setNetworkSwitchAttempted(true)
              }}
              color="primary"
              cursor="pointer"
              pt={2}
              flex="1"
              fontSize="sm"
              fontWeight="bold"
            >
              Dismiss
            </Text>
            <Button onClick={handleSwitchNetwork} variant="outline">
              Switch Network
            </Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NetworkErrorNotification
