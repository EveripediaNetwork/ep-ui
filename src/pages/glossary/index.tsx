import { Stack, Box, VStack, Grid } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { glossaryAlphabetsData } from '@/data/GlossaryAlphabetsData'
import GlossaryItem from '@/components/Glossary/GlossaryItems'
import { useGetGlossaryTagWikisQuery } from '@/services/glossary'
import { useInView } from 'react-intersection-observer'
import { Wiki } from '@everipedia/iq-utils'
import GlossaryHero from '@/components/Glossary/GlossaryHero'
import GlossaryAlphabets from '@/components/Glossary/GlossaryAlphabets'
import GlossaryIconButton from '@/components/Glossary/GlossaryIconButton'
import GlossaryFilterSection from '@/components/Glossary/GlossaryFilterSection'

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
              <GlossaryAlphabets
                key={i}
                item={item}
                heightOfElement={heightOfElement}
                shouldBeFixed={shouldBeFixed}
              />
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
              <GlossaryIconButton
                isVisible={isVisible}
                setIsVisible={setIsVisible}
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
