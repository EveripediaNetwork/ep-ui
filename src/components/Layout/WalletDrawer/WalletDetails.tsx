import React from 'react'
import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import shortenBalance from '@/utils/shortenBallance'
import { TokenDetailsType } from '@/types/WalletBalanceType'
import { getTokenValue } from '@/utils/getTokenValue'
import { tokenDetails } from '@/data/WalletData'
import dynamic from 'next/dynamic'
import TokenDetailsMenu from '../Token/TokenDetailsMenu'

const DeferredWalletDetailsWrapper = dynamic(
  () => import('./DeferredWalletDetailsWrapper'),
  { ssr: false },
)

const WalletDetails = ({
  symbol,
  balance,
  tokensArray,
}: {
  symbol: string | undefined
  balance: string | null
  tokensArray: TokenDetailsType[]
}) => (
  <DeferredWalletDetailsWrapper hasHover={false}>
    <>
      <HStack flex="1">
        <Image
          objectFit="contain"
          boxSize="23px"
          mr={3}
          src={`/images/${symbol && tokenDetails[symbol]?.logo}`}
        />
        <Text as="strong" fontWeight="bold">
          {symbol}
        </Text>
      </HStack>
      <HStack>
        <VStack spacing="0" align="flex-end">
          <Text fontWeight="bold">{balance}</Text>
          <Text mr={3} color="GrayText" fontSize="smaller" fontWeight="bold">
            ${shortenBalance(getTokenValue(tokensArray, symbol))}
          </Text>
        </VStack>
        <TokenDetailsMenu token={symbol} />
      </HStack>
    </>
  </DeferredWalletDetailsWrapper>
)

export default WalletDetails
