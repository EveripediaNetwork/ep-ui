import { Stack, Box, VStack, Grid } from '@chakra-ui/react'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import { glossaryAlphabetsData } from '@/data/GlossaryAlphabetsData'
import GlossaryItem from '@/components/Glossary/GlossaryItems'
import { useGetGlossaryTagWikisQuery } from '@/services/glossary'
import { useInView } from 'react-intersection-observer'
import { Wiki } from '@everipedia/iq-utils'
import GlossaryHero from '@/components/Glossary/GlossaryHero'
import GlossaryAlphabets from '@/components/Glossary/GlossaryAlphabets'
import GlossaryIconButton from '@/components/Glossary/GlossaryIconButton'
import GlossaryFilterSection from '@/components/Glossary/GlossaryFilterSection'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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

  const heightOfElement = (newEntry?.boundingClientRect.height || 96) + 68
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
        currentAlphabet.id === '#'
          ? /^\d/.test(result.title)
          : result.title.charAt(0).toLowerCase() ===
            currentAlphabet.id.toLowerCase(),
      ),
    )
    //log
    // console.log('filteredAlphabet filtGlosfn', filteredAlphabet)
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
    //log
    // console.log('searchResult filtAlphafn', searchResult)
    // console.log('filteredAlphabet filtAlphafn', filteredAlphabet)
    setAlphabet(filteredAlphabet)
    setQueryResult(searchResult)
  }

  const searchPage = (input: string) => {
    //log
    // console.log('input searchPagefn', input)
    setSearchText(input)
    filterGlossaryBySearchQuery(input)
  }
  const { t } = useTranslation('glossary')

  return (
    <Stack direction="column" w="full" pb="56">
      <GlossaryHero ref={ref} t={t} />
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
                item={item.label}
                heightOfElement={heightOfElement}
                shouldBeFixed={shouldBeFixed}
                t={t}
              />
            ))}
          </Grid>
          {!shouldBeFixed ? (
            <GlossaryFilterSection
              setSearchText={setSearchText}
              shouldBeFixed={shouldBeFixed}
              searchText={searchText}
              searchPage={searchPage}
              activeIndex={searchText === '' ? undefined : activeIndex}
              setActiveIndex={setActiveIndex}
              t={t}
            />
          ) : (
            <>
              {isVisible && (
                <GlossaryFilterSection
                  setSearchText={setSearchText}
                  shouldBeFixed={shouldBeFixed}
                  searchText={searchText}
                  searchPage={searchPage}
                  activeIndex={searchText === '' ? undefined : activeIndex}
                  setActiveIndex={setActiveIndex}
                  t={t}
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
        glossary={queryResult ?? glossaryData?.wikis ?? []}
        glossaryAlphabets={alphabet}
        t={t}
      />
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...await serverSideTranslations(locale ?? 'en', ['glossary'])
    },
  }
}

export default Glossary
