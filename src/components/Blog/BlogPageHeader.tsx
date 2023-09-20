import React from 'react'
import { Flex, Heading, Link, Text, Image } from '@chakra-ui/react'

const BlogPageHeader = () => {
  return (
    <Flex
      pt={{ base: 8, md: 14, lg: 24 }}
      pb={{ base: 28, md: 32, lg: 48 }}
      w={{ lg: '80%', md: '80%', base: '95%', '2xl': '80%' }}
      mx="auto"
      flexDir="column"
      alignItems="center"
    >
      <Text
        fontSize={{ xl: 'md', base: 'sm' }}
        textAlign="center"
        color={'brand.500'}
      >
        Blog
      </Text>
      <Heading
        fontSize={{ md: '4xl', base: '2xl', xl: '5xl' }}
        mb={{ base: 4 }}
        fontWeight={'600'}
        color={'gray.800'}
      >
        The IQ.wiki Blog
      </Heading>
      <Text
        fontSize={{ xl: 'lg', base: 'md' }}
        textAlign="center"
        maxW={'743px'}
        color={'gray.600'}
      >
        Bringing you all the latest from IQ.wiki, IQ token and BrainDAO.
      </Text>
      <Flex
        justifyContent={['center', 'space-between']}
        my={4}
        minWidth={100}
        gap={4}
        alignItems={'center'}
      >
        <Text fontSize={{ xl: 'lg', base: 'md' }} color={'gray.600'}>
          Our blog in KR and CHN:
        </Text>
        <Flex alignItems="center">
          <Link
            href="https://mirror.xyz/0x3c1ccc207b3796D907B0024eD79fa2A11Af8D912"
            target="_blank"
          >
            <Image src="/images/logos/kr.svg" width={{ base: 6, lg: 10 }} />
          </Link>
          <Link
            href="https://mirror.xyz/0xcd5Cc4F54C20C80aED2db81CBaf82153Fb95C1b1"
            target="_blank"
            ml={5}
          >
            <Image src="/images/logos/cn.svg" width={{ base: 6, lg: 10 }} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default BlogPageHeader
