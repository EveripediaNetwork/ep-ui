import {
  Stack,
  Input,
  Text,
  Box,
  Flex,
  VStack,
  InputGroup,
  InputLeftElement,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  IconButton,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import {
  COMMONLY_SEARCHED_WIKIS,
  glossaryAlphabetsData,
} from '@/data/GlossaryAlphabetsData'
import { Search2Icon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import GlossaryItem from '@/components/Glossary/GlossaryItems'
import { useGetGlossaryTagWikisQuery } from '@/services/glossary'
import { useInView } from 'react-intersection-observer'
import { Wiki } from '@everipedia/iq-utils'
import GlossaryHero from '@/components/Glossary/GlossaryHero'

const GlossaryFilterSection = ({
  searchText,
  searchPage,
  shouldBeFixed,
  setSearchText,
  activeIndex,
  setActiveIndex,
}: {
  searchText: string
  searchPage: (value: string) => void
  shouldBeFixed: boolean
  setSearchText: (value: string) => void
  activeIndex: number | undefined
  setActiveIndex: (value: number) => void
}) => {
  return (
    <>
      <Box w="full" mb={shouldBeFixed ? 5 : 0}>
        <InputGroup size="md" w="full">
          <InputLeftElement
            ml={{ base: '15px', xl: 'unset' }}
            pointerEvents="none"
            h="full"
          >
            <Search2Icon
              color="gray.300"
              fontSize={{ base: 'sm', lg: 'auto' }}
              ml={{ base: '-8', lg: 0 }}
            />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Search for words"
            value={searchText}
            onChange={e => searchPage(e.target.value)}
            _placeholder={{ color: 'placeholderColor' }}
          />
        </InputGroup>
      </Box>
      <Flex
        my="4"
        w="full"
        wrap="wrap"
        alignItems="center"
        justifyContent={{ lg: 'start', '2xl': 'center' }}
        gap={{ base: '3', '2xl': '10' }}
      >
        {COMMONLY_SEARCHED_WIKIS.slice(0, 5)?.map((word, i) => {
          return (
            <Tag
              size="lg"
              key={word}
              bg={i === activeIndex ? 'tagActiveBgColor' : 'transparent'}
              color={i === activeIndex ? 'tagActiveColor' : 'tagColor'}
              cursor="pointer"
              borderRadius="full"
              borderWidth="thin"
              fontWeight="normal"
              fontSize={{ base: 'sm', lg: 'md' }}
              _hover={{
                bgColor: 'tagHoverColor',
              }}
              onClick={() => {
                setActiveIndex(i)
                setSearchText(word)
                searchPage(word)
              }}
            >
              <TagLabel>{word}</TagLabel>
            </Tag>
          )
        })}
      </Flex>
    </>
  )
}

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

  const [searchText, setSearchText] = useState<string>('')

  const shouldBeFixed =
    entry?.intersectionRatio !== undefined && !entry?.isIntersecting

  const heightOfElement = (newEntry?.boundingClientRect.height || 96) + 68
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>()
  const [glossary, setGlossary] = useState<Wiki[]>()
  const [alphabet, setAlphabet] = useState(glossaryAlphabetsData)

  useEffect(() => {
    if (!glossary && GlossaryWikis) {
      setGlossary(GlossaryWikis)
    }
  }, [GlossaryWikis])

  const filterGlossaryAlphabetBySearchResult = (
    searchResult: Wiki[] | undefined,
    searchKeyword: string,
  ) => {
    if (!searchKeyword) return glossaryAlphabetsData
    if (!searchResult) return []
    const filteredAlphabet = glossaryAlphabetsData.filter(currentAlphabet =>
      searchResult.some(result =>
        currentAlphabet === '#'
          ? /^\d/.test(result.title)
          : result.title.charAt(0).toLowerCase() ===
            currentAlphabet.toLowerCase(),
      ),
    )
    return filteredAlphabet
  }

  const filterGlossaryBySearchQuery = (text: string) => {
    const searchResult = GlossaryWikis?.filter(
      wiki =>
        wiki.summary.toLowerCase().includes(text.toLowerCase()) ||
        wiki.title.toLowerCase().includes(text.toLowerCase()),
    )
    const filteredAlphabet = filterGlossaryAlphabetBySearchResult(
      searchResult,
      text,
    )
    setAlphabet(filteredAlphabet)
    setGlossary(searchResult)
  }

  const searchPage = (input: string) => {
    setSearchText(input)
    filterGlossaryBySearchQuery(input)
  }

  return (
    <Stack direction="column" w="full" pb="56">
      <GlossaryHero ref={ref} />
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
              base: 'repeat(9,1fr)',
              md: 'repeat(20,1fr)',
              lg: 'repeat(27,1fr)',
            }}
            gap={3}
            py="4"
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
          {!shouldBeFixed ? (
            <>
              <GlossaryFilterSection
                setSearchText={text => setSearchText(text)}
                shouldBeFixed={shouldBeFixed}
                searchText={searchText}
                searchPage={(text: string) => searchPage(text)}
                activeIndex={activeIndex}
                setActiveIndex={(index: number) => setActiveIndex(index)}
              />
            </>
          ) : (
            <>
              {isVisible && (
                <GlossaryFilterSection
                  setSearchText={text => setSearchText(text)}
                  shouldBeFixed={shouldBeFixed}
                  searchText={searchText}
                  searchPage={(text: string) => searchPage(text)}
                  activeIndex={activeIndex}
                  setActiveIndex={(index: number) => setActiveIndex(index)}
                />
              )}
              <IconButton
                width="full"
                icon={
                  isVisible ? (
                    <ChevronUpIcon
                      fontSize="28px"
                      color="linkColor"
                      opacity="0.5"
                    />
                  ) : (
                    <ChevronDownIcon
                      fontSize="28px"
                      color="linkColor"
                      opacity="0.5"
                    />
                  )
                }
                aria-label="Toggle Text"
                onClick={() => setIsVisible(!isVisible)}
                size="xs"
                isRound
                backgroundColor="transparent"
                _hover={{ backgroundColor: '#00000010' }}
                _focus={{ backgroundColor: '#00000010' }}
                _active={{ backgroundColor: '#00000010' }}
              />
            </>
          )}
        </Box>
      </VStack>
      <GlossaryItem
        highlightText={searchText}
        glossary={glossary ?? []}
        glossaryAlphabets={alphabet}
      />
    </Stack>
  )
}

export default Glossary
