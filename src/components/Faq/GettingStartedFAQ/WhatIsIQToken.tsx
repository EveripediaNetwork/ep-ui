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

const WhatIsIQToken = () => {
  return (
    <AccordionItem
      borderRadius="5"
      py={{ base: 5 }}
      mb={{ base: 2 }}
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
                    What is the IQ token?
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
                The{' '}
                <SingleLink
                  title="IQ token"
                  href="https://iq.wiki/wiki/iqwiki"
                />{' '}
                is a cryptocurrency dedicated to the future of knowledge. The IQ
                token powers IQ.wiki, the world&apos;s largest cryptocurrency
                encyclopedia. IQ is both a governance and DeFi token with IQ
                stakers governing the platform and earning rewards. The token is
                managed by BrainDAO and backed by BrainDAO&apos;s treasury of IQ
                tokens, stablecoins, blue chip NFTs, and other digital assets.{' '}
                <br />
                <br /> For more information about the IQ token see the{' '}
                <SingleLink
                  title="IQ
                    token page"
                  href="https://iq.wiki/wiki/iqwiki"
                />{' '}
                on IQ.wiki.
              </Text>
            </AccordionPanel>
          </>
        )
      }}
    </AccordionItem>
  )
}

export default WhatIsIQToken
