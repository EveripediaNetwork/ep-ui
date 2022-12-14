import {
  useGetNFTRankingQuery,
  useGetTokenRankingQuery,
} from '@/services/ranking'
import { RankCardType } from '@/types/RankDataTypes'
import { Flex, Button, Icon, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { IconType } from 'react-icons/lib'
import { InvalidRankCardItem } from './InvalidRankCardItem'
import { LoadingRankCardSkeleton } from './LoadingRankCardSkeleton'
import { RankCardItem } from './RankCardItem'

interface RankCardProps {
  title: string
  icon: IconType
}
const RankCard = ({ title, icon }: RankCardProps) => {
  const [queryLimit, setQueryLimit] = useState<number>(0)

  let queryKind = ''

  if (title === 'NFTs') {
    queryKind = 'NFT'
  } else if (title === 'Cryptocurrencies') {
    queryKind = 'TOKEN'
  }
  // eslint-disable-next-line
  const { data: nftsQuery } =
    queryKind === 'NFT'
      ? // eslint-disable-next-line
        useGetNFTRankingQuery({
          kind: queryKind,
          limit: 10,
          offset: queryLimit,
        }) // eslint-disable-next-line
      : useGetTokenRankingQuery({
          kind: queryKind,
          limit: 10,
          offset: queryLimit,
        })

  const queryResult = nftsQuery

  const offsetIncrease = () => {
    if (queryResult) {
      setQueryLimit(queryLimit + 1)
    }
  }
  return (
    <Flex
      w={{ lg: '46%', md: '49%', base: '100%' }}
      border="1px solid"
      borderColor="rankCardBorder"
      borderRadius="lg"
      flexDirection="column"
      mb={4}
      height="fit-content"
      py={{ '2xl': 4, md: 2, base: 2 }}
    >
      <Flex
        gap="1"
        mb="4"
        alignItems="center"
        px={{ '2xl': 4, md: 2, base: 2 }}
      >
        <Icon
          as={icon}
          w={{ lg: '24px', md: '18px' }}
          h={{ lg: '24px', md: '18px' }}
          color="primaryPinkIcon"
        />
        <Text fontSize={{ lg: 'xl', md: 'sm' }}>{title}</Text>
      </Flex>
      <Flex flexDir="column" gap={{ '2xl': 6, lg: 4 }}>
        {queryResult?.map((item: RankCardType, index: number) => {
          if (item?.nftMarketData || item?.tokenMarketData) {
            return <RankCardItem cardData={item} key={index} index={index} />
          }
          return <InvalidRankCardItem index={index} />
        })}
        {!queryResult && <LoadingRankCardSkeleton />}
        <Flex justifyContent="space-between" px={{ '2xl': 4, md: 2, base: 2 }}>
          <Button
            leftIcon={<AiOutlineDoubleLeft />}
            _hover={{ bg: 'transparent' }}
            p="0"
            bg="transparent"
            _active={{ bg: 'transparent' }}
            onClick={() => {
              setQueryLimit(queryLimit - 1)
            }}
            disabled={queryLimit <= 0}
            color="brand.500"
          >
            Prev
          </Button>
          <Button
            rightIcon={<AiOutlineDoubleRight />}
            _hover={{ bg: 'transparent' }}
            p="0"
            bg="transparent"
            _active={{ bg: 'transparent' }}
            onClick={() => {
              offsetIncrease()
            }}
            disabled={!queryResult}
            color="brand.500"
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RankCard
