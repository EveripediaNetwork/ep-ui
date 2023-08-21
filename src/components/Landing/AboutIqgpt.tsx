import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { Logo } from '../Elements'

const AboutIqgpt = () => {
  return (
    <VStack spacing={6}>
      <HStack
        spacing={2}
        rounded={'16px'}
        py={'4px'}
        pl={'4px'}
        pr={'10px'}
        bgColor={'brand.50'}
      >
        <Center
          py={'2px'}
          px={'10px'}
          color={'brand.500'}
          bgColor={'white'}
          rounded={'3xl'}
        >
          <Text fontSize={'14px'}>New</Text>
        </Center>
        <HStack spacing={1} color={'brand.500'}>
          <Text>We built IQ GPT</Text>
          <ArrowForwardIcon />
        </HStack>
      </HStack>
      <HStack
        rounded={'20px'}
        border={'1px'}
        borderColor={'gray.100'}
        px={'24px'}
        pt={'8px'}
        pb={'20px'}
      >
        <VStack>
          <HStack>
            <Logo />
            <Text
              fontWeight="bold"
              fontSize="xl"
              color="gray.900"
              _dark={{ color: 'white' }}
            >
              IQ GPT
            </Text>
          </HStack>
          <Box>
            <Text>
              IQ GPT, is an extension of IQ Wiki’s decentralised foundation that
              incorporates A.I models specifically designed for the crypto
              domain. It leverages different data sources to enhance it’s
              capabilities and summarizes information such as complex
              terminologies, real-time market trends and breaking news from
              these platforms.
            </Text>
            <Text>
              IQ GPT is powered by the IQ token, enabling IQ holders to
              participate in governance and get access to additional features.
            </Text>
          </Box>
          <HStack>
            <Button
              as="a"
              href={'https://iqgpt.com/'}
              target="_blank"
              size="lg"
              variant="solid"
            >
              Explore IQ GPT
            </Button>
            <Button
              as="a"
              href={''}
              target="_blank"
              size="lg"
              variant="outline"
            >
              Explore IQ GPT
            </Button>
          </HStack>
        </VStack>
        <VStack
          bgColor={'brand.500'}
          rounded={'20px'}
          pt={'237px'}
          pb={'119px'}
          px={'9px'}
        >
          <VStack gap={5} px={'32px'} pb={'24px'}>
            <CustomListItem text="Stay ahead of the competition with access to real-time price data, trading volumes, market capitalization and other key market data via convenient conversation-like prompting." />
            <CustomListItem text="Get AI generated answers to all your crypto questions powered by data from IQ Wiki - the world's largest crypto encyclopedia, Flywheel, AP News, Coinness and others." />
            <CustomListItem text="Equip yourself with AI powered market analysis from real time market data, news and trends." />
          </VStack>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default AboutIqgpt

const CustomListItem = ({ text }: { text: string }) => {
  return (
    <Flex gap={2} align={'flex-start'}>
      <CheckCircleIcon color={'white'} />
      <Text mt={-1} color={'white'}>
        {text}
      </Text>
    </Flex>
  )
}
