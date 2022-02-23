import React from 'react'
import { Box } from '@chakra-ui/react'
import AboutHero from '@/components/About/AboutHero'
import AboutFeatures from '@/components/About/AboutFeatures'
import AboutAsSeenIn from '@/components/About/AboutAsSeenIn'
import AboutCommunity from '@/components/About/AboutCommunity'
import AboutOurTeam from '@/components/About/AboutOurTeam'
import AboutLatestFromBlog from '@/components/About/AboutLatestFromBlog'

const About = () => (
  <Box maxW="7xl" mx="auto" mt={4}>
    <AboutHero />
    <Box px={8}>
      <AboutFeatures />
      <AboutCommunity />
      <AboutAsSeenIn />
      <AboutOurTeam />
      <AboutLatestFromBlog />
    </Box>
  </Box>
)

export default About
