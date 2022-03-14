import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import config from '@/config'
import { RootState } from '@/store/store'
import { RiMore2Fill } from 'react-icons/ri'

const TokenDetailsMenu = ({ token }: { token: string | undefined }) => {
  const { detectedProvider } = useSelector(
    (state: RootState) => state.providerNetwork,
  )

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
      <MenuList onClick={() => handleAddTokenToMetamask(token)} boxShadow="xl">
        <MenuItem>Add {token} token to Metamask</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default TokenDetailsMenu
