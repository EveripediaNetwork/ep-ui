import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import QuestionMarkIcon from '@/components/Icons/questionMarkIcon'
import Image from 'next/image'
import { Wiki } from '@everipedia/iq-utils'
import useStream from '@/hooks/useStream'

export const BrainBotSuggestion = ({
  question,
  icon,
  wiki,
  setOpen,
}: {
  question: string
  icon: ReactNode
  wiki: Wiki
  setOpen?: (state: boolean) => void
}) => {
  const { askQuestion } = useStream()

  return (
    <HStack
      gap={'8px'}
      border={'1px'}
      borderColor={'iqgptAdCardBorder'}
      padding={'6px'}
      borderRadius={'4px'}
      cursor={'pointer'}
      onClick={() => {
        if (setOpen) {
          setOpen(true)
        }
        askQuestion({ question, wiki })
      }}
    >
      <Text color={'emptyNotificationText'} fontSize={'12px'}>
        {question}
      </Text>
      {icon}
    </HStack>
  )
}

const BotSuggestions = ({ wiki }: { wiki: Wiki }) => {
  return (
    <Box paddingBlock={'14px'}>
      <Text
        color={'fadedText'}
        maxW={'295px'}
        fontSize={'14px'}
        textAlign={'center'}
      >
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
