import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { TitleAndImage } from './InsightComponents/TitleAndImage'
import { RelatedWikis } from './InsightComponents/RelatedWikis'

interface WikiInsightsProps {
  wiki: Wiki
}

const WikiInsights = ({ wiki }: WikiInsightsProps) => (
  <VStack p={4} spacing={4} pt={24}>
    <TitleAndImage wiki={wiki} />
    <RelatedWikis categories={wiki?.categories} />
  </VStack>
)

export default WikiInsights
