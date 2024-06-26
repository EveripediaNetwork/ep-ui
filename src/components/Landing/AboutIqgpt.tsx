import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { LinkButton } from '../Elements'
import { useTranslation } from 'next-i18next'
import AboutGPTMockup from '../Elements/Image/AboutGPTMockup'
import { LinkWrapper } from '../Elements/LinkElements/LinkWrapper'

const AboutIqgpt = () => {
  const { t } = useTranslation('home')
  return (
    <Box px={{ base: 6, md: 8 }}>
      <VStack
        align={{ base: 'center' }}
        gap={{ base: 2, lg: 6 }}
        pt={{ base: 5 }}
        maxW={'1290px'}
        rounded={'12px'}
        bgColor={'aboutIqgptInfoBg'}
        mb={{ base: 0, md: 255, lg: 375 }}
        mx={'auto'}
      >
        <HStack
          spacing={2}
          rounded={'16px'}
          py={'4px'}
          pl={'4px'}
          pr={'10px'}
          color={'brandLinkColor'}
          bgColor={'brand.50'}
          _dark={{ bgColor: 'brand.100' }}
          // mixBlendMode={'multiply'}
        >
          <Center py={'2px'} px={'10px'} bgColor={'white'} rounded={'3xl'}>
            <Text fontSize={'14px'}>{t('IQGPTHeading1')}</Text>
          </Center>
          <HStack spacing={1}>
            <Text fontSize={{ base: '14px', md: '16px' }}>
              {t('IQGPTHeading2')}
            </Text>
            <LinkWrapper href={'https://iqgpt.com/'}>
              <Box as="a" target="_blank">
                <ArrowForwardIcon />
              </Box>
            </LinkWrapper>
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
              color="rgba(26, 32, 44, 1)"
              _dark={{ color: 'whiteAlpha.900' }}
            >
              {t('IQGPTHeading3')}
            </Text>
          </HStack>
          <Box pb={{ base: '10px', lg: '40px' }} px={{ base: 3 }}>
            <Text
              maxW={{ md: '588px', lg: '910px' }}
              color="rgba(26, 32, 44, 1)"
              _dark={{ color: 'whiteAlpha.900' }}
              fontSize={{ base: '14px', md: '16px' }}
            >
              {`${t('aboutIQGPTBody')}`}
            </Text>
          </Box>
          <HStack gap={4} pb={'70px'}>
            <LinkButton
              href={'https://iqgpt.com/'}
              target="_blank"
              size="lg"
              variant="solid"
              px={{ base: 5 }}
              fontSize={'12px'}
              fontWeight={'semibold'}
            >
              {t('IQGPTBtn1')}
            </LinkButton>
            <LinkButton
              href={'https://iq.wiki/wiki/iq'}
              target="_blank"
              size="lg"
              px={{ base: 5 }}
              fontSize={'12px'}
              bgColor={'white'}
              color={'gray.700'}
              _hover={{
                bgColor: 'gray.200',
              }}
              fontWeight={'semibold'}
            >
              {t('IQGPTBtn2')}
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
              h={768}
            />
          </Box>
          <Box
            display={{ base: 'none', md: 'inherit', lg: 'none' }}
            position={'absolute'}
            bottom={'-60%'}
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
                light: '/images/mockups/mockup-sm.png',
                dark: '/images/mockups/mockup-sm-dark.png',
              }}
              w={500}
              h={360}
            />
          </Box>
        </VStack>
      </VStack>
    </Box>
  )
}

export default AboutIqgpt
