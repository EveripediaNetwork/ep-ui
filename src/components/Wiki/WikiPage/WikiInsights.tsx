import React from 'react'
import { VStack } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import { TitleAndImage } from './InsightComponents/TitleAndImage'
import { RelatedWikis } from './InsightComponents/RelatedWikis'

interface WikiInsightsProps {
  wiki: Wiki | undefined
}

const WikiInsights = ({ wiki }: WikiInsightsProps) => (
  <VStack w={{ base: '100%', md: '50%' }} p={4} spacing={4} pt={24}>
    <TitleAndImage title={wiki?.title} />
    <RelatedWikis categories={wiki?.categories} />
  </VStack>
)

export default WikiInsights
