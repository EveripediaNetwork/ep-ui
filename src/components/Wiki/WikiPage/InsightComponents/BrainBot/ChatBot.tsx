import { Box, Link, Text } from '@chakra-ui/react'
import React, { useRef } from 'react'
import BotChatBox from './BotChatBox'
import BotMessages from './BotMessages'
import BotSuggestions from './BotSuggestions'
import { Wiki } from '@everipedia/iq-utils'
import { useAppSelector } from '@/store/hook'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import IQGPTIcon from '@/components/Elements/icons/IQGPTIcon'

const ChatBot = ({ wiki }: { wiki: Wiki }) => {
  const chatsRef = useRef<HTMLDivElement | null>(null)
  const { currentHumanMessage, currentChatId, messages, currentAIMessage } =
    useAppSelector((state) => state.message)

  useScrollToBottom(chatsRef, [messages, currentHumanMessage])

  return (
    <Box
      w={'full'}
      borderRadius={'8px'}
      overflow={'hidden'}
      border={'1px'}
      borderColor={'rankingListBorder'}
      backgroundColor={'brainBotMainBg'}
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
            bgColor={'brainBotAIBorder'}
            borderRadius={'4px'}
            w={'20px'}
            h={'20px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexShrink={0}
          >
            <IQGPTIcon width={'14px'} height={'14px'} />
          </Box>
          <Text>IQ GPT Chat</Text>
        </Box>
      </Box>
      <Box
        h={'250px'}
        overflowY={'auto'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        paddingBlock={'12px'}
        paddingInline={'8px'}
        ref={chatsRef}
      >
        {currentHumanMessage || currentChatId || currentAIMessage ? (
          <BotMessages />
        ) : (
          <BotSuggestions wiki={wiki} />
        )}
      </Box>
      <BotChatBox wiki={wiki} />
      <Link
        target="_blank"
        href="https://www.iqgpt.com/"
        display={'flex'}
        justifyContent={'center'}
        gap={'4px'}
        paddingBlock={'6px'}
        alignItems={'center'}
        h="full"
      >
        <IQGPTIcon width={'14px'} height={'14px'} />
        <Text fontSize={'8px'}>Powered by IQGPT.com</Text>
      </Link>
    </Box>
  )
}

export default ChatBot
