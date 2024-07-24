import React, { useState, useEffect } from 'react'
import { Image, Spinner, Text } from '@chakra-ui/react'
import { Connector } from 'wagmi'
import WalletDetailsWrapper from './WalletDetailsWrapper'
import { ConnectorDetailsType } from '@/types/WalletBalanceType'
import { usePostHog } from 'posthog-js/react'

const ConnectorDetails = ({
  imageLink,
  connector,
  connect,
  loading,
}: ConnectorDetailsType) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const posthog = usePostHog()

  const handleConnect = (selectedConnector: Connector) => {
    posthog.capture('login_attempt', {
      connector: selectedConnector.name,
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
          {connector.name === 'Magic'
            ? 'Email / Social Media'
            : connector.name.toLowerCase() === 'injected'
            ? 'Metamask'
            : connector.name}
        </Text>
        {connector.type === 'injected' && !isClicked && (
          <Text fontSize="sm" fontWeight="medium" color="fadedText2">
            popular
          </Text>
        )}
        {isClicked && loading && <Spinner size="sm" opacity={0.5} />}
      </>
    </WalletDetailsWrapper>
  )
}

export default ConnectorDetails
