import React from 'react'
import { Box, Heading, Text, chakra } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export const Hero = () => {
  const { t } = useTranslation('home')
  return (
    <Box>
      <Heading
        w="full"
        textAlign="center"
        px={{ base: '5', md: '0' }}
        fontSize={{ base: '24', md: '36' }}
      >
        {t('hero_heading1')}{' '}
        <chakra.span color="brandLinkColor"> {t('hero_heading2')} </chakra.span>
        {t('hero_heading3')}
      </Heading>
      <Text
        px={{ base: '5', md: '0' }}
        textAlign="center"
        mt="3"
        mx={'auto'}
        maxW={'590px'}
        color={'eventTextColor'}
        fontSize={{ base: 'md', lg: '20px' }}
      >
        {t('iq_description')}
      </Text>
    </Box>
  )
}
