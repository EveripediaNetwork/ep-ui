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
      mt={'300px'}
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
          <Text>We built IQ GPT</Text>
          <ArrowForwardIcon />
        </HStack>
      </HStack>
      <SimpleGrid
        columns={2}
        spacingX={4}
        bgColor={'cardBg'}
        rounded={'20px'}
        border={'1px'}
        borderColor={'gray.100'}
        px={'24px'}
        pt={'62px'}
        pb={'56px'}
        _dark={{
          borderColor: 'whiteAlpha.300',
        }}
      >
        <VStack maxW={'500px'} align={'self-start'}>
          <HStack>
            <Logo w="85px" h="85px" />
            <Text
              fontWeight="bold"
              fontSize="48px"
              color="wikiFlagTextColor"
              _dark={{ color: 'white' }}
            >
              IQ GPT
            </Text>
          </HStack>
          <Box color={'eventTextColor'} pb={'20px'}>
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
          <HStack gap={6}>
            <Button
              as="a"
              href={'https://iqgpt.com/'}
              target="_blank"
              size="lg"
              variant="solid"
              w={{ xl: '140px' }}
              fontSize={'12px'}
            >
              Explore IQ GPT
            </Button>
            <Button
              as="a"
              href={''}
              target="_blank"
              size="lg"
              variant="outline"
              w={{ xl: '140px' }}
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
          pt={'200px'}
          pb={'100px'}
          px={'9px'}
          mt={'-150px'}
        >
          <Box
            pos={'absolute'}
            rounded={'100%'}
            bgColor={'aboutIqgptInfoBg'}
            w={'350px'}
            h={'350px'}
            top={'-30%'}
            left={'50%'}
            transform={'auto-gpu'}
            translateX={'-50%'}
          >
            <Image
              src="/images/GIFs/intelligentRobot.gif"
              alt="IQ GPT AI robot"
              width={350}
              height={350}
            />
          </Box>
          <VStack gap={5} px={'28px'} pb={'24px'}>
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
