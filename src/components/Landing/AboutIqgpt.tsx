import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { LinkButton } from '../Elements'
import { useTranslation } from 'react-i18next'
import AboutGPTMockup from '../Elements/Image/AboutGPTMockup'

const AboutIqgpt = () => {
  const { t } = useTranslation()
  return (
    <VStack
      align={{ base: 'center' }}
      gap={{ base: 2, lg: 6 }}
      pt={{ base: 5 }}
      maxW={'1200px'}
      rounded={'12px'}
      bgColor={'aboutIqgptInfoBg'}
      mt={{ base: '50px', md: '40px' }}
      mb={{ base: 0, md: 240, lg: 350 }}
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
        mixBlendMode={'multiply'}
      >
        <Center py={'2px'} px={'10px'} bgColor={'white'} rounded={'3xl'}>
          <Text fontSize={'14px'}>New</Text>
        </Center>
        <HStack spacing={1}>
          <Text fontSize={{ base: '14px', md: '16px' }}>We built IQ GPT</Text>
          <ArrowForwardIcon />
        </HStack>
      </HStack>

      <VStack
        pb={{ md: '250' }}
        textAlign={'center'}
        align={{ base: 'center' }}
        position={'relative'}
      >
        <HStack px={{ base: 3 }}>
          <Text
            fontWeight={'600'}
            maxW={{ md: '400', lg: '900' }}
            lineHeight={{ base: '32px', md: '40px' }}
            textAlign={'center'}
            fontSize={{ base: '24px', md: '30px', lg: '36px' }}
            color="gray.800"
          >
            IQ GPT - The World's First AI Crypto Search Engine
          </Text>
        </HStack>
        <Box pb={{ base: '10px', lg: '40px' }} px={{ base: 3 }}>
          <Text
            maxW={{ md: '588px', lg: '910px' }}
            color={'aboutIqgptDesc'}
            fontSize={{ base: '14px', md: '16px' }}
          >
            {`${t('aboutIQGPTBody')}`}
          </Text>
        </Box>
        <HStack gap={4} pb={'70px'}>
          <LinkButton
            href={'https://iqgpt.com/'}
            size="lg"
            variant="solid"
            px={{ base: 5 }}
            fontSize={'12px'}
            fontWeight={'semibold'}
          >
            Explore IQ GPT
          </LinkButton>
          <LinkButton
            href={'https://iq.wiki/wiki/iq'}
            size="lg"
            px={{ base: 5 }}
            fontSize={'12px'}
            bgColor={'white'}
            color={'gray.700'}
            fontWeight={'semibold'}
          >
            About IQ Token
          </LinkButton>
        </HStack>

        <Box
          display={{ base: 'none', lg: 'inherit' }}
          position={'absolute'}
          bottom={'-75%'}
        >
          <AboutGPTMockup
            bg={{
              light: '/images/mockups/mockup-xl.png',
              dark: '/images/mockups/mockup-xl-dark.png',
            }}
            w={1020}
            h={708}
          />
        </Box>
        <Box
          display={{ base: 'none', md: 'inherit', lg: 'none' }}
          position={'absolute'}
          bottom={'-55%'}
        >
          <AboutGPTMockup
            bg={{
              light: '/images/mockups/mockup-md.png',
              dark: '/images/mockups/mockup-md-dark.png',
            }}
            w={570}
            h={548}
          />
        </Box>
        <Box display={{ md: 'none' }}>
          <AboutGPTMockup
            bg={{
              light: '/images/mockups/mockup-base.png',
              dark: '/images/mockups/mockup-base-dark.png',
            }}
            w={500}
            h={360}
          />
        </Box>
      </VStack>
    </VStack>
  )
}

export default AboutIqgpt
