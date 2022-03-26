import React from 'react'
import Accordion from '@/components/Wiki/WikiAccordion'
import AccordionCard from '@/components/Wiki/WikiAccordion/AccordionWidget'
import { VStack } from '@chakra-ui/react'

const ProfileStatistics = () => {
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <Accordion display="flex" flexDir="column" gap={2} title="Statistics">
        <AccordionCard
          title="Market Cap"
          isTimedStatistic
          content="$861,618,023.80"
          statChanged="0.17%"
          statChangedDirection="increase"
        />
        <AccordionCard
          title="Holders"
          isTimedStatistic
          content="6,382"
          statChanged="0.17%"
          statChangedDirection="increase"
        />
        <AccordionCard
          title="Diluted Market Cap"
          isTimedStatistic
          content="$183,710,797"
          statChanged="0.09%"
          statChangedDirection="increase"
        />
        <AccordionCard
          title="Volume"
          isTitleTagged
          titleTag="24h"
          isTimedStatistic
          content="$3,642,982.55"
          statChanged="69.03%"
          statChangedDirection="decrease"
        />
        <AccordionCard title="Transfers" content="6,382" />
        <AccordionCard title="Market Rank" content="#382" />
      </Accordion>
    </VStack>
  )
}

export default ProfileStatistics
