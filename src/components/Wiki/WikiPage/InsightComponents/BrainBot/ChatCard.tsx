import { AnswerSources } from '@/hooks/useStream/schema'
import {
  setCurrentAIMessage,
  setCurrentChatId,
  setCurrentMessage,
  setMessages,
} from '@/store/slices/chatbot-slice'
import { Box, Flex, Text } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import remarkGfm from 'remark-gfm'
import ChatSources from './ChatSources'
import styles from '../../../../../styles/markdown.module.css'
import { RiArrowLeftSLine } from 'react-icons/ri'
import IQGPTIcon from '@/components/Elements/icons/IQGPTIcon'
import { useAppSelector } from '@/store/hook'
import { setIsLoading } from '@/store/slices/stream-slice'

type ChatProps = {
  content: string
  alias: 'AI' | 'HUMAN'
  avatar?: ReactNode
  answerSources?: AnswerSources[]
}

const DEFAULT_RESPONSE =
  'I can assist you with any questions about crypto. What would you like to ask?'

const ChatCard = ({ content, alias, answerSources }: ChatProps) => {
  const dispatch = useDispatch()
  const { isError } = useAppSelector((state) => state.stream)

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
        w={'35px'}
        h={'24px'}
        borderRadius={'4px'}
        top={0}
        left={0}
        onClick={() => {
          dispatch(setCurrentMessage(''))
          dispatch(setCurrentAIMessage(''))
          dispatch(setCurrentChatId(null))
          dispatch(setMessages([]))
          dispatch(setIsLoading(false))
        }}
      >
        <RiArrowLeftSLine size={'24px'} />
      </Box>
      <Flex
        border={'1px'}
        borderColor={alias === 'HUMAN' ? 'brainBotBorder' : 'brainBotAIBorder'}
        bgColor={alias === 'AI' ? 'bodyBg' : ''}
        borderRadius={'4px'}
        padding={alias === 'AI' ? '8px' : '0px 6px'}
        alignItems={'flex-start'}
        gap={'4px'}
        mt={content === DEFAULT_RESPONSE ? '36px' : '0px'}
        maxWidth={alias === 'AI' ? '95%' : '90%'}
        minHeight={alias === 'HUMAN' ? '24px' : 'auto'}
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
            <IQGPTIcon width={'9px'} h={'8px'} />
          </Box>
        )}
        <Flex
          direction={'column'}
          alignItems={'flex-start'}
          width={'100%'}
          style={{ marginInlineStart: '0px' }}
        >
          <Box
            color={'heroHeaderDescription'}
            className={`${styles.markdownBody}`}
            width={'full'}
            style={{ fontSize: '14px' }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p(props) {
                  const { children, ...rest } = props
                  return (
                    <Text
                      {...rest}
                      style={{
                        marginBottom: '4px',
                        wordBreak: 'break-word',
                      }}
                    >
                      {children}
                    </Text>
                  )
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </Box>
          {alias === 'AI' && content !== DEFAULT_RESPONSE && !isError && (
            <ChatSources answerSource={answerSource} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ChatCard
