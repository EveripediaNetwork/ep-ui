import FaqHeader from '@/components/Faq/FaqHeader'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import GettingStartedAccordion from '@/components/Faq/GettingStartedAccordion'
import CreateWikisFAQ from '@/components/Faq/CreateWikisFAQ'
import EditingWikisFAQ from '@/components/Faq/EditingWikisFAQ'
import { FaqSEO } from '@/components/SEO/Static'

const FAQ = () => {
  return (
    <>
      <FaqSEO />
      <Flex bgColor="pageBg">
        <Flex
          w="min(90%, 1100px)"
          mx="auto"
          direction="column"
          py={{ lg: 20 }}
          mb={{ base: 17, lg: 0 }}
        >
          <FaqHeader />
          <Flex direction="column">
            <GettingStartedAccordion />
            <CreateWikisFAQ />
            <EditingWikisFAQ />
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default FAQ
