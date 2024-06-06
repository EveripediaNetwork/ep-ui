import { Box, Link, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import BotChatBox from './BotChatBox'
import BotMessages from './BotMessages'
import BotSuggestions from './BotSuggestions'
import { Wiki } from '@everipedia/iq-utils'
import { useAppSelector } from '@/store/hook'
import IQGPTIcon from '@/components/Elements/icons/IQGPTIcon'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import {
  setCurrentAIMessage,
  setCurrentChatId,
  setCurrentMessage,
  setMessages,
} from '@/store/slices/chatbot-slice'

const ChatBot = ({ wiki }: { wiki: Wiki }) => {
  const { t } = useTranslation('wiki')
  const { currentHumanMessage, currentChatId, currentAIMessage } =
    useAppSelector((state) => state.message)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentMessage(''))
    dispatch(setCurrentAIMessage(''))
    dispatch(setCurrentChatId(null))
    dispatch(setMessages([]))
  }, [])

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
          <Text>{t('chatBotTitle')}</Text>
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
        <Text fontSize={'8px'}>{t('chatBotFooter')}</Text>
      </Link>
    </Box>
  )
}

export default ChatBot
