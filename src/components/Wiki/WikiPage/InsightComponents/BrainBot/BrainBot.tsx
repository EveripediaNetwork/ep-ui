import { Logo } from '@/components/Elements'
import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { useAppSelector } from '@/store/hook'
import { WikiInsightsProps } from '../../WikiInsights'
import { Wiki } from '@everipedia/iq-utils'
import ChatBot from './ChatBot'
import { BrainBotSuggestion } from './BotSuggestions'
import QuestionMarkIcon from '@/components/Icons/questionMarkIcon'
import Image from 'next/image'

export const queryMapper = (query: string, wiki: Wiki) => {
  let newQuery = ''

  switch (query) {
    case 'Generate additional info for this page':
      newQuery = `${wiki.content} 
          Generate an additional information for the content above?        
        `
      break
    case 'Content/page summary.':
      newQuery = `${wiki.content} 
          Summarize the content above?        
        `
      break
    case 'ELI5':
      newQuery = `${wiki.content} 
          Explain the content above like I am a 5yr old?        
        `
      break

    default:
      newQuery = query
      break
  }

  return newQuery
}

const BrainBot = ({ wiki }: WikiInsightsProps) => {
  const [open, setOpen] = useState(true)
  const chatsRef = useRef<HTMLDivElement | null>(null)
  const { currentHumanMessage, messages } = useAppSelector(
    (state) => state.message,
  )

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentHumanMessage])

  const scrollToBottom = () => {
    if (chatsRef.current) {
      chatsRef.current.scrollTop = chatsRef.current?.scrollHeight
    }
  }

  return (
    <>
      {open ? (
        <ChatBot wiki={wiki} setOpen={setOpen} />
      ) : (
        <Box
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          w={'full'}
          p={'10px'}
          borderRadius={8}
          borderColor="rankingListBorder"
          backgroundColor={'btnBgColor'}
          borderWidth={1}
        >
          <Box display={'flex'} alignItems={'center'}>
            <Box
              bgColor={'brainBotBorder'}
              borderRadius={'8px'}
              w={'29px'}
              h={'29px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexShrink={0}
            >
              <Logo width={'18px'} height={'18px'} />
            </Box>
            <Text
              color={'fadedText'}
              fontSize={'12px'}
              fontWeight={'500'}
              textAlign={'center'}
            >
              Get more insights on the article content with IQ brainbot
            </Text>
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={'8px'}
            marginTop={'14px'}
            alignItems={'center'}
          >
            <BrainBotSuggestion
              question={'Generate additional info for this page'}
              icon={<QuestionMarkIcon style={{ marginInlineStart: '0px' }} />}
              wiki={wiki}
              setOpen={setOpen}
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
              setOpen={setOpen}
            />
            <Text color={'homeDescriptionColor'} fontSize={'10px'}>
              And more...
            </Text>
            <Box color={'brandLinkColor'}>
              <RiArrowDownSLine
                size={'28px'}
                onClick={() => setOpen(true)}
                style={{ flexShrink: 0, cursor: 'pointer' }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

export default BrainBot
