import React, { useState, useEffect } from 'react'
import {
  Divider,
  Text,
  MenuButton,
  Menu,
  Image,
  MenuList,
  MenuItem,
  Button,
  MenuGroup,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import detectEthereumProvider from '@metamask/detect-provider'
import { Network, Networks } from '@/data/NetworkData'
import networkMap from '@/utils/networkMap'
import NetworkErrorNotification from '@/components/Layout/Network/NetworkErrorNotification'

const NetworkMenu = () => {
  const [currentNetwork, setCurrentNetwork] = useState<Network>(Networks[0])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [detectedProvider, setDetectedProvider] = useState<any>()
  const { chainId, chainName, rpcUrls } = networkMap.MUMBAI_TESTNET

  const handleChainChanged = (chainDetails: string) => {
    if (chainDetails !== chainId) {
      onOpen()
    }
  }

  useEffect(() => {
    const getConnectedChain = async (provider: any) => {
      const connectedChainId = await provider.request({
        method: 'eth_chainId',
      })
      handleChainChanged(connectedChainId)
    }

    const getDetectedProvider = async () => {
      const provider: any = await detectEthereumProvider()
      setDetectedProvider(provider)
      getConnectedChain(provider)
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
  }, [detectedProvider])

  const handleNetworkSwitch = (newNetwork: Network) => {
    if (newNetwork.chainId !== chainId) {
      onOpen()
      return
    }
    setCurrentNetwork(newNetwork)
  }

  const handleSwitchNetwork = async () => {
    try {
      await detectedProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
      onClose()
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await detectedProvider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId,
                chainName,
                rpcUrls,
              },
            ],
          })
          onClose()
        } catch (addError) {
          console.log(addError)
        }
      }
    }
  }

  return (
    <>
      <Menu>
        <MenuButton pl={1} fontSize="md" fontWeight={600}>
          <Button
            variant="outline"
            leftIcon={<Image src={currentNetwork.image} />}
            rightIcon={<ChevronDownIcon />}
          >
            <Text fontSize="sm"> {currentNetwork.name} </Text>
          </Button>
        </MenuButton>
        <MenuList>
          <MenuGroup color="gray.500" title="Select Network">
            {Networks.map((network, index) => (
              <>
                <MenuItem
                  isDisabled={!network.isActive}
                  py={3}
                  onClick={() => handleNetworkSwitch(network)}
                >
                  <Image
                    boxSize="24px"
                    borderRadius="full"
                    src={network.image}
                    alt={network.name}
                    mr={3}
                  />
                  <Text fontSize="small" fontWeight="bold">
                    {network.name}
                  </Text>
                </MenuItem>
                {index < Networks.length - 1 && <Divider />}
              </>
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>
      <NetworkErrorNotification
        switchNetwork={handleSwitchNetwork}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  )
}

export default NetworkMenu
