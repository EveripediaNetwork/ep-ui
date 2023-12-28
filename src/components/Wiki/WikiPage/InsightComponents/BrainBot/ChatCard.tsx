import { Logo } from '@/components/Elements'
import BackArrow from '@/components/Icons/backArrow'
import { AnswerSources } from '@/hooks/useStream/schema'
import {
  setCurrentChatId,
  setCurrentMessage,
  setMessages,
} from '@/store/slices/chatbot-slice'
import { Box, HStack, VStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import remarkGfm from 'remark-gfm'
import ChatSources from './ChatSources'

type ChartProps = {
  content: string
  alias: 'AI' | 'HUMAN'
  avatar?: ReactNode
  answerSources?: AnswerSources[]
}
const ChatCard = ({ content, alias, answerSources }: ChartProps) => {
  const dispatch = useDispatch()

  const [answerSource] = answerSources || []

  return (
    <HStack
      width={'100%'}
      justifyContent={alias === 'HUMAN' ? 'flex-end' : 'flex-start'}
    >
      <BackArrow
        cursor={'pointer'}
        fontSize={'24px'}
        position={'absolute'}
        top={0}
        left={0}
        onClick={() => {
          dispatch(setCurrentMessage(''))
          dispatch(setCurrentChatId(null))
          dispatch(setMessages([]))
        }}
      />
      <HStack
        border={'1px'}
        borderColor={'divider'}
        bgColor={alias === 'AI' ? 'gray.700' : ''}
        borderRadius={'4px'}
        padding={'8px'}
        alignItems={'flex-start'}
      >
        {alias === 'AI' && (
          <Box
            w={'15px'}
            borderWidth={'0.5px'}
            borderColor={'whiteAlpha.300'}
            h={'15px'}
            borderRadius={'100px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Logo width={'9px'} h={'8px'} />
          </Box>
        )}
        <VStack alignItems={'flex-start'}>
          <Box fontSize={'12px'} color={'heroHeaderDescription'}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </Box>
          {alias === 'AI' && <ChatSources answerSource={answerSource} />}
        </VStack>
      </HStack>
    </HStack>
  )
}

export default ChatCard
