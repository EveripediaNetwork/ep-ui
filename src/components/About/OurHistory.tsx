import { OurHistoryData } from '@/data/OurHistory'
import { Box, Heading, Text, Center } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { StickyScrollReveal } from '../magicui/sticky-scroll'

const OurHistory = () => {
  const { t } = useTranslation('about')

  const translatedHistoryData = OurHistoryData.map((item) => ({
    ...item,
    title: t(item.title),
    description: t(item.description),
  }))

  return (
    <Box
      px={{ base: 6, lg: 16, '2xl': 0 }}
      py={{ base: '10', lg: 15 }}
      mx="auto"
      className=""
    >
      <Box mt={{ base: 18, md: '24 !important' }} my={20}>
        <Center>
          <Heading
            fontSize="base"
            fontWeight="semibold"
            color="brand.500"
            _dark={{ color: 'brand.800' }}
            my="4"
          >
            {t('historyTitle')}
          </Heading>
        </Center>

        <Heading size="lg" textAlign="center">
          {t('historyHeading')}
        </Heading>

        <Text
          mx="auto"
          mt="6"
          maxW="4xl"
          textAlign="center"
          fontSize={{ base: 'sm', md: 'xl', lg: 'lg' }}
          fontWeight="medium"
          mb={{ base: 10, lg: 20 }}
          className="text-gray-600 dark:text-white/80"
        >
          {`${t('historyBrief')}`}
        </Text>
        <StickyScrollReveal content={translatedHistoryData} />
      </Box>
    </Box>
  )
}

export default OurHistory
