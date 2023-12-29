import { AnswerSources } from '@/hooks/useStream/schema'
import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri'

const ChatSources = ({ answerSource }: { answerSource: AnswerSources }) => {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      width={'100%'}
      flexWrap={'wrap'}
      gap={'8px'}
    >
      <Flex direction={'column'} fontSize={'10px'} alignItems={'flex-start'}>
        <Text>Source: {answerSource.title}</Text>
        {answerSource.url && (
          <Link
            href={answerSource.url}
            target="_blank"
            style={{
              marginTop: '2px',
              color: '#FF5CAA',
              textDecoration: 'underline',
            }}
          >
            {answerSource.url}
          </Link>
        )}
      </Flex>
      <Flex gap={'12px'}>
        <RiThumbUpLine size={'16px'} />
        <RiThumbDownLine size={'16px'} />
      </Flex>
    </Flex>
  )
}

export default ChatSources
