import React from 'react'
import { VStack } from '@chakra-ui/react'
import { NFTStats } from '@/services/nft-stats'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import AccordionWidget from '@/components/Wiki/WikiAccordion/AccordionWidget'

type NFTStatisticsProps = {
  nftStats?: NFTStats
}

type NFTStatsData =
  | {
      type: 'statistic'
      title: string
      titleTag?: string
      content: {
        value: string
        change: string
        changeDirection?: 'increase' | 'decrease'
      }
    }
  | {
      type: 'market-statistics'
      title: string
      titleTag?: string
      content: {
        value: string
      }
    }

const NFTStatistics = (props: NFTStatisticsProps) => {
  const { nftStats } = props

  if (!nftStats) return null

  const getStatDirection = (stat: number) => {
    if (stat === 0) return undefined
    if (stat > 0) return 'increase'
    return 'decrease'
  }

  const statChange = (stat: number) => {
    return `${stat.toFixed(2)}%`
  }

  const statWithCommas = (stat: number, type?: string) => {
    const transformStat = `${stat
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

    const statValue = type === 'currency' ? `$${transformStat}` : transformStat
    return statValue
  }

  const NFTStatisticsData: NFTStatsData[] = [
    {
      type: 'market-statistics',
      title: 'Floor Price',
      content: {
        value: statWithCommas(nftStats.floor_price.usd, 'currency'),
      },
    },
    {
      type: 'market-statistics',
      title: 'Market Cap',
      content: {
        value: statWithCommas(nftStats.market_cap.usd, 'currency'),
      },
    },
    {
      type: 'market-statistics',
      title: 'Volume',
      titleTag: '24h',
      content: {
        value: statWithCommas(nftStats.volume_24h.usd, 'currency'),
      },
    },
    {
      type: 'statistic',
      title: 'Owners',
      content: {
        value: statWithCommas(nftStats.number_of_unique_addresses),
        change: statChange(
          nftStats.number_of_unique_addresses_24h_percentage_change,
        ),
        changeDirection: getStatDirection(
          nftStats.number_of_unique_addresses_24h_percentage_change,
        ),
      },
    },
    {
      type: 'market-statistics',
      title: 'Total Assets',
      content: {
        value: statWithCommas(nftStats.total_supply),
      },
    },
  ]

  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion
        withNoDarkBg
        display="flex"
        flexDir="column"
        gap={2}
        title="NFT Market Statistics"
      >
        {NFTStatisticsData.map((item, index) => (
          <AccordionWidget key={index} {...item} />
        ))}
      </WikiAccordion>
    </VStack>
  )
}

export default NFTStatistics
