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

  const { chainId, chainName, rpcUrls } =
    config.alchemyChain === 'maticmum'
      ? networkMap.MUMBAI_TESTNET
      : networkMap.POLYGON_MAINNET

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
    try {
      await detectedProvider?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      setModalState(false)

      toast({
        title: 'Network switched',
        description: 'You have successfully switched to the new network.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (switchError) {
      const err = switchError as Record<string, any>
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
          setModalState(false)

          toast({
            title: 'Network added and switched',
            description:
              'You have successfully added and switched to the new network.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        } catch (_addError) {
          toast({
            title: 'Error adding network',
            description:
              'There was an error adding the new network. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      } else {
        toast({
          title: 'Error switching network',
          description: `There was an error switching the network: ${
            err.message || 'Unknown error'
          }. Please try again.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setModalState(false)}
      isOpen={modalState}
      isCentered
      size={{ base: 'md', md: 'lg' }}
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
