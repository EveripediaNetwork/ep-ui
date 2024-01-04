import { AnswerSources } from '@/hooks/useStream/schema'
import {
  setCurrentAIMessage,
  setCurrentChatId,
  setCurrentMessage,
  setMessages,
} from '@/store/slices/chatbot-slice'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import remarkGfm from 'remark-gfm'
import ChatSources from './ChatSources'
import { customTableRenderer } from '../../CustomRenderers/customTableRender'
import styles from '../../../../../styles/markdown.module.css'
import { RiArrowLeftDoubleFill, RiPlayFill } from 'react-icons/ri'
import IQGPTIcon from '@/components/Elements/icons/IQGPTIcon'
import { useAppSelector } from '@/store/hook'

type ChartProps = {
  content: string
  alias: 'AI' | 'HUMAN'
  avatar?: ReactNode
  answerSources?: AnswerSources[]
}

const paginateContent = (text: string, charsPerPage: number) => {
  const words = text.split(' ')
  const pages = []
  let currentPage = ''

  words.forEach((word) => {
    if ((currentPage + word).length > charsPerPage) {
      pages.push(currentPage.trim())
      currentPage = `${word} `
    } else {
      currentPage += `${word} `
    }
  })

  if (currentPage.trim()) {
    pages.push(currentPage.trim())
  }

  return pages
}

const CustomTextRenderer = ({ children }: { children: ReactNode[] }) => (
  <Text style={{ marginBottom: '4px' }}>{children}</Text>
)

const ContentPagination = ({ content, alias, answerSources }: ChartProps) => {
  const { currentAIMessage } = useAppSelector((state) => state.message)
  const charsPerPage = 280
  const markdownTableRegex = /\|.*\|.*\|/
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const pages = markdownTableRegex.test(content)
    ? content.split('\n\n')
    : paginateContent(content, charsPerPage)

  const [answerSource] = answerSources || []

  const goToNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPageIndex(currentPageIndex - 1)
  }

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ table: customTableRenderer, p: CustomTextRenderer }}
      >
        {pages[currentPageIndex]}
      </ReactMarkdown>
      {alias === 'AI' &&
        currentPageIndex === pages.length - 1 &&
        !currentAIMessage && <ChatSources answerSource={answerSource} />}
      <Box display={'flex'} gap={'8px'} mt={'8px'} justifyContent={'flex-end'}>
        {currentPageIndex > 0 && (
          <chakra.button
            bgColor={'gray.100'}
            borderRadius={'2px'}
            _dark={{ bgColor: 'whiteAlpha.200' }}
            type="button"
            onClick={goToPreviousPage}
            disabled={currentPageIndex === 0}
            transform="scaleX(-1)"
          >
            <RiPlayFill size={16} />
          </chakra.button>
        )}

        {currentPageIndex < pages.length - 1 && (
          <chakra.button
            bgColor={'gray.100'}
            borderRadius={'2px'}
            _dark={{ bgColor: 'whiteAlpha.200' }}
            type="button"
            onClick={goToNextPage}
            disabled={currentPageIndex === pages.length - 1}
          >
            <RiPlayFill size={16} />
          </chakra.button>
        )}
      </Box>
    </div>
  )
}

const ChatCard = ({ content, alias, answerSources }: ChartProps) => {
  const dispatch = useDispatch()

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
          dispatch(setCurrentAIMessage(''))
          dispatch(setCurrentChatId(null))
          dispatch(setMessages([]))
        }}
      >
        <RiArrowLeftDoubleFill size={'16px'} />
      </Box>
      <Flex
        border={'1px'}
        borderColor={alias === 'HUMAN' ? 'brainBotBorder' : 'brainBotAIBorder'}
        bgColor={alias === 'AI' ? 'bodyBg' : ''}
        borderRadius={'4px'}
        padding={'8px'}
        alignItems={'flex-start'}
        gap={'4px'}
        mt={
          content ===
          'I Can assist you with any questions about crypto. What would you like to ask?'
            ? '24px'
            : '0px'
        }
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
            fontSize={'12px'}
            color={'heroHeaderDescription'}
            className={`${styles.markdownBody}`}
          >
            {alias === 'HUMAN' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            ) : (
              <ContentPagination
                content={content}
                alias={alias}
                answerSources={answerSources}
              />
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ChatCard
