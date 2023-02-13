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

const StakeIQToEarnRewards = () => {
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
                    How do I stake IQ to earn token rewards and get involved in
                    governance?
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
                For more information on how to start earning IQ token rewards
                and get involved in the governance of the IQ token, check out
                the{' '}
                <SingleLink
                  title="HiIQ page on our Learn site"
                  href="https://learn.everipedia.org/iq/iq/locking-hiiq"
                />{' '}
                which explains how staking works and includes tutorials on how
                to stake.
              </Text>
            </AccordionPanel>
          </>
        )
      }}
    </AccordionItem>
  )
}

export default StakeIQToEarnRewards
