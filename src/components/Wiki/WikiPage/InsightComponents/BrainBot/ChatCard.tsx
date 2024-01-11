import { AnswerSources } from '@/hooks/useStream/schema'
import {
  setCurrentAIMessage,
  setCurrentChatId,
  setCurrentMessage,
  setMessages,
} from '@/store/slices/chatbot-slice'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import React, { ReactNode, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import remarkGfm from 'remark-gfm'
import ChatSources from './ChatSources'
import styles from '../../../../../styles/markdown.module.css'
import { RiArrowLeftDoubleFill, RiPlayFill } from 'react-icons/ri'
import IQGPTIcon from '@/components/Elements/icons/IQGPTIcon'
import { useAppSelector } from '@/store/hook'
import { setIsLoading } from '@/store/slices/stream-slice'

type ChartProps = {
  content: string
  alias: 'AI' | 'HUMAN'
  avatar?: ReactNode
  answerSources?: AnswerSources[]
}

const _paginateContent = (text: string, charsPerPage: number) => {
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

const _usePaginateContent = (content: string) => {
  const [pages, setPages] = useState<string[]>([])

  useEffect(() => {
    const contentArray = content.split(' ') // Split content into words
    let tempPage = ''
    const tempPages = []
    let tempHeight = 0

    const tempElement = document.createElement('div')
    const wrapperElement = document.querySelector('.mkd-wrapper')
    tempElement.style.position = 'absolute'
    tempElement.style.width = '319px'
    tempElement.style.maxHeight = '140px'
    // tempElement.style.lineHeight = '20'
    tempElement.style.visibility = 'hidden'
    document.body.appendChild(tempElement)

    if (!wrapperElement) return

    for (let i = 0; i < contentArray.length; i++) {
      const word = contentArray[i]
      const testPage = `${tempPage} ${word} `

      tempElement.innerText = testPage // Temporarily set text to measure
      const computedStyles = window.getComputedStyle(tempElement)
      tempHeight = parseInt(computedStyles.height, 10)
      // console.log(window.getComputedStyle(wrapperElement).height)
      const wrapperHeight = parseInt(
        window.getComputedStyle(wrapperElement).height,
        10,
      )
      // console.log(wrapperHeight)
      if (wrapperHeight >= 110) {
        // console.log({ tempHeight: wrapperElement })
        tempPages.push(tempPage.trim())
        tempPage = `${word} `
      } else {
        tempPage = testPage
      }
    }

    // Add the last page if there is remaining content
    if (tempPage.trim()) {
      tempPages.push(tempPage.trim())
    }

    setPages(tempPages)

    // Cleanup: remove the temporary element
    document.body.removeChild(tempElement)
  }, [content])

  return pages
}

const ContentPagination = ({ content, alias, answerSources }: ChartProps) => {
  const { currentAIMessage } = useAppSelector((state) => state.message)
  const { isError } = useAppSelector((state) => state.stream)
  const _markdownTableRegex = /\|.*\|.*\|/
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  // const pages = markdownTableRegex.test(content)
  //   ? content.split('\n\n')
  //   : paginateContent(content, 350)
  const pages = content.split('\n\n')

  const [answerSource] = answerSources || []

  const goToNextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPageIndex(currentPageIndex - 1)
  }

  return (
    <div className="">
      <div className="mkd-wrapper">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          children={pages[currentPageIndex]}
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
        />
      </div>
      {alias === 'AI' &&
        !currentAIMessage &&
        !isError &&
        currentPageIndex === pages.length - 1 && (
          <ChatSources answerSource={answerSource} />
        )}
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
        <RiArrowLeftDoubleFill size={'24px'} />
      </Box>
      <Flex
        border={'1px'}
        borderColor={alias === 'HUMAN' ? 'brainBotBorder' : 'brainBotAIBorder'}
        bgColor={alias === 'AI' ? 'bodyBg' : ''}
        borderRadius={'4px'}
        padding={alias === 'AI' ? '8px' : '8px 20px'}
        alignItems={'flex-start'}
        gap={'4px'}
        mt={
          content ===
          'I can assist you with any questions about crypto. What would you like to ask?'
            ? '36px'
            : '0px'
        }
        width={alias === 'AI' ? '95%' : ''}
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
