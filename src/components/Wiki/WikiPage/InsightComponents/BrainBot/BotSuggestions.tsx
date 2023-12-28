import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BrainBotSuggestion } from './BrainBot'
import QuestionMarkIcon from '@/components/Icons/questionMarkIcon'
import Image from 'next/image'
import { Wiki } from '@everipedia/iq-utils'

const BotSuggestions = ({ wiki }: { wiki: Wiki }) => {
  return (
    <Box paddingBlock={'14px'}>
      <Text maxW={'255px'} fontSize={'12px'} textAlign={'center'}>
        Hi There! I’m the BrainBot. Here are some cool stuff i can do for you.
      </Text>
      <VStack marginTop={'12px'}>
        <BrainBotSuggestion
          question={'Generate additional info for this page'}
          icon={<QuestionMarkIcon style={{ marginInlineStart: '0px' }} />}
          wiki={wiki}
        />
        <BrainBotSuggestion
          question={'Content/page summary.'}
          icon={
            <Image
              src={'/summary.svg'}
              alt="Sun icon"
              width={12}
              height={20}
              style={{ marginInlineStart: '0px' }}
            />
          }
          wiki={wiki}
        />
        <HStack gap={'8px'}>
          <BrainBotSuggestion
            question={'Ask me about crypto'}
            // href={'https://iqgpt.com/'}
            icon={
              <Image
                src={'/sun.svg'}
                alt="Sun icon"
                width={12}
                height={20}
                style={{ marginInlineStart: '0px' }}
              />
            }
            wiki={wiki}
          />
          <BrainBotSuggestion
            question={'ELI5'}
            icon={
              <Image
                src={'/eli.svg'}
                alt="eli icon"
                width={14}
                height={20}
                style={{ marginInlineStart: '0px' }}
              />
            }
            wiki={wiki}
          />
        </HStack>
      </VStack>
    </Box>
  )
}

export default BotSuggestions
