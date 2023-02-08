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

const WhereToGetIQTokens = () => {
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
                    Where do I get IQ tokens?
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
                You can get IQ tokens from a variety of centralized and
                decentralized exchanges including Binance, Crypto.com, Fraxswap,
                and more. See the{' '}
                <SingleLink
                  title="Exchanges"
                  href="https://learn.everipedia.org/iq/iq/exchanges"
                />{' '}
                section of our Learn site for the full list.
              </Text>
            </AccordionPanel>
          </>
        )
      }}
    </AccordionItem>
  )
}

export default WhereToGetIQTokens
