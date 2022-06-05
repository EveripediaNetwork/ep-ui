import React from 'react'
import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  Text,
  AccordionButton,
  Box,
  AccordionPanel,
  Flex,
  Icon,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

const SingleAccordion = ({
  header,
  body,
}: {
  header: string
  body: string
}) => {
  return (
    <Flex direction="column">
      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 1 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
          border="none"
          _light={{ boxShadow: '0px 0px 20px 11px #80808012', bg: '#ffffff' }}
          _dark={{ bg: '#2D3748' }}
        >
          {({ isExpanded }) => {
            return (
              <>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: 'sm', md: 'md', lg: 'xl' }}
                >
                  <AccordionButton
                    _hover={{ bg: 'none' }}
                    _focus={{ outline: 'none' }}
                  >
                    <Box flex="1" textAlign="left">
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
                      >
                        {header}
                      </Text>
                    </Box>
                    {/* <AccordionIcon /> */}
                    {isExpanded ? (
                      <MinusIcon fontSize="12px" />
                    ) : (
                      <AddIcon fontSize="12px" />
                    )}
                  </AccordionButton>
                </Text>
                <AccordionPanel pb={4}>
                  <Text
                    fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}
                    lineHeight={{ base: '2' }}
                  >
                    {body}
                  </Text>
                </AccordionPanel>
              </>
            )
          }}
        </AccordionItem>
      </Accordion>
    </Flex>
  )
}
const FaqAccordion = ({
  faqData,
  heading,
  icon,
}: {
  faqData: Record<string, string>[]
  heading: string
  icon: IconType
}) => {
  return (
    <Flex direction="column" mt={10}>
      <Flex gap={{ base: 2 }} align="center" justify="center" w="fit-content">
        <Icon as={icon} boxSize={{base: "25px", lg: "30px"}} />
        <Text
          fontWeight="bold"
          mt={{ base: 5 }}
          textAlign={{ base: 'center', md: 'left', lg: 'left' }}
          fontSize={{ base: 'md', md: 'md', lg: 'xl' }}
          mb={4}
        >
          {heading}
        </Text>
      </Flex>
      {faqData.map((item, index: any) => {
        return (
          <SingleAccordion key={index} header={item.header} body={item.body} />
        )
      })}
    </Flex>
  )
}

export default FaqAccordion
