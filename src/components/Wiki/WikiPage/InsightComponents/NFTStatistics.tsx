import React from 'react'
import { Flex } from '@chakra-ui/react'
import { NFTStats } from '@/services/nft-stats'

type NFTStatisticsProps = {
  nftStats?: NFTStats
}

const NFTStatistics = (props: NFTStatisticsProps) => {
  const { nftStats } = props

  if (!nftStats) return null

  return <Flex />
}

export default NFTStatistics
