import React, { useState, useEffect } from 'react'
import { Image, Spinner, Text } from '@chakra-ui/react'
import { Connector } from 'wagmi'
import { logEvent } from '@/utils/googleAnalytics'
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
}) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const handleConnect = (i: Connector) => {
    logEvent({
      action: 'LOGIN_ATTEMPT',
      params: { provider: i.name },
    })
    setIsClicked(true)
    connect(i)
  }
  useEffect(() => {
    if (!loading) setIsClicked(false)
  }, [loading])

  return (
    <WalletDetailsWrapper hasHover w={w} connect={handleConnect}>
      <>
        <Image boxSize="24px" src={imageLink} />
        <Text flex="1" as="strong" ml="15">
          {w.name === 'Magic' ? 'Email / Social Media' : w.name}
        </Text>
        {w.name === 'MetaMask' && !isClicked && (
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            popular
          </Text>
        )}
        {isClicked && loading && <Spinner size="sm" opacity={0.5} />}
      </>
    </WalletDetailsWrapper>
  )
}

export default ConnectorDetails
