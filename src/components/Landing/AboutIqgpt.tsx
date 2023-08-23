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
      <Text mt={-1} fontSize={{ base: '12px', md: '16px' }} color={'white'}>
        {text}
      </Text>
    </Flex>
  )
}

const AboutIqgpt = () => {
  const { t } = useTranslation()
  return (
    <VStack
      align={{ base: 'center', lg: 'self-start' }}
      spacing={6}
      px={{ base: 3, md: 8 }}
      maxW={'1050px'}
      mt={{ md: '100px', lg: '300px' }}
      mb={{ base: '200px', lg: 0 }}
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
        columns={{ base: 1, lg: 2 }}
        gap={{ base: '150px', md: '250px', lg: 4 }}
        bgColor={'cardBg'}
        rounded={{ base: '6px', md: '20px' }}
        border={'1px'}
        borderColor={'gray.100'}
        px={{ base: '20px', md: '36px', xl: '24px' }}
        pr={{ lg: '12px' }}
        pt={{ base: '18px', md: '32px', lg: '62px' }}
        pb={{ md: '0', lg: '44px', xl: '56px' }}
        _dark={{
          borderColor: 'whiteAlpha.300',
        }}
      >
        <VStack
          maxW={{ base: '500px', md: '100%', lg: '500px' }}
          pb={{ md: '18px', lg: '0px' }}
          align={{ base: 'center', lg: 'self-start' }}
        >
          <HStack>
            <Logo
              w={{ base: '50px', md: '60px', lg: '85px' }}
              h={{ base: '50px', md: '60px', lg: '85px' }}
            />
            <Text
              fontWeight="bold"
              fontSize={{ base: '24px', md: '36px', lg: '48px' }}
              color="wikiFlagTextColor"
              _dark={{ color: 'white' }}
            >
              IQ GPT
            </Text>
          </HStack>
          <Box
            textAlign={{ base: 'center', lg: 'inherit' }}
            color={'eventTextColor'}
            pb={'20px'}
          >
            <Text fontSize={{ base: '14px', md: '16px' }}>
              {`${t('aboutIQGPTOneBody')}`}
            </Text>
            <Text fontSize={{ base: '14px', md: '16px' }}>
              {`${t('aboutIQGPTTwoBody')}`}
            </Text>
          </Box>
          <HStack gap={4}>
            <LinkButton
              href={'https://iqgpt.com/'}
              size="lg"
              variant="solid"
              px={{ base: 5 }}
              fontSize={'12px'}
            >
              Explore IQ GPT
            </LinkButton>
            <LinkButton
              href={'https://iq.wiki/wiki/iq'}
              size="lg"
              variant="outline"
              px={{ base: 5 }}
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
          rounded={{ base: '6px', md: '20px' }}
          pt={{ base: '180px', md: '180px', lg: '200px' }}
          pb={{ base: '10px', md: '20px', lg: '70px' }}
          px={'9px'}
          mt={{ md: '-100px', lg: '-150px' }}
          mb={{ base: '-200px', lg: 0 }}
        >
          <Box
            pos={'absolute'}
            rounded={'100%'}
            bgColor={'aboutIqgptInfoBg'}
            w={{ base: 250, md: '300px', lg: '350px' }}
            h={{ base: 250, md: '300px', lg: '350px' }}
            top={{ base: '-25%', md: '-30%', lg: '-30%' }}
            left={'50%'}
            transform={'auto-gpu'}
            translateX={'-50%'}
          >
            <Image
              src="/images/GIFs/intelligent-robot.gif"
              alt="IQ GPT AI robot"
              width={{ base: 250, md: 300, lg: 350 }}
              height={{ base: 250, md: 300, lg: 350 }}
            />
          </Box>
          <VStack
            gap={{ base: 2, md: 5 }}
            px={{ md: '30px', lg: '20px', xl: '28px' }}
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
