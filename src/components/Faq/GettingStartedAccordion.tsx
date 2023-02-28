import React from 'react'
import { Accordion, Text, Flex, Icon } from '@chakra-ui/react'
import { RiFlagFill } from 'react-icons/ri'
import WhatIsIQWiki from './GettingStartedFAQ/WhatIsIQWiki'
import EditingIQWiki from './GettingStartedFAQ/EditingIQWiki'
import WhatIsIQToken from './GettingStartedFAQ/WhatIsIQToken'
import WhereToGetIQTokens from './GettingStartedFAQ/WhereToGetIQTokens'
import IQRules from './GettingStartedFAQ/IQRules'

const GettingStartedAccordion = () => {
  return (
    <Flex direction="column" mt={10}>
      <Flex gap={2} align="center" justify="center" w="fit-content">
        <Icon as={RiFlagFill} boxSize={{ base: '25px', lg: '30px' }} />
        <Text
          fontWeight="bold"
          mt={5}
          textAlign={{ base: 'center', md: 'left' }}
          fontSize={{ base: 'md', lg: 'xl' }}
          mb={4}
        >
          Getting Started
        </Text>
      </Flex>
      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <WhatIsIQWiki />
        <EditingIQWiki />
        <WhatIsIQToken />
        <WhereToGetIQTokens />
        <IQRules />
      </Accordion>
    </Flex>
  )
}

export default GettingStartedAccordion
