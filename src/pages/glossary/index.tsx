import {
  Heading,
  Stack,
  Input,
  Text,
  Box,
  Flex,
  chakra,
  VStack,
  InputGroup,
  InputLeftElement,
  Button,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import {
  glossaryAlphabetsData,
  commonSearchedWikis,
} from '@/data/GlossaryAlphabetsData'
import { Search2Icon } from '@chakra-ui/icons'
import GlossaryItem from '@/components/Glossary/GlossaryItems'
import { useGetGlossaryTagWikisQuery } from '@/services/glossary'
import { useInView } from 'react-intersection-observer'

const Glossary: NextPage = () => {
  const { ref, entry } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 4000px 0px',
  })
  const { data: GlossaryWikis } = useGetGlossaryTagWikisQuery({
    id: 'Glossary',
    offset: 0,
    limit: 30,
  })

  const [searchText, setSearchText] = useState<string>('')
  const searchPage = (input: string) => {
    const letter =
      input.length > 1
        ? input[0].toLocaleUpperCase()
        : input.toLocaleUpperCase()
    setSearchText(input)
    Scroll.scroller.scrollTo(letter, {
      duration: 70,
      smooth: true,
      offset: -304,
    })
  }

  const [isActive, setIsActive] = useState<number>()
  return (
    <Stack direction="column" w="full" pb="56">
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        w="full"
        px={{ base: 3, lg: 10 }}
        mt={{ base: 4, lg: 0 }}
      >
        <VStack
          w="full"
          alignItems="center"
          textAlign="center"
          spacing={2}
          mb={10}
          mt={5}
        >
          <Heading w="full" fontSize={{ base: '35', sm: '42', lg: '54' }}>
            <chakra.span color="brandLinkColor"> IQ.WIKI</chakra.span> Glossary
          </Heading>
          <Text
            w={{ base: '80%', md: '70%', xl: '90%' }}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          >
            Crypto terminology can be difficult to figure out, especially if
            you&lsquo;re new to the blockchain.{' '}
          </Text>
          <Text
            ref={ref}
            w={{ base: 'full', md: '80%', xl: '90%' }}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            pb={2}
          >
            Here&lsquo;s a guide to help you navigate the exciting frontier of
            Web3.
          </Text>
        </VStack>
      </Flex>
      <VStack
        w="full"
        alignItems="center"
        borderTop="1px"
        mx="auto"
        borderTopColor="carouselArrowBorderColor"
        px={{ base: '9', lg: '30' }}
        zIndex="999"
        top={
          entry?.intersectionRatio !== undefined && !entry?.isIntersecting
            ? '14'
            : '0'
        }
        bg="blogPageBg"
        position={
          entry?.intersectionRatio !== undefined && !entry?.isIntersecting
            ? 'fixed'
            : 'relative'
        }
      >
        <Box mx="auto" w="full" justifyContent="center" alignItems="center">
          <Flex
            py="7"
            w="full"
            justifyContent={{ lg: 'start', '2xl': 'center' }}
            alignItems="center"
            wrap="wrap"
          >
            {glossaryAlphabetsData.map((item, i) => (
              <Box key={i} cursor="pointer">
                <Link
                  activeClass="active"
                  to={item}
                  spy
                  smooth
                  offset={-300}
                  duration={70}
                  // style={{active}}
                >
                  <Text
                    px={{ base: '3', lg: '3', '2xl': '10' }}
                    fontWeight="semibold"
                    fontSize={{ base: 'md', xl: 'lg' }}
                    _hover={{ color: 'brandLinkColor' }}
                  >
                    {item}
                  </Text>
                </Link>
              </Box>
            ))}
          </Flex>
          <Box w="full" px="2" py="3">
            <InputGroup size="lg" w="full">
              <InputLeftElement
                ml={{ base: '15px', xl: 'unset' }}
                pointerEvents="none"
                h="full"
              >
                <Search2Icon
                  color="gray.300"
                  fontSize={{ base: 'sm', lg: 'auto' }}
                  ml={{ base: '-8', md: '0' }}
                />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Search for words"
                onChange={e => searchPage(e.target.value)}
              />
            </InputGroup>
          </Box>
          <Flex
            py="3"
            px={{ lg: '2', '2xl': '10' }}
            w="full"
            wrap="wrap"
            alignItems="center"
            justifyContent={{ lg: 'start', '2xl': 'center' }}
            gap={{ base: '3', lg: '3', '2xl': '10' }}
          >
            {commonSearchedWikis.map((word, i) => (
              <Link
                // activeClass="active"
                to={word}
                spy
                smooth
                offset={-300}
                duration={100}
                key={i}
              >
                <Button
                  px="3"
                  py="1"
                  bg="transparent"
                  color="gray.500"
                  cursor="pointer"
                  borderRadius="full"
                  borderWidth="thin"
                  fontWeight="normal"
                  fontSize={{ base: 'sm', lg: 'md' }}
                  onClick={() => {
                    setIsActive(i)
                  }}
                  isActive={i === isActive}
                  _active={{
                    bgColor: 'brand.50',
                    _dark: { bgColor: '#FFB3D7', color: '#FF409B' },
                    color: '#FE6FB5',
                  }}
                  _focus={{
                    boxShadow: 'none',
                  }}
                  _hover={{
                    bgColor: 'gray.100',
                    _dark: {
                      bgColor: 'whiteAlpha.100',
                    },
                  }}
                  _dark={{
                    color: 'whiteAlpha.900',
                    borderColor: 'whiteAlpha.700',
                  }}
                >
                  {word}
                </Button>
              </Link>
            ))}
          </Flex>
        </Box>
      </VStack>
      <GlossaryItem
        highlightText={searchText}
        wikis={GlossaryWikis ?? []}
        glossaryAlphabets={glossaryAlphabetsData}
      />
    </Stack>
  )
}

export default Glossary
