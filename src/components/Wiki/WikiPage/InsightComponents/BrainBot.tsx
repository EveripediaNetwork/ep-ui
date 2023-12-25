import { Logo } from '@/components/Elements'
import QuestionMarkIcon from '@/components/Icons/questionMarkIcon'
import { Box, HStack, Input, Text, VStack, chakra } from '@chakra-ui/react'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import {
  RiArrowDownSLine,
  RiChat3Fill,
  RiSendPlaneFill,
  RiSubtractFill,
} from 'react-icons/ri'

export const BrainBotSuggestion = ({
  question,
  icon,
}: {
  question: string
  icon: ReactNode
}) => {
  return (
    <HStack
      gap={'8px'}
      border={'1px'}
      borderColor={'black'}
      padding={'6px'}
      borderRadius={'4px'}
      _dark={{
        borderColor: 'whiteAlpha.700',
      }}
    >
      <Text fontSize={'10px'}>{question}</Text>
      {icon}
    </HStack>
  )
}

const BrainBot = () => {
  const [open, setOpen] = useState(false)
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
          >
            <Box paddingBlock={'14px'}>
              <Text maxW={'255px'} fontSize={'12px'} textAlign={'center'}>
                Hi There! I’m the BrainBot. Here are some cool stuff i can do
                for you.
              </Text>
              <VStack marginTop={'12px'}>
                <BrainBotSuggestion
                  question={'Generate additional info for this page'}
                  icon={
                    <QuestionMarkIcon style={{ marginInlineStart: '0px' }} />
                  }
                />
                <BrainBotSuggestion
                  question={'Content/page summary.'}
                  icon={
                    <Image
                      src={'/summary.svg'}
                      alt="Sun icon"
                      width={12}
                      height={20}
                      style={{ marginInlineStart: '0px' }}
                    />
                  }
                />
                <HStack gap={'8px'}>
                  <BrainBotSuggestion
                    question={'Ask me about crypto'}
                    icon={
                      <Image
                        src={'/sun.svg'}
                        alt="Sun icon"
                        width={12}
                        height={20}
                        style={{ marginInlineStart: '0px' }}
                      />
                    }
                  />
                  <BrainBotSuggestion
                    question={'ELI5'}
                    icon={
                      <Image
                        src={'/eli.svg'}
                        alt="eli icon"
                        width={14}
                        height={20}
                        style={{ marginInlineStart: '0px' }}
                      />
                    }
                  />
                </HStack>
              </VStack>
            </Box>
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
