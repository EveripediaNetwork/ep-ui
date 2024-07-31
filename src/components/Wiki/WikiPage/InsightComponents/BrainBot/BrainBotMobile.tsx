import React, { useState, useEffect } from 'react'
import { Box, Text, IconButton, Link } from '@chakra-ui/react'
import { RiArrowDownSLine } from 'react-icons/ri'
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

const BrainBotMobile = ({
  wiki,
  onInteraction,
}: {
  wiki: Wiki
  onInteraction: (action: string, properties?: Record<string, any>) => void
}) => {
  const [open, setOpen] = useState(false)
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
        backgroundColor={open ? 'brainBotBg' : 'wikiCardBg'}
        paddingInline={'8px'}
        justifyContent={'space-between'}
        paddingBlock={'4px'}
        w={'full'}
        borderBottom={'1px'}
        borderColor={'brainBotBorder'}
        onClick={() => setOpen(!open)}
      >
        <Box display={'flex'} gap={'8px'} alignItems={'center'}>
          <IconButton
            color="linkColor"
            variant="link"
            minW={3}
            aria-label={'toggle brainBot'}
            icon={<RiArrowDownSLine />}
          />
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
          <Text fontSize={'sm'} color="linkColor" p={3}>
            {open
              ? 'IQ GPT Chat'
              : 'Get more insights on the article content with IQ GPT chat bot'}
          </Text>
        </Box>
      </Box>
      <Box display={open ? 'block' : 'none'}>
        <Box
          h={'250px'}
          overflowY={'auto'}
          alignItems={'center'}
          flexDirection={'column'}
          paddingBlock={'12px'}
          paddingInline={'8px'}
          display={'flex'}
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
        >
          <IQGPTIcon width={'14px'} height={'14px'} />
          <Text fontSize={'12px'}>{t('chatBotFooter')}</Text>
        </Link>
      </Box>
    </Box>
  )
}

export default BrainBotMobile
