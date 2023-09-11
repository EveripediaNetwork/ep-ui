import { BrandingAssets } from '@/components/Branding/BrandingAssets'
import {
  Box,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import {
  alternateLogoAssets,
  iqLogoAsset,
  braindaoAltLogoAssets,
  braindaoLogoAssets,
  iqgptLogoAssets,
} from '../../components/Branding/brandassets'
import BrandWrapper from '@/components/Branding/BrandWrapper'

const BrandingListItem = ({ content }: { content: string }) => {
  return (
    <ListItem display={'flex'} alignItems={'center'} gap={3}>
      <Flex
        shrink={0}
        justify={'center'}
        justifyItems={'center'}
        align={'center'}
        bgColor={'brand.200'}
        w={'24px'}
        h={'24px'}
        rounded={'full'}
      >
        <Icon as={AiOutlineClose} fontSize={'16px'} color="primaryPink" />
      </Flex>
      <Text fontSize={{ lg: 20 }}>{content}</Text>
    </ListItem>
  )
}

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
          px={5}
          backgroundImage="/images/backgrounds/homepage-bg-white.png"
          _dark={{
            backgroundImage: '/images/backgrounds/careers-background-dark.png',
          }}
          pb={{ base: '50px', lg: '100px', xl: 180 }}
        >
          <Box pt={{ base: '40px', md: '60px', lg: '89px' }} mx={'auto'}>
            <Text color="brandLinkColor">Branding</Text>
            <Heading
              color="careersTextColor"
              fontWeight={'600'}
              fontSize={{ base: '20px', md: '28px', lg: '36px', xl: '48px' }}
            >
              IQ wiki Media Kit
            </Heading>
            <Text
              maxW={{ sm: '70%', xl: '828px' }}
              fontSize={{ lg: '20px', base: 'md', xl: 24 }}
              mt={'8px'}
              mb={'75px'}
              mx={'auto'}
            >
              Gain convenient access to our brand toolkits and assets,
              simplifying their utilization on your website and for other
              marketing needs.
            </Text>
          </Box>
        </Flex>

        <Box
          position={'relative'}
          maxW={{ base: '90%', sm: '70%', lg: '80%', xl: '1140px' }}
          bgColor={'red.100'}
          mx="auto"
        >
          <VStack
            position={'absolute'}
            top={{ base: '-100px', xl: '-150px', '2xl': '-180px' }}
            justify={'center'}
            align={'center'}
            bgColor={'aboutIqgptInfoBg'}
            rounded={'12px'}
            textAlign={'center'}
            h={{ xl: '356px' }}
            py={{ base: 5, lg: '50px' }}
            px={{ base: 5, xl: '80px' }}
            mx={'auto'}
          >
            <Text fontSize={{ lg: '20px', xl: 24 }} color={'gray.800'}>
              The media kit serves as a valuable resource, offering clear
              guidelines for the correct usage of IQ.wiki's brand assets to
              maintain their accurate representation.
            </Text>
            <Text fontSize={{ lg: '20px', xl: 24 }} color={'gray.800'}>
              We deeply appreciate being featured in your content and are
              enthusiastic about exploring potential partnership opportunities.
              Please feel free to reach out to us for any collaboration ideas or
              inquiries.
            </Text>
          </VStack>
        </Box>

        <Box
          mt={{ base: '230px', sm: '150px', lg: '230px', xl: '266px' }}
          mb={24}
          maxW={{ base: '90%', '2xl': '1280px' }}
          mx="auto"
        >
          <Flex flexDir="column">
            <Heading fontWeight={'600'} fontSize={{ base: '24px', lg: '36px' }}>
              IQ logo
            </Heading>
            <Text mt={4} fontSize={{ lg: '20px', base: 'sm' }}>
              The IQ.wiki logo draws inspiration from BrainDAO, a Web 3.0 DAO
              driven by the IQ token, committed to forging a connection between
              the physical world and the metaverse. This connection is achieved
              by funding various forms of knowledge on the blockchain. <br />{' '}
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

        <BrandWrapper title="IQ.wiki logo" brandAsset={iqLogoAsset} />
        <BrandWrapper
          title="BrainDAO"
          brandAsset={braindaoAltLogoAssets}
          isBrainDao
        />
        <BrandWrapper
          title="BrainDao- Alternate logo"
          brandAsset={braindaoLogoAssets}
        />
        <BrandWrapper title="IQGPT" brandAsset={iqgptLogoAssets} />

        <Box bgColor={'bodyBg'}>
          <Box py={24} maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
            <Flex flexDir="column" gap={5}>
              <Heading fontSize="3xl">Please beware of these things.</Heading>
            </Flex>
            <Flex mt={10}>
              <List display="flex" flexDir="column" gap="10">
                <BrandingListItem
                  content="Do not use the IQ.wiki logo in any way that suggests that we
                    are sponsoring, endorsing or affliated to your project in
                    any way."
                />
                <BrandingListItem
                  content={`The IQ.wiki brain logo shouldn’t be reperesented with any
                  other kind of brain except as stated above.`}
                />
                <BrandingListItem
                  content={'Do not in any way stretch or manipulate the logo.'}
                />
                <BrandingListItem
                  content={
                    'Do not change the logo color asides the ones stated above.'
                  }
                />
              </List>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BrandingPage
