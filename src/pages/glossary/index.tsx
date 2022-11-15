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
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { Link } from 'react-scroll'
import * as Scroll from 'react-scroll'
import {
  glossaryAlphabetsData,
  commonSearchedWikis,
} from '@/data/GlossaryAlphabetsData'
import { Search2Icon } from '@chakra-ui/icons'
import GlossaryItem from '@/components/Glossary/GlossaryItems'
import {
  useGetGlossaryTagWikisQuery,
  useGetTagsQuery,
} from '@/services/glossary'
import { useInView } from 'react-intersection-observer'

const Glossary: NextPage = () => {
  const { ref, entry } = useInView({
    threshold: 0,
  })
  const { ref: newRef, entry: newEntry } = useInView({
    threshold: 0,
  })
  const { data: GlossaryWikis } = useGetGlossaryTagWikisQuery({
    id: 'Glossary',
    offset: 0,
    limit: 50,
  })

  const { data: popularTags } = useGetTagsQuery({
    startDate: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30,
    endDate: Math.floor(Date.now() / 1000),
  })
  let glossaryTgas = popularTags?.filter(item => item.id === 'Glossary')
  const [searchText, setSearchText] = useState<string>('')

  const shouldBeFixed =
    entry?.intersectionRatio !== undefined && !entry?.isIntersecting

  const heightOfElement = (newEntry?.boundingClientRect.height || 96) + 68
  const [isActive, setIsActive] = useState<number>()
  const searchPage = (input: string) => {
    const letter =
      input.length > 1
        ? input[0].toLocaleUpperCase()
        : input.toLocaleUpperCase()
    setSearchText(input)
    Scroll.scroller.scrollTo(letter, {
      duration: 70,
      smooth: true,
      offset: shouldBeFixed
        ? -(heightOfElement || 284)
        : -(heightOfElement ? heightOfElement + 228 : 512),
    })
  }
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
        ref={newRef}
        alignItems="center"
        borderTop="1px"
        mx="auto"
        borderTopColor="carouselArrowBorderColor"
        px={{ base: '9', lg: '30' }}
        zIndex="999"
        top={shouldBeFixed ? '14' : '0'}
        bg="blogPageBg"
        position={shouldBeFixed ? 'fixed' : 'relative'}
      >
        <Box mx="auto" w="full" justifyContent="center" alignItems="center">
          <Grid
            templateColumns={{ base: 'repeat(14,1fr)', lg: 'repeat(27,1fr)' }}
            gap={1}
            py="7"
          >
            {glossaryAlphabetsData.map((item, i) => (
              <GridItem w="100%" key={i} cursor="pointer" textAlign="center">
                <Link
                  activeClass="active"
                  to={item}
                  spy
                  smooth
                  offset={
                    shouldBeFixed
                      ? -(heightOfElement || 284)
                      : -(heightOfElement ? heightOfElement + 228 : 512)
                  }
                  duration={70}
                >
                  <Text
                    fontWeight="semibold"
                    fontSize={{ base: 'md', xl: 'lg' }}
                    _hover={{ color: 'brandLinkColor' }}
                  >
                    {item}
                  </Text>
                </Link>
              </GridItem>
            ))}
          </Grid>
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
                value={searchText}
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
            {glossaryTgas &&
              glossaryTgas[0].wikis.map((word, i) => {
                return (
                  <>
                    {i < 5 && (
                      <Button
                        key={i}
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
                          setSearchText(word.title)
                          searchPage(word.title)
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
                        {word.title}
                      </Button>
                    )}
                  </>
                )
              })}
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
