import React from 'react'
import { Heading, VStack, Text, SimpleGrid, Box } from '@chakra-ui/react'
import { MdOutlinePeopleAlt, MdOutlinePublic } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { OurMission } from '@/data/OurMissionData'
import AboutFeaturesCard from './AboutFeaturesCard'
import IQgreyLogo from './logos/iq.svg'

const AboutFeatures = () => {
  const { t } = useTranslation()
  return (
    <VStack
      spacing={8}
      maxW={{ base: '100%', xl: '90%', '2xl': '1280px' }}
      mx="auto"
      mt={{ base: 5, md: '24 !important' }}
    >
      <Heading
        fontWeight="bold"
        lineHeight="shorter"
        textAlign="center"
        size="lg"
      >{`${t('aboutFeatHeading')}`}</Heading>
      <Box m="0 !important">
        {OurMission.map((mission, i) => (
          <Text
            align={{ base: 'left', lg: 'center' }}
            maxW="4xl"
            textAlign="center"
            fontSize={{ base: '14px', md: '16px', lg: '24px' }}
            key={i}
            mt={{ base: '5', md: 10 }}
          >
            {mission}
          </Text>
        ))}
      </Box>
      <SimpleGrid
        columns={[1, 1, 2, 2, 3]}
        spacing={4}
        mt={{ base: 20, md: '24 !important' }}
      >
        <AboutFeaturesCard
          title={`${t('abtFeatOneHeading')}`}
          content={`${t('abtFeatOneContent')}`}
          icon={MdOutlinePublic}
        />
        <AboutFeaturesCard
          title={`${t('abtFeatTwoHeading')}`}
          content={`${t('abtFeatTwoContent')}`}
          icon={IQgreyLogo}
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
