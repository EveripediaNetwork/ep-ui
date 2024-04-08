import React from 'react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import AccordionWidget from '@/components/Wiki/WikiAccordion/AccordionWidget'
import { VStack } from '@chakra-ui/react'
import { TokenStats } from '@/services/token-stats'
import { WikiInsights } from '@/types/WikiInsightsDataType'
import { useTranslation } from 'next-i18next'
import { getFormattedAmount } from '@/lib/utils'

type ProfileStatisticsProps = {
  tokenStats?: TokenStats
}

const ProfileStatistics = (props: ProfileStatisticsProps) => {
  const { tokenStats } = props
  const { t } = useTranslation('wiki')

  if (!tokenStats) return null

  const getStatDirection = (stat: number) => {
    if (stat === 0) return undefined
    if (stat > 0) return 'increase'
    return 'decrease'
  }

  const statChange = (stat: number) => {
    return `${stat.toFixed(2)}%`
  }

  const profileStatistics: WikiInsights[] = [
    {
      type: 'statistic',
      title: t('Price'),
      content: {
        value: getFormattedAmount(tokenStats.token_price_in_usd, 'USD', 2, 7),
        change: statChange(tokenStats.market_cap_percentage_change),
        changeDirection: getStatDirection(
          tokenStats.market_cap_percentage_change,
        ),
      },
    },
    {
      type: 'statistic',
      title: t('Market Cap'),
      content: {
        value: getFormattedAmount(tokenStats.market_cap),
        change: statChange(tokenStats.market_cap_percentage_change),
        changeDirection: getStatDirection(
          tokenStats.market_cap_percentage_change,
        ),
      },
    },

    {
      type: 'statistic',
      title: t('Diluted Market Cap'),
      content: {
        value: getFormattedAmount(tokenStats.diluted_market_cap),
        change: statChange(tokenStats.diluted_market_cap_percentage_change),
        changeDirection: getStatDirection(
          tokenStats.diluted_market_cap_percentage_change,
        ),
      },
    },

    {
      type: 'statistic',
      title: t('Volume'),
      titleTag: '24h',
      content: {
        value: getFormattedAmount(tokenStats.volume),
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
        title={t('Statistics')}
      >
        {profileStatistics.map((item, index) => (
          <AccordionWidget key={index} {...item} />
        ))}
      </WikiAccordion>
    </VStack>
  )
}

export default ProfileStatistics
