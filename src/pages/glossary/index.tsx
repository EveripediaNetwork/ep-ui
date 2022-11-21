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
  COMMONLY_SEARCHED_WIKIS,
  glossaryAlphabetsData,
} from '@/data/GlossaryAlphabetsData'
import { Search2Icon } from '@chakra-ui/icons'
import GlossaryItem from '@/components/Glossary/GlossaryItems'
import {
  useGetGlossaryTagWikisQuery,
  // useGetTagsQuery,
} from '@/services/glossary'
import { useInView } from 'react-intersection-observer'

// const CONVERTED_CURRENT_DATE = Math.floor(Date.now() / 1000)

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

  // To be Switched to API when its ready

  // const { data: popularTags } = useGetTagsQuery({
  //   startDate: CONVERTED_CURRENT_DATE - 60 * 60 * 24 * 30,
  //   endDate: CONVERTED_CURRENT_DATE,
  // })

  // const glossaryTags = popularTags?.filter(item => item.id === 'Glossary')

  const [searchText, setSearchText] = useState<string>('')

  const shouldBeFixed =
    entry?.intersectionRatio !== undefined && !entry?.isIntersecting

  const heightOfElement = (newEntry?.boundingClientRect.height || 96) + 68
  const [activeIndex, setActiveIndex] = useState<number>()

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
        px={{ base: 3, lg: 10 }}
      >
        <VStack
          w="full"
          alignItems="center"
          textAlign="center"
          spacing={3}
          my={14}
        >
          <Heading w="full" fontSize={{ base: '32', md: '42', lg: '4xl' }}>
            <chakra.span color="brandLinkColor"> IQ.WIKI</chakra.span> Glossary
          </Heading>
          <Text
            w={{ base: '90%', md: '80%', xl: '90%' }}
            fontSize={{ base: 'sm', md: 'lg', lg: 'xl' }}
            ref={ref}
          >
            Crypto terminology can be difficult to figure out, especially if
            you&lsquo;re new to the blockchain. <br />
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
        px={{ base: '9', lg: '32' }}
        top={shouldBeFixed ? '14' : '0'}
        bg="blogPageBg"
        position={shouldBeFixed ? 'fixed' : 'relative'}
        zIndex="sticky"
      >
        <Box mx="auto" w="full" justifyContent="center" alignItems="center">
          <Grid
            templateColumns={{
              base: 'repeat(14,1fr)',
              md: 'repeat(20,1fr)',
              lg: 'repeat(27,1fr)',
            }}
            gap={3}
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
          <Box w="full">
            <InputGroup size="md" w="full">
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
            my="8"
            w="full"
            wrap="wrap"
            alignItems="center"
            justifyContent={{ lg: 'start', '2xl': 'center' }}
            gap={{ base: '5', lg: '3', '2xl': '10' }}
          >
            {COMMONLY_SEARCHED_WIKIS.slice(0, 5)?.map((word, i) => {
              return (
                <>
                  <Button
                    style={{
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                    key={i}
                    px="3"
                    py="1"
                    bg="transparent"
                    color="tagColor"
                    cursor="pointer"
                    borderRadius="full"
                    borderWidth="thin"
                    fontWeight="normal"
                    fontSize={{ base: 'sm', lg: 'md' }}
                    onClick={() => {
                      setActiveIndex(i)
                      setSearchText(word)
                      searchPage(word)
                    }}
                    isActive={i === activeIndex}
                    _focus={{
                      boxShadow: 'none',
                    }}
                    _hover={{
                      bgColor: 'tagHoverColor',
                    }}
                    _dark={{
                      borderColor: 'whiteAlpha.700',
                    }}
                    _active={{
                      bgColor: 'tagActiveBgColor',
                      color: 'tagActiveColor',
                      borderStyle: 'none',
                    }}
                  >
                    {word}
                  </Button>
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
