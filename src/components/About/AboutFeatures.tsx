import React from 'react'
import { Heading, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { MdArticle, MdDesignServices, MdOutlinePeopleAlt } from 'react-icons/md'
import AboutFeaturesCard from './AboutFeaturesCard'

const AboutFeatures = () => (
  <VStack spacing={8} maxW="5xl" mx="auto" my={16}>
    <Heading size="lg">
      Taking the Online Encyclopedia into the Modern Age
    </Heading>
    <Text align={{ base: 'left', lg: 'center' }} maxW="3xl" opacity={0.6}>
      Everipedia uses blockchain technology to help us fulfill our vision for a
      world where all knowledge is available to all people - a world in which
      everyone, everywhere can participate in sharing what they know and
      providing value to others.
    </Text>
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={4} mt={4}>
      <AboutFeaturesCard
        title="Modern Design and Features"
        content="Everipedia’s design and features have been built for the modern age."
        icon={MdDesignServices}
      />
      <AboutFeaturesCard
        title="More Articles and Content"
        content="Everipedia allows you to create an article about anything as long as you have a citation. This allows for a much broader scope of content in the knowledge base."
        icon={MdArticle}
      />
      <AboutFeaturesCard
        title="Democratic Governance"
        content="Anyone with IQ Tokens is a stakeholder in the Everipedia Network. Using IQ tokens to vote, users decide which new articles and edits are added to the knowledge base."
        icon={MdOutlinePeopleAlt}
      />
    </SimpleGrid>
  </VStack>
)

export default AboutFeatures
