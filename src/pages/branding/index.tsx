import { BrandingAssets } from '@/components/Branding/BrandingAssets'
import {
  Box,
  Flex,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
  VStack,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {
  alternateLogoAssets,
  IQLogoAsset,
  braindaoAltLogoAssets,
  braindaoLogoAssets,
  iqgptLogoAssets,
} from './brandingassets'

const BrandingPage = () => {
  const [currentViewedAsset, setCurrentViewedAsset] = useState<string>('')

  return (
    <Box
      _dark={{
        bgColor: '#1A202C',
      }}
    >
      <NextSeo
        title="IQ.wiki Branding kit & official logos"
        description="IQ.wiki Branding kit & official logos"
        openGraph={{
          title: 'IQ.wiki Branding kit & official logos',
          description: 'IQ.wiki Branding kit & official logos',
        }}
      />
      <Box>
        <Flex
          justify={'center'}
          align={'center'}
          objectFit="cover"
          textAlign={'center'}
          bgColor="careersBackground"
          backgroundImage="/images/backgrounds/homepage-bg-white.png"
          _dark={{
            backgroundImage: '/images/backgrounds/careers-background-dark.png',
          }}
          position={'relative'}
          pb={{ lg: 180 }}
        >
          <Box pt={{ lg: 89 }} mx={'auto'}>
            <Text color="brandLinkColor">Branding</Text>
            <Heading
              color="careersTextColor"
              fontWeight={'600'}
              fontSize={{ lg: '36px', base: '3xl', xl: '48px' }}
            >
              IQ wiki Media Kit
            </Heading>
            <Text
              maxW={'768px'}
              fontSize={{ lg: '20px', base: 'md' }}
              mt={'8px'}
              mb={'75px'}
              mx={'auto'}
            >
              Gain convenient access to our brand toolkits and assets,
              simplifying their utilization on your website and for other
              marketing needs.
            </Text>
          </Box>
          <VStack
            justify={'center'}
            align={'center'}
            bgColor={'aboutIqgptInfoBg'}
            rounded={'12px'}
            w={'1144px'}
            h={'356px'}
            mx={'auto'}
            position={'absolute'}
            bottom={'-35%'}
          >
            <Text fontSize={'24px'} maxW={'1022px'} color={'gray.800'}>
              The media kit serves as a valuable resource, offering clear
              guidelines for the correct usage of IQ.wiki's brand assets to
              maintain their accurate representation.
            </Text>
            <Text fontSize={'24px'} maxW={'1022px'} color={'gray.800'}>
              {' '}
              We deeply appreciate being featured in your content and are
              enthusiastic about exploring potential partnership opportunities.
              Please feel free to reach out to us for any collaboration ideas or
              inquiries.
            </Text>
          </VStack>
        </Flex>

        <Box
          mt={{ base: 20, lg: '266px' }}
          mb={24}
          maxW={{ base: '90%', '2xl': '1280px' }}
          mx="auto"
        >
          <Flex flexDir="column">
            <Heading
              fontWeight={'600'}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              IQ logo
            </Heading>
            <Text
              mt={4}
              fontSize={{ lg: '20px', base: 'sm' }}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              The IQ.wiki logo draws inspiration from BrainDAO, a Web 3.0 DAO
              driven by the IQ token, committed to forging a connection between
              the physical world and the metaverse. This connection is achieved
              by funding various forms of knowledge on the blockchain.
            </Text>
            <Text
              fontSize={{ lg: '20px', base: 'sm' }}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              The logo, symbolizing IQ and BrainDAO, takes the form of a brain—a
              symbol of boundless knowledge and cognitive power, signifying the
              fusion of these both entities.
            </Text>
          </Flex>
          <Flex
            mt={10}
            flexWrap="wrap"
            gap="2rem"
            justifyContent="space-between"
          >
            {alternateLogoAssets.map((item, index) => {
              return (
                <BrandingAssets
                  key={index}
                  bg={item}
                  currentlyViewed={currentViewedAsset}
                  updateSelectedAsset={() => {
                    setCurrentViewedAsset(item.bg)
                  }}
                  dark={item.dark}
                  isBraindao
                />
              )
            })}
          </Flex>
        </Box>

        <Box pb={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
          <Flex flexDir="column" gap={5}>
            <Heading
              fontWeight={'600'}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              IQ.wiki logo
            </Heading>
          </Flex>
          <Flex
            mt={10}
            flexWrap="wrap"
            gap="2rem"
            justifyContent="space-between"
          >
            {IQLogoAsset.map((item, index) => {
              return (
                <BrandingAssets
                  key={index}
                  bg={item}
                  currentlyViewed={currentViewedAsset}
                  updateSelectedAsset={() => {
                    setCurrentViewedAsset(item.bg)
                  }}
                  dark={item.dark}
                />
              )
            })}
          </Flex>
        </Box>

        <Box pb={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
          <Flex flexDir="column" gap={5}>
            <Heading
              fontSize={{ lg: '36px' }}
              fontWeight={'600'}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              BrainDAO
            </Heading>
          </Flex>
          <Flex
            mt={10}
            flexWrap="wrap"
            gap="2rem"
            justifyContent="space-between"
          >
            {braindaoAltLogoAssets.map((item, index) => {
              return (
                <BrandingAssets
                  key={index}
                  bg={item}
                  currentlyViewed={currentViewedAsset}
                  dark={item.dark}
                  updateSelectedAsset={() => {
                    setCurrentViewedAsset(item.bg)
                  }}
                  isBraindao
                />
              )
            })}
          </Flex>
        </Box>

        <Box pb={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
          <Flex flexDir="column" gap={5}>
            <Heading
              fontSize={{ lg: '36px' }}
              fontWeight={'600'}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              BrainDao- Alternate logo
            </Heading>
          </Flex>
          <Flex
            mt={10}
            flexWrap="wrap"
            gap="2rem"
            justifyContent="space-between"
          >
            {braindaoLogoAssets.map((item, index) => {
              return (
                <BrandingAssets
                  key={index}
                  bg={item}
                  currentlyViewed={currentViewedAsset}
                  dark={item.dark}
                  updateSelectedAsset={() => {
                    setCurrentViewedAsset(item.bg)
                  }}
                />
              )
            })}
          </Flex>
        </Box>

        <Box pb={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
          <Flex flexDir="column" gap={5}>
            <Heading
              fontSize={{ lg: '36px' }}
              fontWeight={'600'}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              IQGPT
            </Heading>
          </Flex>
          <Flex
            mt={10}
            flexWrap="wrap"
            gap="2rem"
            justifyContent="space-between"
          >
            {iqgptLogoAssets.map((item, index) => {
              return (
                <BrandingAssets
                  key={index}
                  bg={item}
                  currentlyViewed={currentViewedAsset}
                  dark={item.dark}
                  updateSelectedAsset={() => {
                    setCurrentViewedAsset(item.bg)
                  }}
                />
              )
            })}
          </Flex>
        </Box>

        <Box bgColor={'bodyBg'}>
          <Box py={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
            <Flex flexDir="column" gap={5}>
              <Heading fontSize="3xl">Please beware of these things.</Heading>
            </Flex>
            <Flex mt={10}>
              <List display="flex" flexDir="column" gap="10">
                <ListItem>
                  <ListIcon as={AiOutlineClose} color="primaryPink" />
                  Do not use the IQ.wiki logo in any way that suggests that we
                  are sponsoring, endorsing or affliated to your project in any
                  way.
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineClose} color="primaryPink" />
                  The IQ.wiki brain logo shouldn’t be reperesented with any
                  other kind of brain except as stated above.
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineClose} color="primaryPink" />
                  Do not in any way stretch or manipulate the logo.
                </ListItem>
                <ListItem>
                  <ListIcon as={AiOutlineClose} color="primaryPink" />
                  Do not change the logo color asides the ones stated above.
                </ListItem>
              </List>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BrandingPage
