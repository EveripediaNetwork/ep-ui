import React from 'react'
import { Box } from '@chakra-ui/react'
import AboutHero from '@/components/About/AboutHero'
import AboutFeatures from '@/components/About/AboutFeatures'
import AboutAsSeenIn from '@/components/About/AboutAsSeenIn'
import AboutOurTeam from '@/components/About/AboutOurTeam'
import { AboutHeader } from '@/components/SEO/Static'
import AboutAiIntegration from '@/components/About/AboutAIIntegration'
import OurHistory from '@/components/About/OurHistory'

const About = () => (
  <>
    <AboutHeader />
    <Box px={{ base: 6, lg: 16 }} py={{ base: '10', lg: 15 }}>
      <AboutHero />
      <AboutFeatures />
      <AboutAsSeenIn />
      <AboutOurTeam />
      <AboutAiIntegration />
      <OurHistory />
    </Box>
  </>
)

export default About
