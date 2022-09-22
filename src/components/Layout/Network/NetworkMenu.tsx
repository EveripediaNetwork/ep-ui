import React, { Fragment, useState } from 'react'
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
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Network, Networks } from '@/data/NetworkData'
import networkMap from '@/utils/networkMap'
import config from '@/config'

const NetworkMenu = () => {
  const [currentNetwork, setCurrentNetwork] = useState<Network>(Networks[0])

  const { chainId } =
    config.alchemyChain === 'maticmum'
      ? networkMap.MUMBAI_TESTNET
      : networkMap.POLYGON_MAINNET

  const handleNetworkSwitch = (newNetwork: Network) => {
    if (newNetwork.chainId === chainId) {
      setCurrentNetwork(newNetwork)
    }
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        fontSize="md"
        fontWeight={600}
        variant="outline"
        leftIcon={<Image src={currentNetwork.image} />}
        rightIcon={<ChevronDownIcon />}
      >
        <Text fontSize="sm"> {currentNetwork.name} </Text>
      </MenuButton>
      <MenuList>
        <MenuGroup color="fadedText2" title="Select Network">
          {Networks.map((network, index) => (
            <Fragment key={index}>
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
            </Fragment>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default NetworkMenu
