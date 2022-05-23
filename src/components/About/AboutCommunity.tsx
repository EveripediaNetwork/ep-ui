import React from 'react'
import { Heading, Text, VStack, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import Carousel from '../Elements/Carousel/Carousel'
import AboutTestimonial from './AboutTestimonial'

const AboutCommunity = () => {
  const { t } = useTranslation()
  return (
    <VStack
      spacing={8}
      maxW={{ base: '100%', lg: '90%', '2xl': '65%' }}
      mx="auto"
      mt="24"
    >
      <Heading textAlign={{ base: 'center', lg: 'left' }} size="lg">{`${t(
        'aboutTestimonialHeading',
      )}`}</Heading>
      <Text align={{ base: 'left', lg: 'center' }} maxW="3xl" opacity={0.6}>
        {`${t('aboutTestimonialContent')}`}
      </Text>
      <Box mt={8} w="100%" maxW="4xl">
        <Carousel settings={{ infinite: true, arrows: true, autoplay: true }}>
          <AboutTestimonial
            testimonial={`${t('aboutTestimonialOneContent')}`}
            author={`${t('aboutTestimonialOneAuthor')}`}
            designation={`${t('aboutTestimonialOneDesig')}`}
            img="/images/about-testimonials/larry.jpeg"
            location={`${t('aboutTestimonialOneLocation')}`}
          />
          <AboutTestimonial
            testimonial={`${t('aboutTestimonialTwoContent')}`}
            author={`${t('aboutTestimonialTwoAuthor')}`}
            designation={`${t('aboutTestimonialTwoDesig')}`}
            img="/images/about-testimonials/wilfra.webp"
          />
          <AboutTestimonial
            testimonial={`${t('aboutTestimonialThreeContent')}`}
            author={`${t('aboutTestimonialThreeAuthor')}`}
            designation={`${t('aboutTestimonialThreeDesig')}`}
            img="/images/about-testimonials/samuel.webp"
            location={`${t('aboutTestimonialThreeLocation')}`}
          />
        </Carousel>
      </Box>
    </VStack>
  )
}

export default AboutCommunity
