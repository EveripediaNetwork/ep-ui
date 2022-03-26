import React from 'react'
import Accordion from '@/components/Wiki/WikiAccordion'
import AccordionCard from '@/components/Wiki/WikiAccordion/AccordionWidget'
import { VStack } from '@chakra-ui/react'

const ProfileSummary = () => {
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <Accordion
        display="flex"
        flexDir="column"
        gap={2}
        title="Profile Summary"
      >
        <AccordionCard title="Contract" content="0xbed9...fb4D" isAddress />
        <AccordionCard
          title="Holders"
          isTimedStatistic
          content="6,382"
          statChanged="0.17%"
          statChangedDirection="increase"
        />
        <AccordionCard
          title="Official site"
          isURL
          content="https://boredapeyachtclub.com"
        />
        <AccordionCard title="Collection" content="10,000 NFTs" />
      </Accordion>
    </VStack>
  )
}

export default ProfileSummary
