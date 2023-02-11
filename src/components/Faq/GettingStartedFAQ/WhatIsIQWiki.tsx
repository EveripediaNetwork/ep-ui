import React from 'react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'
import { SingleLink } from '../SingleLink'

const WhatIsIQWiki = () => {
  return (
    <AccordionItem
      borderRadius="5"
      mb={{ base: 2 }}
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
                    What is IQ.wiki?
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
              >
                <SingleLink
                  href="https://iq.wiki/wiki/iqwiki"
                  title="IQ.wiki"
                />
                formerly Everipedia, is the world’s largest crypto encyclopedia
                with thousands of pages. The new IQ.wiki platform has been built
                from the ground up to be fully Web3 with all edits recorded
                on-chain through Polygon and IPFS. The encyclopedia is governed
                by IQ token stakers who earn rewards for their contributions.
                For more information on IQ.wiki see the{' '}
                <SingleLink
                  href="https://iq.wiki/wiki/iqwiki"
                  title="IQ.wiki page"
                />
                on IQ.wiki.
              </Text>
            </AccordionPanel>
          </>
        )
      }}
    </AccordionItem>
  )
}

export default WhatIsIQWiki
