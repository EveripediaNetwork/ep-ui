import { BrandingAssets } from '@/components/Branding/BrandingAssets'
import {
  Box,
  Flex,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Image } from '../../components/Elements/Image/Image'

const BrandingPage = () => {
  const IQLogoAsset = [
    '/branding/iqoriginal.png',
    '/branding/iqwhite.png',
    '/branding/iqblue.png',
    '/branding/iqpurple.png',
    '/branding/iqdeepblack.png',
    '/branding/iqnegativepink.png',
    '/branding/iqpink.png',
    '/branding/iqnegativewhite.png',
    '/branding/iqblack.png',
    '/branding/iqred.png',
    '/branding/iqgreen.png',
    '/branding/iqorange.png',
  ]
  const alternateTextAssets = [
    '/branding/brainpink.png',
    '/branding/brainwhite.png',
    '/branding/brainDark.png',
  ]
  const alternateLogoAssets = [
    '/branding/braindaoBlackNegative.png',
    '/branding/braindaowhiteNegative.png',
    '/branding/originalBraindao.png',
  ]
  return (
    <Box bg="#E2E8F0" _dark={{ backgroundColor: '#1A202C' }} pb={20}>
      <Box maxW={{ base: '100%', xl: '90%', '2xl': '1280px' }} mx="auto">
        <Flex alignItems="center">
          <Box w="60%">
            <Heading color="brand.500" fontSize="6xl">
              IQ.WIKI Branding kit
            </Heading>
            <Text w="60%" fontSize="2xl">
              Get easy acess to our brand toolkits and assests for easy usage
              across your site and other marketing purposes.
            </Text>
          </Box>
          <Image
            objectFit="contain"
            imgH={{ base: '400px', lg: '500px' }}
            imgW={{ base: '400px', lg: '500px' }}
            src="/brandingBrain.png"
            alt="Bringing knowledge to the blockchain."
            priority
          />
        </Flex>

        <Flex mt="25" mx="auto" justifyContent="center">
          <Text
            position="relative"
            w="60%"
            fontSize="2xl"
            textAlign="center"
            lineHeight="1.5"
          >
            <Text
              position="absolute"
              top="-20%"
              left="-5%"
              fontSize="100px"
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
              bottom="-20%"
              right="-5%"
              fontSize="100px"
              color="brand.600"
            >
              ”
            </Text>
          </Text>
        </Flex>

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading fontSize="5xl">IQ.WIKI LOGO</Heading>
            <Text fontSize="2xl">
              The IQ.Wiki logo was inspired from BrainDAO, a web 3.0 DAO powered
              by the IQ token dedicated to bridging the real-world and the
              metaverse by funding all forms of knowledge on the blockchain.
              Representing IQ and BrainDAO is a logo presented like a brain the
              housepower of all knowledge.
            </Text>
          </Flex>
          <Flex mt={10} flexWrap="wrap" gap="2rem">
            {IQLogoAsset.map((item, index) => {
              return <BrandingAssets key={index} url={item} />
            })}
          </Flex>
        </Box>

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading fontSize="5xl">ALTERNATE LOGO</Heading>
          </Flex>
          <Flex mt={10} flexWrap="wrap" gap="2rem">
            {alternateLogoAssets.map((item, index) => {
              return <BrandingAssets key={index} url={item} />
            })}
          </Flex>
        </Box>

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading fontSize="5xl">ALTERNATE TEXT</Heading>
          </Flex>
          <Flex mt={10} flexWrap="wrap" gap="2rem">
            {alternateTextAssets.map((item, index) => {
              return <BrandingAssets key={index} url={item} />
            })}
          </Flex>
        </Box>

        <Box mt={20}>
          <Flex flexDir="column" gap={5}>
            <Heading fontSize="3xl">Please beware of these things.</Heading>
          </Flex>
          <Flex mt={10}>
            <List spacing={3} display="flex" flexDir="column" gap="16">
              <ListItem>
                <ListIcon as={AiOutlineClose} color="#E53E3E" />
                Do not use the IQ.Wiki logo in any way that suggests that we are
                sponsoring, endorsing or affliated to your project in any way.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineClose} color="#E53E3E" />
                The IQ wiki brain logo shouldn’t be reperesented with any other
                kind of brain except as stated above.
              </ListItem>
              <ListItem>
                <ListIcon as={AiOutlineClose} color="#E53E3E" />
                Do not in any way stretch or manipulate the logo.
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={AiOutlineClose} color="#E53E3E" />
                Do not in any way stretch or manipulate the logo.
              </ListItem>
            </List>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default BrandingPage
