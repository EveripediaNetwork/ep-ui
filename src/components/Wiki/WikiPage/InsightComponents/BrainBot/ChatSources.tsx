import { AnswerSources } from '@/hooks/useStream/schema'
import { HStack, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { RiThumbDownLine, RiThumbUpLine } from 'react-icons/ri'

const ChatSources = ({ answerSource }: { answerSource: AnswerSources }) => {
  return (
    <HStack
      justifyContent={'space-between'}
      alignItems={'flex-end'}
      width={'100%'}
    >
      <VStack fontSize={'10px'} alignItems={'flex-start'}>
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
      </VStack>
      <HStack>
        <RiThumbUpLine size={'16px'} />
        <RiThumbDownLine size={'16px'} />
      </HStack>
    </HStack>
  )
}

export default ChatSources
