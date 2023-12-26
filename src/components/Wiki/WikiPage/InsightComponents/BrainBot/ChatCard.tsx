import BackArrow from '@/components/Icons/backArrow'
import { useAppSelector } from '@/store/hook'
import { setMessage } from '@/store/slices/chatbot-slice'
import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

const ChatCard = () => {
  const { currentHumanMessage } = useAppSelector((state) => state.message)
  const dispatch = useDispatch()
  return (
    <HStack
      alignItems={'flex-start'}
      width={'100%'}
      justifyContent={'space-between'}
    >
      <BackArrow
        cursor={'pointer'}
        fontSize={'24px'}
        onClick={() => dispatch(setMessage(''))}
      />
      <Box
        border={'1px'}
        borderColor={'wikiCardBorderColor'}
        borderRadius={'4px'}
        padding={'8px'}
        fontSize={'12px'}
        color={'heroHeaderDescription'}
      >
        {currentHumanMessage}
      </Box>
    </HStack>
  )
}

export default ChatCard
