import {
  useGetAllCreatedWikiCountQuery,
  useGetSearchedWikisByTitleQuery,
  useGetAllHiddenWikiCountQuery,
  useGetAllPromotedWikiCountQuery,
} from '@/services/admin'
import { Text, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { BiSortDown, BiSortUp } from 'react-icons/bi'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { CreatedWikisCount } from '@/types/admin'
import { InsightTableWikiCreated } from './InsightTableCreatedWiki'
import { WikiCreatedFooter } from './WikiElemets'
import { WikiCreatedActionBar } from './WikiCreatedActionBar'

export const WikiInsightTable = () => {
  const insightTableRef = useRef<null | HTMLDivElement>(null)
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const [initGetHiddenWikis, setInitGetHiddenWikis] = useState<boolean>(true)
  const [initGetPromotedWikis, setInitGetPromotedWikis] =
    useState<boolean>(true)
  const [initGetSearchedWikis, setInitGetSearchedWikis] =
    useState<boolean>(true)
  const [toggler, setToggler] = useState<boolean>(false)
  const [sortTableBy, setSortTableBy] = useState<string>('default')
  const [wikis, setWikis] = useState<CreatedWikisCount[]>()
  const [searchKeyWord, setsearchKeyWord] = useState<string>('')
  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
  const [filterItems, setFilterItems] = useState<Array<[] | unknown>>()
  const [checked, setChecked] = useState(0)

  const { isOpen, onToggle, onClose } = useDisclosure()

  const { data: wiki, refetch } = useGetAllCreatedWikiCountQuery(paginateOffset)
  const { data: hidden } = useGetAllHiddenWikiCountQuery(paginateOffset, {
    skip: initGetHiddenWikis,
    refetchOnMountOrArgChange: true,
  })
  const { data: SearchedWikis } = useGetSearchedWikisByTitleQuery(
    searchKeyWord,
    {
      skip: initGetSearchedWikis,
      refetchOnMountOrArgChange: true,
    },
  )
  const { data: promotedWikis } = useGetAllPromotedWikiCountQuery(
    paginateOffset,
    {
      skip: initGetPromotedWikis,
      refetchOnMountOrArgChange: true,
    },
  )

  const sortIcon = useMemo(() => {
    if (sortTableBy === 'default') {
      return <RiArrowUpDownLine fontSize="1.3rem" />
    }
    if (sortTableBy === 'Newest' || sortTableBy === 'AlpaUp') {
      return <BiSortUp fontSize="1.3rem" />
    }
    if (sortTableBy === 'Oldest' || sortTableBy === 'AlpaDown') {
      return <BiSortDown fontSize="1.3rem" />
    }
    return <RiArrowUpDownLine fontSize="1.3rem" />
  }, [sortTableBy])

  enum FilterTypes {
    promoted = 'promoted',
    archived = 'archived',
    normal = 'normal',
  }

  const handleSortChange = (value: number) => {
    if (value === 1) {
      setSortTableBy('Newest')
    } else if (value === 2) {
      setSortTableBy('Oldest')
    } else if (value === 3) {
      setSortTableBy('AlpaUp')
    } else if (value === 4) {
      setSortTableBy('AlpaDown')
    } else {
      setSortTableBy('default')
    }
  }

  const newWikis = useMemo(() => {
    let filteredWikis = wiki
    if (filterItems?.includes(FilterTypes.promoted)) {
      setInitGetPromotedWikis(false)
      filteredWikis = promotedWikis
      return filteredWikis
    }
    if (filterItems?.includes(FilterTypes.archived)) {
      setInitGetHiddenWikis(false)
      filteredWikis = hidden
      return filteredWikis
    }
    if (filterItems?.includes(FilterTypes.normal)) {
      filteredWikis = wiki
    }
    return filteredWikis
  }, [
    wiki,
    filterItems,
    promotedWikis,
    hidden,
    FilterTypes.archived,
    FilterTypes.promoted,
    FilterTypes.normal,
  ])

  const sortWikisByDate = (
    items: CreatedWikisCount[] | undefined,
    highestFirst: boolean,
  ) => {
    items?.sort((a, b) => {
      const dateA = new Date(a.created ? a.created : '').valueOf()
      const dateB = new Date(b.created ? b.created : '').valueOf()
      const comparison = dateA - dateB
      return highestFirst ? -comparison : comparison
    })
  }

  const WikisSortByHighest =
    searchKeyWord.length > 2 ? SearchedWikis?.slice() : newWikis?.slice()
  sortWikisByDate(WikisSortByHighest, true)

  const WikisSortByLowest =
    searchKeyWord.length > 2 ? SearchedWikis?.slice() : newWikis?.slice()
  sortWikisByDate(WikisSortByLowest, false)

  const WikisSortByAlpaUp =
    searchKeyWord.length > 2 ? SearchedWikis?.slice() : newWikis?.slice()
  WikisSortByAlpaUp?.sort((a, b) => {
    const Data = a.title.trim().localeCompare(b.title.trim())
    return Data
  })

  const WikisSortByAlpaDown =
    searchKeyWord.length > 2 ? SearchedWikis?.slice() : newWikis?.slice()
  WikisSortByAlpaDown?.sort((a, b) => {
    const Data = b.title.trim().localeCompare(a.title.trim())
    return Data
  })

  const wikiSorted = useMemo(() => {
    if (sortTableBy === 'Newest') {
      return WikisSortByHighest
    }
    if (sortTableBy === 'Oldest') {
      return WikisSortByLowest
    }
    if (sortTableBy === 'AlpaUp') {
      return WikisSortByAlpaUp
    }
    if (sortTableBy === 'AlpaDown') {
      return WikisSortByAlpaDown
    }
    return searchKeyWord.length > 2 ? SearchedWikis : newWikis
  }, [newWikis, sortTableBy, searchKeyWord, SearchedWikis])

  const whichWiki = useCallback(() => {
    if (searchKeyWord.length < 2) {
      setInitGetSearchedWikis(true)
      setWikis(wikiSorted)
    } else if (searchKeyWord.length > 2) {
      setInitGetSearchedWikis(false)
      setWikis(wikiSorted)
    }
  }, [SearchedWikis, searchKeyWord.length, wikiSorted])

  const scrolltoTableTop = () => {
    insightTableRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const nextButtonIsValid = () => {
    if (
      filterItems?.includes(FilterTypes.promoted) ||
      searchKeyWord.length > 2
    ) {
      return true
    } else {
      return !wiki || wiki.length < 10
    }
  }

  useEffect(() => {
    whichWiki()
    refetch()
    nextButtonIsValid()
  }, [
    wiki,
    refetch,
    whichWiki,
    filterItems,
    sortTableBy,
    searchKeyWord,
    initGetSearchedWikis,
    SearchedWikis,
    promotedWikis,
    hidden,
    initGetPromotedWikis,
    initGetHiddenWikis,
    toggler,
  ])

  return (
    <Flex
      flexDir="column"
      pb={5}
      w="100%"
      my={3}
      borderWidth="1px"
      borderRadius="sm"
      rounded="lg"
      ref={insightTableRef}
    >
      <WikiCreatedActionBar
        setsearchKeyWord={setsearchKeyWord}
        sortIcon={sortIcon}
        isOpen={isOpen}
        onClose={onClose}
        onToggle={onToggle}
        handleSortChange={handleSortChange}
        checked={checked}
        setChecked={setChecked}
        setPaginateOffset={setChecked}
        setFilterItems={setFilterItems}
      />
      <Flex pb={5}>
        {wikis?.length && wikis.length > 0 ? (
          <InsightTableWikiCreated
            wikiCreatedInsightData={wikis || []}
            hideWikisFunc={() => setToggler(!toggler)}
          />
        ) : (
          <Text pt="2" textAlign="center" w="full">
            No data to display 🐌
          </Text>
        )}
      </Flex>
      <WikiCreatedFooter
        setPaginateOffset={setPaginateOffset}
        activatePrevious={activatePrevious}
        scrolltoTableTop={scrolltoTableTop}
        paginateOffset={paginateOffset}
        setActivatePrevious={setActivatePrevious}
        wikis={wikis}
        nextBtnDisabled={nextButtonIsValid()}
      />
    </Flex>
  )
}
