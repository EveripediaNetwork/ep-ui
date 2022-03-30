import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { TitleAndImage } from './InsightComponents/TitleAndImage'
import { RelatedWikis } from './InsightComponents/RelatedWikis'
import ProfileStatistics from './InsightComponents/ProfileStatistics'
import ProfileSummary from './InsightComponents/ProfileSummary'
import TwitterTimeline from './InsightComponents/TwitterTimeline'
import RelatedMedia from './InsightComponents/RelatedMedia'

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
    <TitleAndImage
      title={wiki?.title}
      categories={wiki?.categories}
      lastEdited={wiki?.updated || wiki?.created}
    />
    <ProfileSummary />
    <ProfileStatistics />
    <TwitterTimeline url="https://twitter.com/Everipedia" />
    <RelatedWikis categories={wiki?.categories} />
    <RelatedMedia />
  </VStack>
)

export default WikiInsights
