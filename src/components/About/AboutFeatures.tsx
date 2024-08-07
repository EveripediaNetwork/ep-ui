import React from 'react'
import { Flex, Heading, Text, SimpleGrid, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import AboutFeaturesCard from './AboutFeaturesCard'
import GlobeIcon from './logos/globe.svg'
import GroupIcon from './logos/group.svg'
import IQLogo from './logos/IQLogo.svg'

const AboutFeatures = () => {
  const { t } = useTranslation('about')

  const OurMission = [
    t('OurMission1'),
    t('OurMission2'),
    t('OurMission3'),
    t('OurMission4'),
  ]

  return (
    <Box
      px={{ base: 6, lg: 16, '2xl': 0 }}
      py={{ base: '10', lg: 15 }}
      maxW={{ base: '100%', xl: '90%', '2xl': '1440px' }}
      mt={{ base: 5, md: '24' }}
      mx="auto"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        className="relative"
        position="relative"
      >
        <Box
          className="absolute block top-0 right-0 z-10 bg-gradient-to-r from-sky-400 to-pink-500 via-indigo-500 blur-[100px]"
          blur={20}
          transform={{ base: 'rotate(0deg)', md: 'rotate(-8deg)' }}
          width="70%"
          height="80%"
          opacity={0.2}
        />
        <Flex
          direction={'column'}
          align="start"
          w={{ base: '100%', md: '40%' }}
          mt={{ base: 0, md: '10' }}
        >
          <h2 className="text-left text-brand-500 dark:text-brand-800 text-base font-semibold">
            {`${t('aboutFeatTitle')}`}
          </h2>

          <Heading
            fontWeight="bold"
            lineHeight="shorter"
            textAlign="left"
            size={{ base: 'lg', md: 'md', lg: '2xl' }}
            maxW={{ base: '100%', md: '90%', lg: '90%' }}
            mt={{ base: 2 }}
          >
            {`${t('aboutFeatHeading')}`}
          </Heading>
        </Flex>

        <Box
          m="0 !important"
          w={{ base: '100%', md: '60%' }}
          className="relative"
        >
          {OurMission.map((mission, i) => (
            <Text
              align={{ base: 'left', lg: 'center' }}
              mx="auto"
              textAlign="left"
              fontSize={{ base: '14px', md: 'md', lg: 'lg' }}
              lineHeight={{ base: '20px', md: '24px', lg: '24px' }}
              key={i}
              mt={{ base: '8', md: 10 }}
            >
              {mission}
            </Text>
          ))}
        </Box>
      </Flex>

      <Box pt={{ lg: 28 }}>
        <SimpleGrid
          columns={[1, 1, 2, 2, 3]}
          spacing={{ base: '8', md: '5' }}
          mt={{ base: '45px !important ', md: '24 !important' }}
        >
          <AboutFeaturesCard
            title={`${t('abtFeatOneHeading')}`}
            content={`${t('abtFeatOneContent')}`}
            icon={GlobeIcon}
          />
          <AboutFeaturesCard
            title={`${t('abtFeatTwoHeading')}`}
            content={`${t('abtFeatTwoContent')}`}
            icon={IQLogo}
          />
          <AboutFeaturesCard
            title={`${t('abtFeatThreeHeading')}`}
            content={`${t('abtFeatThreeContent')}`}
            icon={GroupIcon}
          />
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default AboutFeatures
