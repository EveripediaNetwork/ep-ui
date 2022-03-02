import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import detectEthereumProvider from '@metamask/detect-provider'
import config from '@/config'

const AddNetworkDetails = () => {
  const [detectedProvider, setDetectedProvider] = useState<any>()

  const handleAddIQERC20ToMetamask = async () =>
    detectedProvider.sendAsync(
      {
        method: 'metamask_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: config.iqAddress,
            symbol: 'IQ',
            decimals: 18,
            image:
              'https://pbs.twimg.com/profile_images/1414736076158033921/nResATsF_400x400.png',
          },
        },
        id: Math.round(Math.random() * 100000),
      },
      (err: any, added: any) => {
        console.log('provider returned', err, added)
        if (err || 'error' in added) {
          console.log(err)
        }
      },
    )

  const handleSwitchNetwork = async () =>
    detectedProvider.sendAsync(
      {
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: config.chainId,
            chainName: config.chainName,
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: [config.rpcUrl],
            blockExplorerUrls: [config.blockExplorerUrl],
          },
        ],
      },
      (err: any, added: any) => {
        console.log('provider returned', err, added)
        if (err || 'error' in added) {
          console.log(err)
        }
      },
    )

  useEffect(() => {
    const getDetectedProvider = async () => {
      const provider = await detectEthereumProvider()
      setDetectedProvider(provider)
    }
    getDetectedProvider()
  }, [])

  return (
    <Flex direction="column" justify="center" align="center">
      <small>Metamask only</small>
      <Flex direction="column" justify="center" align="center" w="75%">
        <Button variant="outline" w="50%" onClick={handleAddIQERC20ToMetamask}>
          Add IQ Token
          <br />
        </Button>
        <Button mt="3" w="50%" onClick={handleSwitchNetwork}>
          Switch Network
        </Button>
      </Flex>
    </Flex>
  )
}

export default AddNetworkDetails
