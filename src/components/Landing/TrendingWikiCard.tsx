import { useGetTrendingWikisQuery } from '@/services/wikis'
import { getDateRange } from '@/utils/HomepageUtils/getDate'
import { Wiki } from '@everipedia/iq-utils'
import React, { useEffect, useState } from 'react'
import { RiBarChartFill } from 'react-icons/ri'
import TrendingCard from './TrendingCard'

const TrendingWikiCard = ({ trending }: { trending?: Wiki[] }) => {
  const [trendingSelection, setTrendingSelection] = useState<number>()
  const [trendingWikis, setTrendingWikis] = useState(trending)

  const selectedRange = (range: string) => {
    setTrendingSelection(+range)
  }

  const { startDay, endDay } = getDateRange(trendingSelection)

  const { data: trendingData } = useGetTrendingWikisQuery({
    endDay,
    startDay,
    amount: 5,
  })

  useEffect(() => {
    setTrendingWikis(trendingData)
  }, [trendingData])

  return (
    <TrendingCard
      title="Trending Wikis"
      icon={RiBarChartFill}
      wikis={trendingWikis}
      isTrending
      setSelectedRange={selectedRange}
    />
  )
}

export default TrendingWikiCard
