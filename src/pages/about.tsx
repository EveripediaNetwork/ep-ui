import React from 'react'
import { Box } from '@chakra-ui/react'
import AboutHero from '@/components/About/AboutHero'
import AboutFeatures from '@/components/About/AboutFeatures'
import AboutAsSeenIn from '@/components/About/AboutAsSeenIn'
import AboutOurTeam from '@/components/About/AboutOurTeam'
import { AboutHeader } from '@/components/SEO/Static'
import AboutAiIntegration from '@/components/About/AboutAIIntegration'
import OurHistory from '@/components/About/OurHistory'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

const About = () => (
  <>
    <AboutHeader />
    <Box px={{ base: 6, lg: 16 }} py={{ base: '10', lg: 15 }}>
      <AboutHero />
      <AboutFeatures />
      <AboutAsSeenIn />
      <AboutAiIntegration />
    </Box>
    <AboutOurTeam />
    <Box px={{ base: 6, lg: 8 }} py={{ base: '10', lg: 15 }}>
      <OurHistory />
    </Box>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'about'])),
    },
  }
}

export default About
