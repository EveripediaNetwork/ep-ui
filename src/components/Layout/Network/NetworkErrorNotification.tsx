import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Flex,
  Text,
  Icon,
  Button,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri'
import { ProviderDataType } from '@/types/ProviderDataType'
import { useAccount } from 'wagmi'
import config from '@/config'
import { useDispatch } from 'react-redux'
import networkMap from '@/utils/networkMap'
import detectEthereumProvider from '@metamask/detect-provider'

const NetworkErrorNotification = () => {
  const cancelRef = React.useRef<FocusableElement>(null)

  const [openSwitch, setOpenSwitch] = useState<boolean>(false)
  const [detectedProvider, setDetectedProvider] =
    useState<ProviderDataType | null>(null)
  const { isConnected: isUserConnected, connector } = useAccount()
  const dispatch = useDispatch()

  const { chainId, chainName, rpcUrls } =
    config.alchemyChain === 'maticmum'
      ? networkMap.MUMBAI_TESTNET
      : networkMap.POLYGON_MAINNET

  const handleChainChanged = useCallback(
    (chainDetails: string) => {
      if (chainDetails !== chainId && isUserConnected && connector) {
        if (connector.id !== 'magic') setOpenSwitch(true)
      }
    },
    [chainId, connector, isUserConnected],
  )

  useEffect(() => {
    const getConnectedChain = async (provider: ProviderDataType) => {
      const connectedChainId = await provider.request({
        method: 'eth_chainId',
      })

      if (connectedChainId) handleChainChanged(connectedChainId)
    }

    const getDetectedProvider = async () => {
      const provider = (await detectEthereumProvider({
        silent: true,
      })) as ProviderDataType
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

  if (!openSwitch) return null
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setOpenSwitch(false)}
      isOpen={openSwitch}
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
              onClick={() => setOpenSwitch(false)}
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
              onClick={() => setOpenSwitch(false)}
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
