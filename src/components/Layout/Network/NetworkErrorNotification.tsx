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
import config from '@/config'
import { useDispatch } from 'react-redux'
import networkMap from '@/data/NetworkMap'
import detectEthereumProvider from '@metamask/detect-provider'
import { useAddress } from '@/hooks/useAddress'
import { useSwitchNetwork } from 'wagmi'
import { walletClient } from '@/utils/WalletUtils/getProvider'

const NetworkErrorNotification = ({
  modalState,
  setModalState,
}: {
  modalState: boolean
  setModalState: (state: boolean) => void
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)

  const [detectedProvider, setDetectedProvider] =
    useState<ProviderDataType | null>(null)
  const { isConnected: isUserConnected } = useAddress()
  const dispatch = useDispatch()
  const toast = useToast()

  const { id: chainId } =
    config.alchemyChain === 'maticmum'
      ? networkMap.MUMBAI_TESTNET
      : networkMap.POLYGON_MAINNET

  const { switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    onError: (err) => {
      toast({
        title: 'Error switching network',
        description: `There was an error switching the network: ${
          err.message ?? 'Unknown error'
        }. Please try again.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setModalState(false)
    },
    onSuccess: () => {
      toast({
        title: 'Network switched',
        description: 'You have successfully switched to the new network.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setModalState(false)
    },
  })

  useEffect(() => {
    const getDetectedProvider = async () => {
      const provider = (await detectEthereumProvider({
        silent: true,
      })) as ProviderDataType
      setDetectedProvider(provider as ProviderDataType)
    }

    if (!detectedProvider) {
      getDetectedProvider()
    }
  }, [detectedProvider, dispatch, isUserConnected])

  const handleSwitchNetwork = async () => {
    const chain =
      config.alchemyChain === 'maticmum'
        ? networkMap.MUMBAI_TESTNET
        : networkMap.POLYGON_MAINNET

    try {
      await walletClient.addChain({
        chain,
      })

      if (switchNetwork) {
        switchNetwork(chainId)
      }
    } catch (error: any) {
      console.error('Error while adding chain:', error)

      toast({
        title: 'Error switching network',
        description: `There was an error switching the network: ${
          error.message || 'Unknown error'
        }. Please try again.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }

    setModalState(false)
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setModalState(false)}
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
              onClick={() => setModalState(false)}
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
              onClick={() => setModalState(false)}
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
