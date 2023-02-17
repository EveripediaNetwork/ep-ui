import { OurHistoryData } from '@/data/OurHistory'
import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import OurHistoryCard from './OurHistoryCard'

const OurHistory = () => {
  const { t } = useTranslation()
  return (
    <Box
      mt={{ base: 18, md: '24 !important' }}
      maxW={{ base: '100%', lg: '80%', '2xl': '75%' }}
      mx="auto"
    >
      <Heading size="lg" textAlign="center">
        {t('historyHeading')}
      </Heading>
      <Text
        textAlign="center"
        mt="4"
        fontSize={{ base: '14px', md: '18px', lg: '24px' }}
        lineHeight={{ base: '20px', md: '24px', lg: '36px' }}
      >
        {t('historyBrief')}
      </Text>
      <Box mt="15">
        {OurHistoryData.map((history, i) => (
          <OurHistoryCard
            key={i}
            year={history.year}
            content={history.content}
          />
        ))}
      </Box>
    </Box>
  )
}

export default OurHistory
