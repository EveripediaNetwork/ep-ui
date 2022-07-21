import React from 'react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import AccordionWidget from '@/components/Wiki/WikiAccordion/AccordionWidget'
import { VStack } from '@chakra-ui/react'
import { TokenStats } from '@/services/token-stats'
import { WikiInsights } from '@/types/WikiInsightsDataType'

type ProfileStatisticsProps = {
  tokenStats?: TokenStats
}

const ProfileStatistics = (props: ProfileStatisticsProps) => {
  const { tokenStats } = props

  if (!tokenStats) return null

  const getStatDirection = (stat: number) => {
    if (stat === 0) return undefined
    if (stat > 0) return 'increase'
    return 'decrease'
  }

  const statChange = (stat: number) => {
    return `${stat.toFixed(2)}%`
  }

  const statWithCommas = (stat: number) => {
    return `$${stat
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  const profileStatistics: WikiInsights[] = [
    {
      type: 'statistic',
      title: 'Market Cap',
      content: {
        value: statWithCommas(tokenStats.market_cap),
        change: statChange(tokenStats.market_cap_percentage_change),
        changeDirection: getStatDirection(
          tokenStats.market_cap_percentage_change,
        ),
      },
    },

    {
      type: 'statistic',
      title: 'Diluted Market Cap',
      content: {
        value: statWithCommas(tokenStats.diluted_market_cap),
        change: statChange(tokenStats.diluted_market_cap_percentage_change),
        changeDirection: getStatDirection(
          tokenStats.diluted_market_cap_percentage_change,
        ),
      },
    },

    {
      type: 'statistic',
      title: 'Volume',
      titleTag: '24h',
      content: {
        value: statWithCommas(tokenStats.volume),
        change: statChange(tokenStats.volume_percentage_change),
        changeDirection: getStatDirection(tokenStats.volume_percentage_change),
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
        title="Statistics"
        collapsed={{base : true, xl:false}}
      >
        {profileStatistics.map((item, index) => (
          <AccordionWidget key={index} {...item} />
        ))}
      </WikiAccordion>
    </VStack>
  )
}

export default ProfileStatistics
