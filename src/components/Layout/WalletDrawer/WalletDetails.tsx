import React from 'react'
import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { TokenDetailsType } from '@/types/WalletBalanceType'
import { tokenDetails } from '@/data/WalletData'
import { getTokenValue } from '@/utils/WalletUtils/getTokenValue'
import { shortenBalance } from '@/utils/textUtils'
import WalletDetailsWrapper from './WalletDetailsWrapper'
import TokenDetailsMenu from '../Token/TokenDetailsMenu'

const WalletDetails = ({
  symbol,
  balance,
  tokensArray,
}: {
  symbol: string | undefined
  balance: string | null
  tokensArray: TokenDetailsType[]
}) => (
  <WalletDetailsWrapper hasHover={false}>
    <>
      <HStack flex="1">
        <Image
          objectFit="contain"
          boxSize="23px"
          mr={3}
          src={`/images/logos/${symbol && tokenDetails[symbol]?.logo}`}
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
  </WalletDetailsWrapper>
)

export default WalletDetails
