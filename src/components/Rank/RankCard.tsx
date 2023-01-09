import {
  useGetNFTRankingQuery,
  useGetTokenRankingQuery,
} from '@/services/ranking'
import { RankCardType } from '@/types/RankDataTypes'
import { Flex, Button, Icon, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { IconType } from 'react-icons/lib'
import { InvalidRankCardItem } from './InvalidRankCardItem'
import { LoadingRankCardSkeleton } from './LoadingRankCardSkeleton'
import { RankCardItem } from './RankCardItem'

interface RankCardProps {
  title: string
  icon: IconType
}

const NFT_LIMIT = 11
const COIN_LIMIT = 10

const RankCard = ({ title, icon }: RankCardProps) => {
  const [queryLimit, setQueryLimit] = useState<number>(1)

  const [rankCount, setRankCount] = useState<number>(0)

  let queryKind = ''

  useEffect(() => {
    setRankCount(queryLimit * 10 - 10)
  }, [queryLimit])

  if (title === 'NFTs') {
    queryKind = 'NFT'
  } else if (title === 'Cryptocurrencies') {
    queryKind = 'TOKEN'
  }

  let queryDataset: RankCardType[] | undefined = []

  const QueryTokens = () => {
    const { data: queryObject } = useGetTokenRankingQuery({
      kind: queryKind,
      limit: COIN_LIMIT,
      offset: queryLimit,
    })

    queryDataset = queryObject
  }

  const QueryNFTs = () => {
    const { data: queryObject } = useGetNFTRankingQuery({
      kind: queryKind,
      limit: NFT_LIMIT,
      offset: queryLimit,
    })

    queryDataset = queryObject
  }

  if (queryKind === 'NFT') {
    QueryNFTs()
  } else {
    QueryTokens()
  }

  const offsetIncrease = () => {
    if (queryDataset) {
      setQueryLimit(queryLimit + 1)
    }
  }
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true)
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
        {queryDataset?.map((item: RankCardType, index: number) => {
          if ((item?.nftMarketData || item?.tokenMarketData) && loadingAssets) {
            return (
              <RankCardItem
                cardData={item}
                key={index}
                index={rankCount + index + 1}
              />
            )
          }
          if (!loadingAssets) {
            return <LoadingRankCardSkeleton length={1} />
          }
          return (
            <InvalidRankCardItem
              index={rankCount + index + 1}
              cardType={queryKind}
            />
          )
        })}
        {!queryDataset && <LoadingRankCardSkeleton length={10} />}
        <Flex justifyContent="space-between" px={{ '2xl': 4, md: 2, base: 2 }}>
          <Button
            leftIcon={<AiOutlineDoubleLeft />}
            _hover={{ bg: 'transparent' }}
            p="0"
            bg="transparent"
            _active={{ bg: 'transparent' }}
            onClick={() => {
              setQueryLimit(queryLimit - 1)
              setLoadingAssets(false)
              setTimeout(() => {
                setLoadingAssets(true)
              }, 800)
            }}
            disabled={queryLimit <= 1}
            color="brand.500"
            _dark={{ color: 'brand.800' }}
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
              setLoadingAssets(false)
              setTimeout(() => {
                setLoadingAssets(true)
              }, 800)
            }}
            disabled={!queryDataset}
            color="brand.500"
            _dark={{ color: 'brand.800' }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default RankCard
