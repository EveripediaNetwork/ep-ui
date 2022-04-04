import React, { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import config from '@/config'
import { RiMore2Fill } from 'react-icons/ri'
import { supportedTokens } from '@/data/SupportedToken'
import { ProviderDataType } from '@/types/ProviderDataType'
import detectEthereumProvider from '@metamask/detect-provider'

const TokenDetailsMenu = ({ token }: { token: string | undefined }) => {
  const [detectedProvider, setDetectedProvider] =
    useState<ProviderDataType | null>(null)

  useEffect(() => {
    const getDetectedProvider = async () => {
      const provider = await detectEthereumProvider()
      setDetectedProvider(provider as ProviderDataType)
    }

    if (!detectedProvider) {
      getDetectedProvider()
    }
  }, [detectedProvider])

  const handleAddTokenToMetamask = async (tokenSymbol: string | undefined) => {
    if (tokenSymbol === 'IQ') {
      detectedProvider?.sendAsync(
        {
          method: 'metamask_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: config.iqAddress,
              symbol: tokenSymbol,
              decimals: 18,
              image:
                'https://ipfs.everipedia.org/ipfs/QmXacPjgKBnpPgBsCdnavjqfndvfjnGG8UrQGt85r2XEXh',
            },
          },
        },
        () => {
          return null
        },
      )
    }
  }
  return (
    <Menu placement="left-start">
      <MenuButton>
        <RiMore2Fill color="color" fontSize="20" fontWeight="bold" />
      </MenuButton>
      {token && supportedTokens[token]?.isActive && (
        <MenuList
          onClick={() => handleAddTokenToMetamask(token)}
          boxShadow="xl"
        >
          <MenuItem>Add {token} token to Metamask</MenuItem>
        </MenuList>
      )}
    </Menu>
  )
}

export default TokenDetailsMenu
