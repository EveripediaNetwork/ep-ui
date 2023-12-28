import useStream from '@/hooks/useStream'
import { setCurrentMessage } from '@/store/slices/chatbot-slice'
import { chakra, HStack, Input } from '@chakra-ui/react'
import { Wiki } from '@everipedia/iq-utils'
import React, { ChangeEvent, useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

const BotChatBox = ({ wiki }: { wiki: Wiki }) => {
  const [chatInput, setChatInput] = useState('')
  const { askQuestion } = useStream()
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = (
      new FormData(e.currentTarget).get('message') as string
    ).trim()
    if (message.length === 0) return
    dispatch(setCurrentMessage(message))
    askQuestion({ question: message, wiki: wiki })
    setChatInput('')
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <HStack
        bgColor={'brainBotBg'}
        paddingBlock={'4px'}
        boxShadow={'0px 1px 2px 0px rgba(0, 0, 0, 0.05)'}
        paddingInline={'12px'}
        borderBottom={'1px'}
        borderColor={'divider'}
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
            color: 'whiteAlpha.600',
          }}
          onChange={handleChange}
        />
        <chakra.button
          type="submit"
          flexShrink={'0'}
          bgColor={'brand.600'}
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
            bgColor: 'brand.800',
          }}
        >
          <RiSendPlaneFill size={'13px'} />
        </chakra.button>
      </HStack>
    </form>
  )
}

export default BotChatBox
