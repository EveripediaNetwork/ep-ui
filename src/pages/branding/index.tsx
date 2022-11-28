import { BrandingAssets } from '@/components/Branding/BrandingAssets'
import {
  Box,
  Flex,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Image } from '../../components/Elements/Image/Image'

const BrandingPage = () => {
  const [currentViewedAsset, setCurrentViewedAsset] = useState<string>('')
  const IQLogoAsset = [
    {
      bg: '/branding/iqoriginal.png',
      download: '/branding/downloadassets/logoiqoriginal',
      dark: '/branding/iqoriginalB.png',
    },
    {
      bg: '/branding/iqwhite.png',
      download: '/branding/downloadassets/logoiqwhite',
    },
    {
      bg: '/branding/iqblue.png',
      download: '/branding/downloadassets/logoiqblue',
    },
    {
      bg: '/branding/iqpurple.png',
      download: '/branding/downloadassets/logoiqpurple',
    },
    {
      bg: '/branding/iqdeepblack.png',
      download: '/branding/downloadassets/logoiqdeepblack',
    },
    {
      bg: '/branding/iqnegativepink.png',
      download: '/branding/downloadassets/logoiqnegativepink',
    },
    {
      bg: '/branding/iqpink.png',
      download: '/branding/downloadassets/logoiqpink',
    },
    {
      bg: '/branding/iqnegativewhite.png',
      download: '/branding/downloadassets/logoiqnegativewhite',
    },
    {
      bg: '/branding/iqBlack.png',
      download: '/branding/downloadassets/logoiqblack',
    },
    {
      bg: '/branding/iqred.png',
      download: '/branding/downloadassets/logoiqred',
    },
    {
      bg: '/branding/iqgreen.png',
      download: '/branding/downloadassets/logoiqgreen',
    },
    {
      bg: '/branding/iqorange.png',
      download: '/branding/downloadassets/logoiqorange',
    },
  ]
  const alternateLogoAssets = [
    {
      bg: '/branding/originalBraindao.png',
      download: '/branding/downloadassets/logooriginalbrain',
      dark: '/branding/logooriginalbrainB.png',
    },
    {
      bg: '/branding/braindaowhiteNegative.png',
      download: '/branding/downloadassets/logobrainwhitenegative',
    },
    {
      bg: '/branding/braindaoBlackNegative.png',
      download: '/branding/downloadassets/logobrainblacknegative',
    },
  ]
  const braindaoLogoAssets = [
    {
      bg: '/branding/braindoawhiteW.png',
      download: '/branding/downloadassets/logobraindoawhiteW',
      dark: '/branding/braindoawhiteB.png',
    },
    {
      bg: '/branding/braindaoblack.png',
      download: '/branding/downloadassets/logobraindaoblack',
    },
    {
      bg: '/branding/braindaodeepblack.png',
      download: '/branding/downloadassets/logobraindaodeepblack',
    },
  ]

  const braindaoAltLogoAssets = [
    {
      bg: '/branding/brainaltwhite.png',
      download: '/branding/downloadassets/logobrainaltwhite',
      dark: '/branding/brainaltwhiteB.png',
    },
    {
      bg: '/branding/brainaltblack.png',
      download: '/branding/downloadassets/logobraindaoaltblack',
    },
    {
      bg: '/branding/braindaoaltdeepblack.png',
      download: '/branding/downloadassets/logobraindoadeepblack',
    },
  ]
  const heroImg = useColorModeValue('/brandingBrain.png', '/brandingBrainB.png')
  return (
    <Box m="0" bg="brandHero" pb={20} my={-8}>
      <NextSeo
        title="IQ.Wiki Branding kit & official logos"
        description="IQ.Wiki Branding kit & official logos"
        openGraph={{
          title: `IQ.Wiki Branding kit & official logos`,
          description: `IQ.Wiki Branding kit & official logos`,
        }}
      />
      <Box maxW={{ base: '90%', '2xl': '1280px' }} mx="auto">
        <Flex
          alignItems="center"
          flexDir={{ base: 'column', lg: 'row' }}
          mt={{ lg: 16 }}
        >
          <Box w={{ base: '100%', lg: '60%' }}>
            <Heading
              textAlign={{ base: 'center', lg: 'initial' }}
              color="brand.500"
              _dark={{ color: '#FF1A88' }}
              fontSize={{ lg: '6xl', base: '3xl' }}
              pt={{ lg: 0, base: 8 }}
              mb={{ base: 6, lg: 10 }}
              mt={{ base: 18 }}
            >
              IQ.WIKI Branding kit
            </Heading>
            <Text
              textAlign={{ base: 'center', lg: 'initial' }}
              w={{ lg: '90%', base: '100%', md: '60%' }}
              fontSize={{ lg: '2xl', base: 'md' }}
              mx={{ md: 'auto', lg: '0' }}
            >
              Get easy acess to our brand toolkits and assests for easy usage
              across your site and other marketing purposes.
            </Text>
          </Box>
          <Image
            objectFit="contain"
            imgH={500}
            imgW={500}
            maxW="80vw"
            src={heroImg}
            alt="Bringing knowledge to the blockchain."
            priority
            mt={10}
          />
        </Flex>

        <Flex mt={{ base: '16', lg: '10' }} mx="auto" justifyContent="center">
          <Text
            position="relative"
            w={{ base: '100%', lg: '80%' }}
            fontSize={{ base: '2xl', md: '4xl' }}
            textAlign="center"
            lineHeight="1.5"
            my={{ base: '2', lg: '24' }}
          >
            <Text
              position="absolute"
              top={{ base: '-10%', lg: '-20%' }}
              left={{ base: '0%', lg: '-5%', md: '-3%' }}
              fontSize={{ lg: '100px', base: '50px' }}
              color="brand.600"
            >
              “
            </Text>
            The branding kit is to help provide proper guidelines for the usage
            of the iq.wiki brand assests so as not to distort the representation
            of IQ.wiki. <br /> <br /> We are honored to be mentioned in your
            content and would love to hear from you for any kind of partnership.
            <Text
              position="absolute"
              bottom={{ base: '-10%', lg: '-20%', md: '-5%' }}
              right={{ base: '5%', md: '-4%', '2xl': '-5%' }}
              fontSize={{ lg: '100px', base: '50px' }}
              color="brand.600"
            >
              ”
            </Text>
          </Text>
        </Flex>

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading textAlign={{ base: 'center', lg: 'initial' }}>
              IQ LOGO
            </Heading>
            <Text
              fontSize={{ lg: '2xl', base: 'sm' }}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              The logo for the IQ token is based on the brain, the original
              source of knowledge.
            </Text>
          </Flex>
          <Flex mt={10} flexWrap="wrap" gap="2rem">
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
                  isBraindoa
                />
              )
            })}
          </Flex>
        </Box>

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading textAlign={{ base: 'center', lg: 'initial' }}>
              IQ.WIKI LOGO
            </Heading>
            <Text
              fontSize={{ lg: '2xl', base: 'sm' }}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              {`The IQ.wiki logo was inspired from BrainDAO to represent The
              World's Largest Blockchain & Crypto Encyclopedia.`}
            </Text>
          </Flex>
          <Flex mt={10} flexWrap="wrap" gap="2rem">
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

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading textAlign={{ base: 'center', lg: 'initial' }}>
              BRAINDAO
            </Heading>
            <Text
              fontSize={{ lg: '2xl', base: 'sm' }}
              textAlign={{ base: 'center', lg: 'initial' }}
            >
              {`BrainDAO's mission is to build a more intelligent future through
              the IQ token. The logo represents a DAO that is collectively made
              up of all IQ token stakers and governs the token.`}
            </Text>
          </Flex>
          <Flex mt={10} flexWrap="wrap" gap="2rem">
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
                  isBraindoa
                />
              )
            })}
          </Flex>
        </Box>

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading textAlign={{ base: 'center', lg: 'initial' }}>
              BRAINDAO- ALTERNATE LOGO
            </Heading>
          </Flex>
          <Flex mt={10} flexWrap="wrap" gap="2rem">
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

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading fontSize="3xl">Please beware of these things.</Heading>
          </Flex>
          <Flex mt={10}>
            <List display="flex" flexDir="column" gap="10">
              <ListItem>
                <ListIcon as={AiOutlineClose} color="primaryPink" />
                Do not use the IQ.Wiki logo in any way that suggests that we are
                sponsoring, endorsing or affliated to your project in any way.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineClose} color="primaryPink" />
                The IQ wiki brain logo shouldn’t be reperesented with any other
                kind of brain except as stated above.
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
  )
}

export default BrandingPage
