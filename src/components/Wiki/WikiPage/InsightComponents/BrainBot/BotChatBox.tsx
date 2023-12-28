import useStream from '@/hooks/useStream'
import { setCurrentMessage } from '@/store/slices/chatbot-slice'
import { Box, HStack, Input } from '@chakra-ui/react'
import { Wiki } from '@everipedia/iq-utils'
import React, { ChangeEvent, useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

const BotChatBox = ({ wiki }: { wiki: Wiki }) => {
  const [chatInput, setChatInput] = useState('')
  const { askQuestion } = useStream()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const inputLength = e.target.value.trim().length
    setChatInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = (
      new FormData(e.currentTarget).get('message') as string
    ).trim()
    console.log(message)
    if (message.length === 0) return
    dispatch(setCurrentMessage(message))
    askQuestion({ question: message, wiki: wiki })
    setChatInput('')
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
          value={chatInput}
          name="message"
          variant={'unstyled'}
          fontSize={'14px'}
          placeholder="Ask the brainbot anything"
          borderRadius={'0'}
          paddingInline={'4px'}
          color={'gray.500'}
          _dark={{
            color: 'gray.600',
          }}
          onChange={handleChange}
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
    </form>
  )
}

export default BotChatBox
