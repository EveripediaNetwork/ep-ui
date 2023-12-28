import { Logo } from '@/components/Elements'
import BackArrow from '@/components/Icons/backArrow'
import { AnswerSources } from '@/hooks/useStream/schema'
import {
  setCurrentChatId,
  setCurrentMessage,
  setMessages,
} from '@/store/slices/chatbot-slice'
import { Box, HStack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import remarkGfm from 'remark-gfm'

type ChartProps = {
  content: string
  alias: 'AI' | 'HUMAN'
  avatar?: ReactNode
  answerSource?: AnswerSources
}
const ChatCard = ({ content, alias }: ChartProps) => {
  const dispatch = useDispatch()
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
        borderColor={'whiteAlpha.200'}
        bgColor={'gray.700'}
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
        <Box fontSize={'12px'} color={'heroHeaderDescription'}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </Box>
      </HStack>
    </HStack>
  )
}

export default ChatCard
