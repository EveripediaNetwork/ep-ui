import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { Logo } from '../Elements'

const AboutIqgpt = () => {
  return (
    <VStack
      align={'self-start'}
      spacing={6}
      px={{ base: 3, md: 8 }}
      maxW={'1050px'}
      mt={{ md: '200px', lg: '300px' }}
      mb={{ base: '100px' }}
      mx={'auto'}
    >
      <HStack
        spacing={2}
        rounded={'16px'}
        py={'4px'}
        pl={'4px'}
        pr={'10px'}
        color={'brandLinkColor'}
        bgColor={'aboutIqgptInfoBg'}
      >
        <Center py={'2px'} px={'10px'} bgColor={'white'} rounded={'3xl'}>
          <Text fontSize={'14px'}>New</Text>
        </Center>
        <HStack spacing={1}>
          <Text fontSize={{ base: '14px', md: '16px' }}>We built IQ GPT</Text>
          <ArrowForwardIcon />
        </HStack>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={{ base: '200px', md: 4 }}
        bgColor={'cardBg'}
        rounded={'20px'}
        border={'1px'}
        borderColor={'gray.100'}
        px={{ md: '12px', xl: '24px' }}
        pr={{ md: 0, lg: '12px' }}
        pt={{ base: '18px', md: '32px', lg: '62px' }}
        pb={{ md: '0', lg: '44px', xl: '56px' }}
        _dark={{
          borderColor: 'whiteAlpha.300',
        }}
      >
        <VStack
          maxW={'500px'}
          px={{ base: '8px', md: '0' }}
          pb={{ md: '18px', lg: '0px' }}
          align={'self-start'}
        >
          <HStack>
            <Logo
              w={{ base: '60px', lg: '85px' }}
              h={{ base: '60px', lg: '85px' }}
            />
            <Text
              fontWeight="bold"
              fontSize={{ base: '28px', md: '36px', lg: '48px' }}
              color="wikiFlagTextColor"
              _dark={{ color: 'white' }}
            >
              IQ GPT
            </Text>
          </HStack>
          <Box color={'eventTextColor'} pb={'20px'}>
            <Text fontSize={{ base: '14px', md: '16px' }}>
              IQ GPT, is an extension of IQ Wiki’s decentralised foundation that
              incorporates A.I models specifically designed for the crypto
              domain. It leverages different data sources to enhance it’s
              capabilities and summarizes information such as complex
              terminologies, real-time market trends and breaking news from
              these platforms.
            </Text>
            <Text fontSize={{ base: '14px', md: '16px' }}>
              IQ GPT is powered by the IQ token, enabling IQ holders to
              participate in governance and get access to additional features.
            </Text>
          </Box>
          <HStack gap={{ base: 2, xl: 6 }}>
            <Button
              as="a"
              href={'https://iqgpt.com/'}
              target="_blank"
              size="lg"
              variant="solid"
              px={{ base: 5, md: 2 }}
              fontSize={'12px'}
            >
              Explore IQ GPT
            </Button>
            <Button
              as="a"
              href={'https://iqgpt.com/about'}
              target="_blank"
              size="lg"
              variant="outline"
              px={{ base: 5, md: 2 }}
              fontSize={'12px'}
              color={'aboutIqTokenText'}
            >
              About IQ Token
            </Button>
          </HStack>
        </VStack>
        <Box
          pos={'relative'}
          bgColor={'brandLinkColor'}
          rounded={'20px'}
          pt={{ base: '180px', md: '150px', lg: '200px' }}
          pb={{ base: '30px', md: '0px', lg: '100px' }}
          px={'9px'}
          mt={{ md: '-100px', lg: '-150px' }}
        >
          <Box
            pos={'absolute'}
            rounded={'100%'}
            bgColor={'aboutIqgptInfoBg'}
            w={{ base: '300px', md: '250px', lg: '350px' }}
            h={{ base: '300px', md: '250px', lg: '350px' }}
            top={{ base: '-30%', md: '-25%', lg: '-30%' }}
            left={'50%'}
            transform={'auto-gpu'}
            translateX={'-50%'}
          >
            <Image
              src="/images/GIFs/intelligentRobot.gif"
              alt="IQ GPT AI robot"
              width={{ base: '300px', md: 250, lg: 350 }}
              height={{ base: '300px', md: 250, lg: 350 }}
            />
          </Box>
          <VStack
            gap={{ md: 2, lg: 5 }}
            px={{ md: '10px', lg: '20px', xl: '28px' }}
            pb={'24px'}
          >
            <CustomListItem text="Stay ahead of the competition with access to real-time price data, trading volumes, market capitalization and other key market data via convenient conversation-like prompting." />
            <CustomListItem text="Get AI generated answers to all your crypto questions powered by data from IQ Wiki - the world's largest crypto encyclopedia, Flywheel, AP News, Coinness and others." />
            <CustomListItem text="Equip yourself with AI powered market analysis from real time market data, news and trends." />
          </VStack>
        </Box>
      </SimpleGrid>
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
