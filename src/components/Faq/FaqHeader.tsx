import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const FaqHeader = () => {
  const { t } = useTranslation()
  return (
    <Flex direction="column">
      <Heading
        letterSpacing="wider"
        fontWeight="black"
        lineHeight="shorter"
        fontSize={{ base: '2xl', sm: '30', md: '44' }}
      >{`${t('faqHeader')}`}</Heading>
      <Text
        mt={{ base: 6 }}
        fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
        letterSpacing="wider"
        color="#4A5568"
      >{`${t('faqPhrase')}`}</Text>
    </Flex>
  )
}

export default FaqHeader
