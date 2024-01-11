import { AnswerSources } from '@/hooks/useStream/schema'
import { ButtonProps, Flex, chakra, Text, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from 'react-icons/ri'
import { FeedbackType } from './schema'
import { useAppSelector } from '@/store/hook'

interface CustomCardProps extends ButtonProps {
  children: React.ReactNode
}

const CustomIconWrapper = React.forwardRef<HTMLButtonElement, CustomCardProps>(
  ({ children, ...rest }, ref) => (
    <chakra.button ref={ref} {...rest}>
      {children}
    </chakra.button>
  ),
)

const ChatSources = ({ answerSource }: { answerSource: AnswerSources }) => {
  const { messages } = useAppSelector((state) => state.message)
  const [feedbackAction, setFeedbackAction] = useState<FeedbackType>()
  const lastMessage = messages?.[messages?.length - 1]
  const handleRating = async (feedbackType: FeedbackType) => {
    if (lastMessage) {
      const response = await fetch('/api/chat-feedback', {
        method: 'POST',
        body: JSON.stringify({
          feedbackType,
          messageId: Number(lastMessage.id),
        }),
      })

      await response.json()
    }
  }

  const handleLike = () => {
    setFeedbackAction('liked')
    handleRating('liked')
  }

  const handleDislike = () => {
    setFeedbackAction('disliked')
    handleRating('disliked')
  }

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      width={'100%'}
      flexWrap={'wrap'}
      gap={'8px'}
    >
      <Flex direction={'column'} fontSize={'10px'} alignItems={'flex-start'}>
        <Text style={{ marginBottom: '0px', color: 'white' }}>
          Source: {answerSource?.title}
        </Text>
        {answerSource.url && (
          <Link
            href={answerSource.url}
            target="_blank"
            style={{
              color: '#FF5CAA',
              textDecoration: 'underline',
            }}
          >
            {answerSource.url}
          </Link>
        )}
      </Flex>
      <Flex gap={'12px'}>
        <Tooltip placement="top" label="Like">
          <CustomIconWrapper onClick={handleLike}>
            {feedbackAction === 'liked' ? (
              <RiThumbUpFill size={'16px'} />
            ) : (
              <RiThumbUpLine size={'16px'} />
            )}
          </CustomIconWrapper>
        </Tooltip>
        <Tooltip placement="top" label="Dislike">
          <CustomIconWrapper onClick={handleDislike}>
            {feedbackAction === 'disliked' ? (
              <RiThumbDownFill size={'16px'} />
            ) : (
              <RiThumbDownLine size={'16px'} />
            )}
          </CustomIconWrapper>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default ChatSources
