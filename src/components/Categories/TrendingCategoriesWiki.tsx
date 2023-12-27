import React from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { RiBarChartFill, RiTimeFill } from 'react-icons/ri'
import { TranformCategoryTitle } from '@/utils/DataTransform/changeCategoryTitle'
import { Wiki } from '@everipedia/iq-utils'
import TrendingCategoryCard from './TrendingCategoryCard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

const TrendingCategoriesWiki = ({
  categoryType,
  trending,
  newWikis,
}: {
  categoryType: string
  trending: Wiki[]
  newWikis: Wiki[]
}) => {
  const { t } = useTranslation('category')
  return (
    <SimpleGrid
      width={{ base: '90%', lg: 'min(80%, 1300px)' }}
      mx="auto"
      my={{ base: '10', md: '16' }}
      gridTemplateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(2, 1fr)' }}
      gap="5"
    >
      <TrendingCategoryCard
        icon={RiBarChartFill}
        title={`${t('categoryPopular')} ${TranformCategoryTitle(
          categoryType,
        )} ${t('categoryWikis')}`}
        wikis={trending}
      />
      <TrendingCategoryCard
        icon={RiTimeFill}
        title={`${t('categoryNew')} ${TranformCategoryTitle(categoryType)} ${t(
          'categoryWikis',
        )}`}
        wikis={newWikis}
      />
    </SimpleGrid>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['category'])),
    },
  }
}

export default TrendingCategoriesWiki
