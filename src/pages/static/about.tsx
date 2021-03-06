import React from 'react'
import { Box } from '@chakra-ui/react'
import AboutHero from '@/components/About/AboutHero'
import AboutFeatures from '@/components/About/AboutFeatures'
import AboutAsSeenIn from '@/components/About/AboutAsSeenIn'
import AboutCommunity from '@/components/About/AboutCommunity'
import AboutOurTeam from '@/components/About/AboutOurTeam'
import AboutLatestFromBlog from '@/components/About/AboutLatestFromBlog'

const About = () => (
  <Box px={{ base: 6, lg: 16 }} py={{ lg: 20 }}>
    <AboutHero />
    <AboutFeatures />
    <AboutCommunity />
    <AboutAsSeenIn />
    <AboutOurTeam />
    <AboutLatestFromBlog />
  </Box>
)

export default About
