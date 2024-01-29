import useStream from '@/hooks/useStream'
import { useAppSelector } from '@/store/hook'
import { setCurrentMessage } from '@/store/slices/chatbot-slice'
import { chakra, HStack, Input } from '@chakra-ui/react'
import { Wiki } from '@everipedia/iq-utils'
import React, { ChangeEvent, useState } from 'react'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'

const BotChatBox = ({ wiki }: { wiki: Wiki }) => {
  const [chatInput, setChatInput] = useState('')
  const { askQuestion } = useStream()
  const dispatch = useDispatch()
  const { isLoading } = useAppSelector(state => state.stream)
  const { t } = useTranslation('wiki')

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
    askQuestion({
      question: message,
      query: `You will be given question: ${message}. answer with tools provided to you. you will also be given  ${wiki.title} from where the user asked the question from`,
      // query: `${t('defaultQuery1')} ${message}. ${t('defaultQuery2')}  ${
      //   wiki.title
      // } ${t('defaultQuery3')}`,
    })
    setChatInput('')
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <HStack
        bgColor={'brainBotBg'}
        paddingBlock={'4px'}
        boxShadow={'0px 1px 2px 0px rgba(0, 0, 0, 0.05)'}
        paddingInline={'12px'}
        borderY={'1px'}
        borderColor={'divider'}
      >
        <Input
          value={chatInput}
          name="message"
          variant={'unstyled'}
          fontSize={'14px'}
          placeholder={t('chatBotInputPlaceholder')}
          borderRadius={'0'}
          paddingInline={'4px'}
          color={'gray.500'}
          _dark={{
            color: 'whiteAlpha.600',
          }}
          onChange={handleChange}
          disabled={isLoading}
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
          disabled={isLoading}
        >
          <RiSendPlaneFill size={'13px'} />
        </chakra.button>
      </HStack>
    </form>
  )
}

export default BotChatBox
