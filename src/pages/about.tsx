import React from 'react'
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
    <AboutHero />
    <AboutFeatures />
    <AboutAsSeenIn />
    <AboutAiIntegration />
    <AboutOurTeam />
    <OurHistory />
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
