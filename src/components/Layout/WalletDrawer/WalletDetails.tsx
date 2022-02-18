import React from 'react'
import { HStack, Image, Text, VStack } from '@chakra-ui/react'
import { RiMore2Fill } from 'react-icons/ri'
import { tokenDetails } from '@/data/WalletData'
import shortenBalance from '@/utils/shortenBallance'
import { TokenDetailsType } from '@/types/WalletBalanceType'
import { getTokenValue } from '@/utils/getTokenValue'
import WalletDetailsWrapper from './WalletDetailsWrapper'

const WalletDetails = ({
  symbol,
  balance,
  tokenArray,
}: {
  symbol: string | undefined
  balance: string | null
  tokenArray: TokenDetailsType[]
}) => (
    <WalletDetailsWrapper hasHover={false}>
      <>
        <HStack flex="1">
          <Image
            boxSize="23px"
            mr={3}
            src={`/images/${symbol && tokenDetails[symbol].logo}`}
          />
          <Text as="strong" fontWeight="extrabold">
            {symbol}
          </Text>
        </HStack>
        <HStack>
          <VStack align="flex-end">
            <Text fontWeight="extrabold">{balance}</Text>
            <Text mr={3} color="GrayText" fontSize="sm" fontWeight="bold">
              ${shortenBalance(getTokenValue(tokenArray, symbol))} USD
            </Text>
          </VStack>
          <RiMore2Fill color="color" fontSize="20" fontWeight="bold" />
        </HStack>
      </>
    </WalletDetailsWrapper>
  )

export default WalletDetails
