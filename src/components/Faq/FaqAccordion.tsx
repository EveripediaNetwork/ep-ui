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
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'

const SingleAccordion = ({
  header,
  body,
}: {
  header: string
  body: string
}) => {
  const accordionBg = useColorModeValue('#ffffff', '#2D3748')
  const accordionShadow = useColorModeValue('0px 0px 20px 11px #80808012', '')
  return (
    <Flex direction="column">
      <Accordion defaultIndex={[1]} allowMultiple my={{ base: 5 }}>
        <AccordionItem
          borderRadius="5"
          py={{ base: 5 }}
          bg={accordionBg}
          border="none"
          boxShadow={accordionShadow}
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
  faqData: Array<any>
  heading: string
  icon: any
}) => {
  return (
    <Flex direction="column" mt={10}>
      <Flex gap={{ base: 5 }} align="center" justify="center" w="fit-content">
        <Icon as={icon} boxSize="30px" />
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
      {faqData.map((item: any, index: any) => {
        return (
          <SingleAccordion key={index} header={item.header} body={item.body} />
        )
      })}
    </Flex>
  )
}

export default FaqAccordion
