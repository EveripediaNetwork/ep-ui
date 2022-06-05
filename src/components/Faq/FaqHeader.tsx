import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FaqHeader = () => {
  const { t } = useTranslation()
  return (
    <Flex direction="column">
      <Heading
        lineHeight="shorter"
        as="h1" 
        size="2xl" 
        letterSpacing="wide"
        fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
      >{`${t('faqHeader')}`}</Heading>
      <Text
        mt={{ base: 2, lg: 4, md: 2 }}
        fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
        letterSpacing="wider"
        color="#4A5568"
      >{`${t('faqPhrase')}`}</Text>
    </Flex>
  )
}

export default FaqHeader
