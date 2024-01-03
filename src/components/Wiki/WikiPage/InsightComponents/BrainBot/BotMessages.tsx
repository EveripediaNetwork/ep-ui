import { useAppSelector } from '@/store/hook'
import React from 'react'
import ChatCard from './ChatCard'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { Logo } from '@/components/Elements'
import LoadingDots from './LoadingDots'

const BotMessages = () => {
  const { currentHumanMessage, messages } = useAppSelector(
    (state) => state.message,
  )
  const { isLoading } = useAppSelector((state) => state.stream)

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      position={'relative'}
      gap={'10px'}
      width={'100%'}
    >
      {messages?.map((message) => {
        return (
          <React.Fragment key={message.id}>
            <ChatCard content={message.search} alias={'HUMAN'} />
            <ChatCard
              content={message.answer}
              alias={'AI'}
              answerSources={message.answerSources}
            />
          </React.Fragment>
        )
      })}
      {currentHumanMessage && (
        <ChatCard alias="HUMAN" content={currentHumanMessage} />
      )}

      {isLoading && (
        <HStack
          border={'1px'}
          borderRadius={'4px'}
          borderColor={'brainBotBorder'}
          bgColor={'white'}
          alignItems={'center'}
          paddingBlock={'8px'}
          paddingInline={'8px'}
          width={'60%'}
          justifyContent={'flex-start'}
          _dark={{
            bgColor: 'gray.700',
          }}
        >
          {' '}
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
          <Flex gap={'4px'} alignItems={'flex-end'}>
            <Text fontSize={'12px'} style={{ lineHeight: 0.8 }}>
              Presenting Data
            </Text>
            <LoadingDots />
          </Flex>
        </HStack>
      )}
    </Box>
  )
}

export default BotMessages
