import { Box, Link, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import BotChatBox from './BotChatBox'
import BotMessages from './BotMessages'
import BotSuggestions from './BotSuggestions'
import type { Wiki } from '@everipedia/iq-utils'
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

interface ChatBotProps {
  wiki: Wiki
  onInteraction: (action: string, properties?: Record<string, any>) => void
}

const ChatBot = ({ wiki, onInteraction }: ChatBotProps) => {
  const { t } = useTranslation('wiki')
  const { currentHumanMessage, currentChatId, currentAIMessage } =
    useAppSelector((state) => state.message)

  const dispatch = useDispatch()

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
        h={'375px'}
        overflowY={'auto'}
        display={'flex'}
        flexDirection={'column'}
        paddingBlock={'12px'}
        paddingInline={'8px'}
        {...(currentHumanMessage || currentChatId || currentAIMessage
          ? {
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }
          : {
              alignItems: 'center',
              justifyContent: 'center',
            })}
      >
        {currentHumanMessage || currentChatId || currentAIMessage ? (
          <BotMessages />
        ) : (
          <BotSuggestions wiki={wiki} onInteraction={onInteraction} />
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
        onClick={() => onInteraction('iqgpt_link_click')}
      >
        <IQGPTIcon width={'14px'} height={'14px'} />
        <Text fontSize={'12px'}>{t('chatBotFooter')}</Text>
      </Link>
    </Box>
  )
}

export default ChatBot
