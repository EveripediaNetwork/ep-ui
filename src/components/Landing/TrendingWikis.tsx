import React from 'react'
import type { Wiki } from '@everipedia/iq-utils'
import { RiBarChartFill } from 'react-icons/ri'
import type { TrendingData } from '@/types/Home'
import TrendingCard from './TrendingCard'
import { FeaturedWikis } from './FeaturedWikis'
import { useTranslation } from 'next-i18next'
import WikiCategories from './WikiCategories'

const TrendingWikis = ({
  trending,
  featuredWikis = [],
}: {
  trending?: TrendingData
  featuredWikis?: Wiki[]
}) => {
  const { t } = useTranslation('home')

  return (
    <section className="px-4 lg:px-8 2xl:px-0 container mx-auto pb-16 md:pb-20 lg:pb-24 -mt-36 md:-mt-0">
      <div className="md:grid flex flex-row flex-wrap md:items-center md:grid-cols-2 xl:grid-cols-3 w-full gap-4 lg:gap-8">
        <TrendingCard
          title={t('trendingWikisTitle')}
          icon={RiBarChartFill}
          wikis={trending}
          isTrending
        />
        <WikiCategories />
        <FeaturedWikis featuredWikis={featuredWikis} />
      </div>
    </section>
  )
}

export default TrendingWikis
