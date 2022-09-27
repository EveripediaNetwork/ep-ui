import React, { useState, useEffect } from 'react'
import { Image, Spinner, Text } from '@chakra-ui/react'
import { Connector } from 'wagmi'
import { logEvent } from '@/utils/googleAnalytics'
import WalletDetailsWrapper from './WalletDetailsWrapper'

const DeferredConnectorDetails = ({
  imageLink,
  connector,
  connect,
  loading,
}: {
  imageLink: string
  connector: Connector
  connect: (args: { connector: Connector }) => void
  loading?: boolean
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const handleConnect = (selectedConnector: Connector) => {
    logEvent({
      action: 'LOGIN_ATTEMPT',
      params: { provider: selectedConnector.name },
    })
    setIsClicked(true)
    connect({ connector: selectedConnector })
  }
  useEffect(() => {
    if (!loading) setIsClicked(false)
  }, [loading])

  return (
    <WalletDetailsWrapper hasHover w={connector} connect={handleConnect}>
      <>
        <Image boxSize="24px" src={imageLink} />
        <Text flex="1" as="strong" ml="15">
          {connector.name === 'Magic' ? 'Email / Social Media' : connector.name}
        </Text>
        {connector.name === 'MetaMask' && !isClicked && (
          <Text fontSize="sm" fontWeight="medium" color="fadedText2">
            popular
          </Text>
        )}
        {isClicked && loading && <Spinner size="sm" opacity={0.5} />}
      </>
    </WalletDetailsWrapper>
  )
}

export default DeferredConnectorDetails
