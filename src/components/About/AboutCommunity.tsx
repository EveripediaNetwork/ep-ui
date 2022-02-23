import React from 'react'
import { Heading, Text, VStack, Box } from '@chakra-ui/react'
import Carousel from '../Elements/Carousel/Carousel'
import AboutTestimonial from './AboutTestimonial'

const AboutCommunity = () => (
  <VStack spacing={8} maxW="5xl" mx="auto" my={16}>
    <Heading size="lg">
      An open community bringing blockchain knowledge to the world
    </Heading>
    <Text align={{ base: 'left', lg: 'center' }} maxW="3xl" opacity={0.6}>
      Everipedia&apos;s vibrant community is open and welcoming to everyone.
      We&apos;re already the world&apos;s largest blockchain encyclopedia, but
      we&apos;re far from complete. Join us today.
    </Text>
    <Box mt={8} w="100%" maxW="4xl">
      <Carousel settings={{ infinite: true, arrows: true, autoplay: true }}>
        <AboutTestimonial
          testimonial="Thanks to new technology, it is now possible for Everipedia to move beyond Wikipedia just like how we moved beyond Britannica almost two decades ago."
          author="Larry Sanger"
          designation="Co-Founder Wikipedia"
          img="/images/about-testimonials/larry.jpeg"
          location="Columbus, Ohio"
        />
        <AboutTestimonial
          testimonial="As an editor, the killer feature of Everipedia is that as long as you use sources and a neutral wording, you can write an article about anything you want. A dapp you like, yourself — anything."
          author="Wilfra"
          designation="Marketcap.one"
          img="/images/about-testimonials/wilfra.webp"
        />
        <AboutTestimonial
          testimonial="I love Everipedia because everyone benefits, particularly the contributors. As an IQ token holder, I have an incentive to participate in the network."
          author="Samuel Joseph"
          designation="Editor"
          img="/images/about-testimonials/samuel.webp"
          location="Lagos, Nigeria"
        />
      </Carousel>
    </Box>
  </VStack>
)

export default AboutCommunity
