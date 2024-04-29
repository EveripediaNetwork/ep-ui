import { Stack, Box, VStack } from '@chakra-ui/react'
import { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import { glossaryAlphabetsData } from '@/data/GlossaryAlphabetsData'
import GlossaryItem from '@/components/Glossary/GlossaryItems'
import { useGetGlossaryTagWikisQuery } from '@/services/glossary'
import { useInView } from 'react-intersection-observer'
import { Wiki } from '@everipedia/iq-utils'
import GlossaryHero from '@/components/Glossary/GlossaryHero'
import GlossaryIconButton from '@/components/Glossary/GlossaryIconButton'
import GlossaryFilterSection from '@/components/Glossary/GlossaryFilterSection'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import GlossaryAlphabetSection from '@/components/Glossary/GlossaryAlphabetSection'
interface GlossaryData {
  offset: number
  wikis: Wiki[]
}
const Glossary: NextPage = () => {
  const [glossaryData, setGlossaryData] = useState<GlossaryData>({
    offset: 0,
    wikis: [],
  })
  const { ref, entry } = useInView({
    threshold: 0,
  })
  const { ref: newRef, entry: newEntry } = useInView({
    threshold: 0,
  })
  const { data: fetchedGlossaryWikis } = useGetGlossaryTagWikisQuery({
    id: 'Glossary',
    offset: glossaryData.offset,
    limit: 50,
  })

  if (fetchedGlossaryWikis && fetchedGlossaryWikis?.length > 0) {
    setGlossaryData({
      offset: glossaryData.offset + 50,
      wikis: [...glossaryData.wikis, ...fetchedGlossaryWikis],
    })
  }

  const [searchText, setSearchText] = useState<string>('')

  const shouldBeFixed =
    entry?.intersectionRatio !== undefined && !entry?.isIntersecting

  const heightOfElement = (newEntry?.boundingClientRect.height || 390) + 68
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>()
  const [queryResult, setQueryResult] = useState<Wiki[]>()
  const [alphabet, setAlphabet] = useState(glossaryAlphabetsData)

  const filterGlossaryAlphabetBySearchResult = (
    searchResult: Wiki[] | undefined,
    searchKeyword: string,
  ) => {
    if (!searchKeyword) return glossaryAlphabetsData
    if (!searchResult) return []
    const filteredAlphabet = glossaryAlphabetsData.filter((currentAlphabet) =>
      searchResult.some((result) =>
        currentAlphabet === '#'
          ? /^\d/.test(result.title)
          : result.title.charAt(0).toLowerCase() ===
            currentAlphabet.toLowerCase(),
      ),
    )
    return filteredAlphabet
  }

  const filterGlossaryBySearchQuery = (text: string) => {
    const searchResult = glossaryData?.wikis?.filter(
      (wiki) =>
        wiki.summary.toLowerCase().includes(text.toLowerCase()) ||
        wiki.title.toLowerCase().includes(text.toLowerCase()),
    )
    const filteredAlphabet = filterGlossaryAlphabetBySearchResult(
      searchResult,
      text,
    )
    setAlphabet(filteredAlphabet)
    setQueryResult(searchResult)
  }

  const searchPage = (input: string) => {
    setSearchText(input)
    filterGlossaryBySearchQuery(input)
  }

  return (
    <Stack
      direction="column"
      pb={{ base: '32', lg: '56' }}
      w="min(90%, 1100px)"
      mx="auto"
    >
      <GlossaryHero ref={ref} />
      <VStack w="full" ref={newRef} alignItems="center" mx="auto">
        <Box
          mx="auto"
          display="flex"
          flexDirection="column"
          w="full"
          justifyContent="center"
          top={shouldBeFixed ? '70px' : '0'}
          position={shouldBeFixed ? 'fixed' : 'relative'}
          zIndex="sticky"
        >
          <Box
            backgroundColor={shouldBeFixed ? '#F9FAFB' : ''}
            _dark={{
              bg: `${shouldBeFixed ? 'gray.800' : ''} `,
            }}
            display={{ base: shouldBeFixed ? 'none' : 'block', md: 'block' }}
          >
            <GlossaryAlphabetSection
              shouldBeFixed={shouldBeFixed}
              heightOfElement={heightOfElement}
            />
          </Box>
          {!shouldBeFixed ? (
            <GlossaryFilterSection
              setSearchText={setSearchText}
              shouldBeFixed={shouldBeFixed}
              searchText={searchText}
              searchPage={searchPage}
              activeIndex={searchText === '' ? undefined : activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ) : (
            <>
              {isVisible && (
                <>
                  <Box
                    backgroundColor={shouldBeFixed ? '#F9FAFB' : ''}
                    _dark={{
                      bg: `${shouldBeFixed ? 'gray.800' : ''} `,
                    }}
                    display={{ base: 'block', md: 'none' }}
                  >
                    <GlossaryAlphabetSection
                      shouldBeFixed={shouldBeFixed}
                      heightOfElement={heightOfElement}
                    />
                  </Box>
                  <GlossaryFilterSection
                    setSearchText={setSearchText}
                    shouldBeFixed={shouldBeFixed}
                    searchText={searchText}
                    searchPage={searchPage}
                    activeIndex={searchText === '' ? undefined : activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                </>
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
        glossary={queryResult ?? glossaryData?.wikis ?? []}
        glossaryAlphabets={alphabet}
      />
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'faq',
        'common',
        'glossary',
      ])),
    },
  }
}

export default Glossary
