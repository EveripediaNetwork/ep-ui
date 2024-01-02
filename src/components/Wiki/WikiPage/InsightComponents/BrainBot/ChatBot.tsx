import { Box, Text } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import { RiSubtractFill } from 'react-icons/ri'
import BotChatBox from './BotChatBox'
import BotMessages from './BotMessages'
import BotSuggestions from './BotSuggestions'
import { Logo } from '@/components/Elements'
import { Wiki } from '@everipedia/iq-utils'
import { useAppSelector } from '@/store/hook'

const ChatBot = ({
  wiki,
  setOpen,
}: {
  wiki: Wiki
  setOpen: (state: boolean) => void
}) => {
  const chatsRef = useRef<HTMLDivElement | null>(null)
  const { currentHumanMessage, currentChatId, messages } = useAppSelector(
    state => state.message,
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
        ref={chatsRef}
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
        <Text fontSize={'8px'}>Powered by IQ & BrainDAO</Text>
      </Box>
    </Box>
  )
}

export default ChatBot
