import { Logo } from '@/components/Elements'
import { AnswerSources } from '@/hooks/useStream/schema'
import {
  setCurrentChatId,
  setCurrentMessage,
  setMessages,
} from '@/store/slices/chatbot-slice'
import { Box, Flex } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import remarkGfm from 'remark-gfm'
import ChatSources from './ChatSources'
import { customTableRenderer } from '../../CustomRenderers/customTableRender'
import styles from '../../../../../styles/markdown.module.css'
import { RiArrowLeftDoubleFill } from 'react-icons/ri'

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
    <Flex
      width={'100%'}
      justifyContent={alias === 'HUMAN' ? 'flex-end' : 'flex-start'}
    >
      <Box
        cursor={'pointer'}
        position={'absolute'}
        bgColor={'bodyBg'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'22px'}
        h={'16px'}
        borderRadius={'4px'}
        top={0}
        left={0}
        onClick={() => {
          dispatch(setCurrentMessage(''))
          dispatch(setCurrentChatId(null))
          dispatch(setMessages([]))
        }}
      >
        <RiArrowLeftDoubleFill size={'16px'} />
      </Box>
      <Flex
        border={'1px'}
        borderColor={'brainBotBorder'}
        bgColor={alias === 'AI' ? 'bodyBg' : ''}
        borderRadius={'4px'}
        padding={'8px'}
        alignItems={'flex-start'}
        gap={'4px'}
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
            flexShrink={0}
          >
            <Logo width={'9px'} h={'8px'} />
          </Box>
        )}
        <Flex
          direction={'column'}
          alignItems={'flex-start'}
          width={'100%'}
          style={{ marginInlineStart: '0px' }}
        >
          <Box
            fontSize={'12px'}
            color={'heroHeaderDescription'}
            className={`${styles.markdownBody}`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ table: customTableRenderer }}
            >
              {content}
            </ReactMarkdown>
          </Box>
          {alias === 'AI' && <ChatSources answerSource={answerSource} />}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ChatCard
