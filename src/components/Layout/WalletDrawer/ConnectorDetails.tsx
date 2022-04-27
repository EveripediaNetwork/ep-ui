import React from 'react'
import { Image, Spinner, Text } from '@chakra-ui/react'
import { Connector } from 'wagmi'
import WalletDetailsWrapper from './WalletDetailsWrapper'

const ConnectorDetails = ({
  imageLink,
  w,
  connect,
  loading,
}: {
  imageLink: string
  w: Connector
  connect: (w: Connector) => void
  loading?: boolean
}) => (
  <WalletDetailsWrapper hasHover w={w} connect={connect}>
    <>
      <Image boxSize="24px" src={imageLink} />
      <Text flex="1" as="strong" ml="15">
        {w.name}
      </Text>
      {w.name === 'MetaMask' && (
        <Text fontSize="sm" fontWeight="medium" color="gray.500">
          popular
        </Text>
      )}
      {w.name === 'Magic Link' && loading && (
        <Spinner size="sm" opacity={0.5} />
      )}
    </>
  </WalletDetailsWrapper>
)

export default ConnectorDetails
