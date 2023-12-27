import { Logo } from '@/components/Elements'
import { Box, HStack, Input, Text, chakra } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import {
  RiArrowDownSLine,
  RiChat3Fill,
  RiSendPlaneFill,
  RiSubtractFill,
} from 'react-icons/ri'
import BotSuggestions from './BotSuggestions'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/hook'
import { setMessage } from '@/store/slices/chatbot-slice'
import ChatCard from './ChatCard'
import useStream from '@/hooks/useStream'

export const BrainBotSuggestion = ({
  question,
  icon,
}: {
  question: string
  icon: ReactNode
}) => {
  const dispatch = useDispatch()
  const { fetchAnswer } = useStream()

  const askQuestion = async (question: string) => {
    dispatch(setMessage(question))
    await fetchAnswer({ search: 'What is verve?' })
  }
  return (
    <HStack
      gap={'8px'}
      border={'1px'}
      borderColor={'black'}
      padding={'6px'}
      borderRadius={'4px'}
      cursor={'pointer'}
      _dark={{
        borderColor: 'whiteAlpha.700',
      }}
      onClick={() => {
        askQuestion(question)
      }}
    >
      <Text fontSize={'10px'}>{question}</Text>
      {icon}
    </HStack>
  )
}

const BrainBot = () => {
  const [open, setOpen] = useState(false)
  const { currentHumanMessage, currentAiMessage } = useAppSelector(
    (state) => state.message,
  )

  console.log(currentAiMessage)
  return (
    <>
      {open ? (
        <Box w={'full'} backgroundColor={'brainBotMainBg'}>
          <Box
            display={'flex'}
            backgroundColor={'brainBotBg'}
            paddingInline={'8px'}
            justifyContent={'space-between'}
            paddingBlock={'4px'}
            w={'full'}
            borderBottom={'1px'}
            borderColor={'brainBotBorder'}
          >
            <Box display={'flex'} gap={'8px'} alignItems={'center'}>
              <Box
                backgroundColor={'gray.200'}
                _dark={{
                  backgroundColor: 'whiteAlpha.400',
                }}
                borderRadius={'4px'}
                w={'20px'}
                h={'20px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                flexShrink={0}
              >
                <RiChat3Fill size={'13px'} />
              </Box>
              <Text>BrainBot</Text>
            </Box>
            <RiSubtractFill
              size={'24px'}
              onClick={() => setOpen(false)}
              style={{ flexShrink: 0, cursor: 'pointer' }}
            />
          </Box>
          <Box
            h={'250px'}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            paddingBlock={'12px'}
            paddingInline={'8px'}
          >
            {currentHumanMessage ? <ChatCard /> : <BotSuggestions />}
          </Box>
          <HStack
            bgColor={'white'}
            paddingBlock={'4px'}
            boxShadow={'0px 1px 2px 0px rgba(0, 0, 0, 0.05)'}
            paddingInline={'12px'}
            borderBottom={'1px'}
            borderColor={'divider'}
            _dark={{
              bgColor: 'blackAlpha.800',
            }}
          >
            <Input
              variant={'unstyled'}
              fontSize={'14px'}
              placeholder="Ask the brainbot anything"
              borderRadius={'0'}
              paddingInline={'4px'}
              color={'gray.500'}
              _dark={{
                color: 'gray.600',
              }}
            />
            <Box
              bgColor={'black'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              h="20px"
              w={'20px'}
              borderRadius={'4px'}
              style={{
                marginInlineStart: '0px',
              }}
              color={'white'}
              _dark={{
                color: 'gray.800',
                bgColor: 'white',
              }}
            >
              <RiSendPlaneFill size={'13px'} />
            </Box>
          </HStack>
          <Box
            display={'flex'}
            justifyContent={'center'}
            gap={'4px'}
            paddingBlock={'6px'}
            alignItems={'center'}
            h="full"
          >
            <Logo width={'14px'} height={'14px'} />
            <Text fontSize={'6px'}>Powered by IQ & BrainDAO</Text>
          </Box>
        </Box>
      ) : (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          w={'full'}
          p={'10px'}
          borderRadius={8}
          borderColor="rankingListBorder"
          backgroundColor={'bodyBg'}
          borderWidth={1}
        >
          <Box display={'flex'} gap={'10px'} alignItems={'center'}>
            <Box
              backgroundColor={'divider'}
              borderRadius={'8px'}
              w={'32px'}
              h={'32px'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexShrink={0}
            >
              <RiChat3Fill size={'22px'} />
            </Box>
            <Text color={'fadedText'}>
              Get more insights on the article content with{' '}
              <chakra.span>
                <Logo width={'18px'} height={'18px'} marginRight={'8px'} />
                IQ brainbot
              </chakra.span>{' '}
            </Text>
            <RiArrowDownSLine
              size={'28px'}
              onClick={() => setOpen(true)}
              style={{ flexShrink: 0, cursor: 'pointer' }}
            />
          </Box>
        </Box>
      )}
    </>
  )
}

export default BrainBot
