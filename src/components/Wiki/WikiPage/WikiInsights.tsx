import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { TitleAndImage } from './InsightComponents/TitleAndImage'
import { RelatedWikis } from './InsightComponents/RelatedWikis'
import ProfileStatistics from './InsightComponents/ProfileStatistics'
import ProfileSummary from './InsightComponents/ProfileSummary'

interface WikiInsightsProps {
  wiki: Wiki | undefined
}

const WikiInsights = ({ wiki }: WikiInsightsProps) => (
  <VStack
    maxW="xl"
    borderLeftWidth={{ base: 0, md: '1px' }}
    w={{ base: '100%', md: '50%' }}
    mx={{ base: 'auto', md: 0 }}
    p={4}
    spacing={4}
    pt={24}
  >
    <TitleAndImage title={wiki?.title} />
    <ProfileSummary />
    <ProfileStatistics />
    <RelatedWikis categories={wiki?.categories} />
  </VStack>
)

export default WikiInsights
