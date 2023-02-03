import { Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NoOpenings = () => {
  const { t } = useTranslation()
  return (
    <Flex
      mt={{ base: 5 }}
      mb={{ base: 2 }}
      direction="column"
      align="center"
      justify="center"
    >
      <Image
        flex={1}
        marginInlineStart="0 !important"
        src="/images/svg-images/no-careers-state.svg"
        w={{ base: '60%', sm: '50%', md: '55%', lg: '45%' }}
      />
      <Heading
        textAlign="center"
        mt={8}
        mb={4}
        as="h1"
        fontSize={{ md: '2xl', lg: '4xl', base: 'xl' }}
        letterSpacing="wide"
      >
        {t('noOpeningsHeading')}
      </Heading>
    </Flex>
  )
}

export default NoOpenings
