import { ArrowForwardIcon, CheckCircleIcon } from '@chakra-ui/icons'
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { LinkButton, Logo } from '../Elements'
import { useTranslation } from 'react-i18next'

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

const AboutIqgpt = () => {
  const { t } = useTranslation()
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
              {`${t('aboutIQGPTOneBody')}`}
            </Text>
            <Text fontSize={{ base: '14px', md: '16px' }}>
              {`${t('aboutIQGPTTwoBody')}`}
            </Text>
          </Box>
          <HStack gap={{ base: 2, xl: 6 }}>
            <LinkButton
              href={'https://iqgpt.com/'}
              size="lg"
              variant="solid"
              px={{ base: 3, md: 5 }}
              fontSize={'12px'}
            >
              Explore IQ GPT
            </LinkButton>
            <LinkButton
              href={'https://iqgpt.com/about'}
              size="lg"
              variant="outline"
              px={{ base: 3, md: 5 }}
              fontSize={'12px'}
              color={'aboutIqTokenText'}
            >
              About IQ Token
            </LinkButton>
          </HStack>
        </VStack>
        <Box
          pos={'relative'}
          bgColor={'brandLinkColor'}
          rounded={'20px'}
          pt={{ base: '180px', md: '150px', lg: '200px' }}
          pb={{ base: '30px', md: '0px', lg: '70px' }}
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
              src="/images/GIFs/intelligentRobotMin.gif"
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
            <CustomListItem text={`${t('benefitIQGPTOne')}`} />
            <CustomListItem text={`${t('benefitIQGPTTwo')}`} />
            <CustomListItem text={`${t('benefitIQGPTThree')}`} />
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  )
}

export default AboutIqgpt
