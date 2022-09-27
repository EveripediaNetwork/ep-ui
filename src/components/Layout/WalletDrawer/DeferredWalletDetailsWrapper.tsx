import React from 'react'
import { Flex } from '@chakra-ui/react'
import { Connector } from 'wagmi'

const DeferredWalletDetailsWrapper = ({
  children,
  w,
  connect,
  hasHover,
}: {
  children: JSX.Element
  connect?: (w: Connector) => void
  w?: Connector
  hasHover: boolean
}) => {
  const handleClick = () => {
    if (connect && w) {
      connect(w)
    }
  }
  return (
    <Flex
      w="full"
      p={4}
      cursor="pointer"
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      _hover={{
        boxShadow: hasHover && 'lg',
        bgColor: hasHover && 'hoverBg',
      }}
      _focus={{
        boxShadow: hasHover && 'lg',
        bgColor: hasHover && 'hoverBg',
      }}
      onClick={handleClick}
    >
      {children}
    </Flex>
  )
}

export default DeferredWalletDetailsWrapper
