import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BrainBotSuggestion } from './BrainBot'
import QuestionMarkIcon from '@/components/Icons/questionMarkIcon'
import Image from 'next/image'

const BotSuggestions = () => {
  return (
    <Box paddingBlock={'14px'}>
      <Text maxW={'255px'} fontSize={'12px'} textAlign={'center'}>
        Hi There! I’m the BrainBot. Here are some cool stuff i can do for you.
      </Text>
      <VStack marginTop={'12px'}>
        <BrainBotSuggestion
          question={'Generate additional info for this page'}
          icon={<QuestionMarkIcon style={{ marginInlineStart: '0px' }} />}
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
        />
        <HStack gap={'8px'}>
          <BrainBotSuggestion
            question={'Ask me about crypto'}
            icon={
              <Image
                src={'/sun.svg'}
                alt="Sun icon"
                width={12}
                height={20}
                style={{ marginInlineStart: '0px' }}
              />
            }
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
          />
        </HStack>
      </VStack>
    </Box>
  )
}

export default BotSuggestions
