import React from 'react'
import { Heading, VStack, chakra } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

export const Hero = () => {
  const { t } = useTranslation('home')
  return (
    <VStack
      pt={{ base: 6, lg: 12 }}
      minH="300px"
      bg="gray.100"
      _dark={{ bg: 'rgba(255, 255, 255, 0.04)' }}
    >
      <Heading
        w={{
          base: '90%',
          md: '80%',
          xl: '65%',
        }}
        minW={{ lg: '980px' }}
        textAlign="center"
        px={{ base: '8', md: '0' }}
        fontSize={{ base: '26', md: '48', xl: '60' }}
        fontWeight={{ base: 'semibold', md: 'bold', xl: 'semibold' }}
      >
        {t('hero_heading1')}{' '}
        <chakra.span color="brandLinkColor"> {t('hero_heading2')} </chakra.span>{' '}
        {t('hero_heading3')}
      </Heading>
    </VStack>
  )
}
