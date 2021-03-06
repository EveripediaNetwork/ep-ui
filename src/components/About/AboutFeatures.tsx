import React from 'react'
import { Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { MdArticle, MdDesignServices, MdOutlinePeopleAlt } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import AboutFeaturesCard from './AboutFeaturesCard'

const AboutFeatures = () => {
  const { t } = useTranslation()
  return (
    <VStack
      spacing={8}
      maxW={{ base: '100%', lg: '90%', '2xl': '65%' }}
      mx="auto"
      mt="24"
    >
      <Heading
        letterSpacing="wider"
        fontWeight="bold"
        lineHeight="shorter"
        textAlign="center"
        size="lg"
      >{`${t('aboutFeatHeading')}`}</Heading>
      <Text
        align={{ base: 'left', lg: 'center' }}
        maxW="3xl"
        textAlign="center"
        fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
        letterSpacing="wider"
        mb={4}
      >
        {`${t('aboutFeatContent')}`}
      </Text>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
        <AboutFeaturesCard
          title={`${t('abtFeatOneHeading')}`}
          content={`${t('abtFeatOneContent')}`}
          icon={MdDesignServices}
        />
        <AboutFeaturesCard
          title={`${t('abtFeatTwoHeading')}`}
          content={`${t('abtFeatTwoContent')}`}
          icon={MdArticle}
        />
        <AboutFeaturesCard
          title={`${t('abtFeatThreeHeading')}`}
          content={`${t('abtFeatThreeContent')}`}
          icon={MdOutlinePeopleAlt}
        />
      </SimpleGrid>
    </VStack>
  )
}

export default AboutFeatures
