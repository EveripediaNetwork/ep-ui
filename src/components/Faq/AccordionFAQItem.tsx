import { MinusIcon, AddIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionItem,
  Text,
  AccordionButton,
  Box,
  AccordionPanel,
} from '@chakra-ui/react'
import React from 'react'

const AccordionFAQItem = ({
  title,
  content,
}: {
  title: string
  content: React.ReactNode
}) => {
  return (
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
                      {title}
                    </Text>
                  </Box>
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
                  lineHeight={2}
                  whiteSpace="pre-line"
                >
                  {content}
                </Text>
              </AccordionPanel>
            </>
          )
        }}
      </AccordionItem>
    </Accordion>
  )
}

export default AccordionFAQItem
