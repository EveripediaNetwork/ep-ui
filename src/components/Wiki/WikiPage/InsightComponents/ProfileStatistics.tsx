import React from 'react'
import Accordion from '@/components/Wiki/WikiAccordion'
import AccordionCard from '@/components/Wiki/WikiAccordion/AccordionWidget'
import { VStack } from '@chakra-ui/react'
import { sampleProfileStatistics } from '@/data/WikiInsightsData'

const ProfileStatistics = () => {
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <Accordion display="flex" flexDir="column" gap={2} title="Statistics">
        {sampleProfileStatistics.map((item, index) => (
          <AccordionCard
            key={index}
            type={item.type}
            title={item.title}
            titleTag={item.titleTag}
            content={item.content}
            change={item.change}
            changeDirection={item.changeDirection}
          />
        ))}
      </Accordion>
    </VStack>
  )
}

export default ProfileStatistics
