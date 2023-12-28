import { Logo } from '@/components/Elements'
import { Box, Text, chakra } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiArrowDownSLine, RiChat3Fill, RiSubtractFill } from 'react-icons/ri'
import BotSuggestions from './BotSuggestions'
import { useAppSelector } from '@/store/hook'
import BotMessages from './BotMessages'
import { WikiInsightsProps } from '../../WikiInsights'
import { Wiki } from '@everipedia/iq-utils'
import BotChatBox from './BotChatBox'

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
  const [open, setOpen] = useState(false)
  const { currentHumanMessage, currentChatId } = useAppSelector(
    state => state.message,
  )

  return (
    <>
      {open ? (
        <Box
          w={'full'}
          borderRadius={'8px'}
          overflow={'hidden'}
          border={'1px'}
          borderColor={'brainBotBorder'}
          backgroundColor={'brainBotMainBg'}
          boxShadow={'10px 10px 10px -5px rgba(0, 0, 0, 0.04)'}
        >
          <Box
            display={'flex'}
            backgroundColor={'brainBotBg'}
            paddingInline={'8px'}
            justifyContent={'space-between'}
            paddingBlock={'4px'}
            w={'full'}
            borderBottom={'1px'}
            borderColor={'brainBotBorder'}
          >
            <Box display={'flex'} gap={'8px'} alignItems={'center'}>
              <Box
                borderRadius={'4px'}
                w={'20px'}
                h={'20px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexShrink={0}
                border={'1px'}
                borderColor={'brand.500'}
              >
                <Logo width={'13px'} height={'13px'} />
              </Box>
              <Text>IQ GPT Chatbot</Text>
            </Box>
            <RiSubtractFill
              size={'24px'}
              onClick={() => setOpen(false)}
              style={{ flexShrink: 0, cursor: 'pointer' }}
            />
          </Box>
          <Box
            h={'250px'}
            overflowY={'auto'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            paddingBlock={'12px'}
            paddingInline={'8px'}
          >
            {currentHumanMessage || currentChatId ? (
              <BotMessages />
            ) : (
              <BotSuggestions wiki={wiki} />
            )}
          </Box>
          <BotChatBox wiki={wiki} />
          <Box
            display={'flex'}
            justifyContent={'center'}
            gap={'4px'}
            paddingBlock={'6px'}
            alignItems={'center'}
            h="full"
          >
            <Logo width={'14px'} height={'14px'} />
            <Text fontSize={'6px'}>Powered by IQ & BrainDAO</Text>
          </Box>
        </Box>
      ) : (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          w={'full'}
          p={'10px'}
          borderRadius={8}
          borderColor="rankingListBorder"
          backgroundColor={'bodyBg'}
          borderWidth={1}
        >
          <Box display={'flex'} gap={'10px'} alignItems={'center'}>
            <Box
              backgroundColor={'divider'}
              borderRadius={'8px'}
              w={'32px'}
              h={'32px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexShrink={0}
            >
              <RiChat3Fill size={'22px'} />
            </Box>
            <Text color={'fadedText'}>
              Get more insights on the article content with{' '}
              <chakra.span>
                <Logo width={'18px'} height={'18px'} marginRight={'8px'} />
                IQ brainbot
              </chakra.span>{' '}
            </Text>
            <RiArrowDownSLine
              size={'28px'}
              onClick={() => setOpen(true)}
              style={{ flexShrink: 0, cursor: 'pointer' }}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default BrainBot
