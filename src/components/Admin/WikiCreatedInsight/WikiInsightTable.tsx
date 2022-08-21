import { useGetAllCreatedWikiCountQuery } from '@/services/admin'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState, useMemo } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { BiSortDown, BiSort, BiSortUp } from 'react-icons/bi'
import { InsightTableWikiCreated } from './InsightTableCreatedWiki'

export const WikiInsightTable = () => {
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const [sortTableBy, setSortTableBy] = useState<string>('default')
  const { data: wiki } = useGetAllCreatedWikiCountQuery(paginateOffset)
  const [wikis, setWikis] = useState<Array<[] | any>>()
  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)

  const increasePagination = () => {
    return wiki && wiki?.length >= 10 && setPaginateOffset(paginateOffset + 10)
  }

  const decreasePagination = () => {
    return wiki && wiki?.length >= 10 && setPaginateOffset(paginateOffset - 10)
  }

  const getDateVal = (val: string | number | Date) => {
    const result = new Date(val).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
    return result
  }
  // sorting creted wikis by date
  const WikisSortByHighest = wiki?.slice()
  WikisSortByHighest?.sort((a, b) => {
    const DataA = getDateVal(b.created ? b.created : '')
    const DataB = getDateVal(a.created ? a.created : '')
    let Data = new Date(DataA).valueOf() - new Date(DataB).valueOf()
    if (Data === 0) Data = b.title.trim().localeCompare(a.title.trim())
    return Data
  })

  const WikisSortByLowest = wiki?.slice()
  WikisSortByLowest?.sort((a, b) => {
    const DataA = getDateVal(b.created ? b.created : '')
    const DataB = getDateVal(a.created ? a.created : '')
    let Data = new Date(DataB).valueOf() - new Date(DataA).valueOf()
    if (Data === 0) Data = a.title.trim().localeCompare(b.title.trim())
    return Data
  })

  const sortIcon = useMemo(() => {
    if (sortTableBy === 'default') {
      return <BiSort fontSize="1.3rem" />
    }
    if (sortTableBy === 'ascending') {
      return <BiSortUp fontSize="1.3rem" />
    }
    if (sortTableBy === 'descending') {
      return <BiSortDown fontSize="1.3rem" />
    }
    return <BiSort fontSize="1.3rem" />
  }, [wiki, sortTableBy])

  const wikiSorted = useMemo(() => {
    if (sortTableBy === 'default') {
      return wiki
    }
    if (sortTableBy === 'ascending') {
      return WikisSortByHighest
    }
    if (sortTableBy === 'descending') {
      return WikisSortByLowest
    }
    return wiki
  }, [wiki, sortTableBy])

  const handleSortChange = () => {
    if (sortTableBy === 'default') {
      setSortTableBy('descending')
    } else if (sortTableBy === 'descending') {
      setSortTableBy('ascending')
    } else if (sortTableBy === 'ascending') {
      setSortTableBy('descending')
    }
  }

  const FilterArray = [
    { id: 1, value: 'Promoted' },
    { id: 2, value: 'Archived' },
    { id: 3, value: 'Sponsored' },
    { id: 4, value: 'Normal' },
  ]

  // const handleFilter = useMemo((id: number) => {
  //   if (id == 1) {
  //     wikiSorted
  //       ?.filter(item => {
  //         return item?.promoted
  //       })
  //   }
  //   if (id == 2 ) {
  //     wikiSorted
  //       ?.filter(item => {
  //         return item?.hidden
  //       })
  //   }
  //   if (id == 3 ) {
  //     // wikiSorted
  //     //   ?.filter(item => {
  //         return wikiSorted
  //       // })
  //   }

  //   return wikiSorted
  // }, [wikiSorted] )

  useEffect(() => {
    setWikis(wikiSorted)
  }, [wiki, sortTableBy])

  return (
    <Flex
      flexDir="column"
      pb={5}
      w="100%"
      my={3}
      borderWidth="1px"
      borderRadius="sm"
      rounded="lg"
    >
      <Flex
        borderBottomWidth="1px"
        w="100%"
        p={5}
        gap={2}
        justifyContent="flex-start"
        flexDir="column"
      >
        <Text fontSize="lg" fontWeight="semibold">
          Created Wikis
        </Text>
        <Text fontSize="sm" fontWeight="thin">
          List of created wikis in order of creation from the most recently
          created.
        </Text>
      </Flex>

      <Flex justifyContent="flex-end" p={5}>
        <Flex gap={5}>
          <InputGroup w="100%">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="#667085" />
            </InputLeftElement>
            <Input type="tel" placeholder="Search" />
          </InputGroup>
          <Button
            onClick={() => {
              handleSortChange()
            }}
            borderColor="#E2E8F0"
            _dark={{ borderColor: '#2c323d' }}
            py={2}
            px={10}
            leftIcon={sortIcon}
            variant="outline"
            fontWeight="light"
          >
            Sort
          </Button>
          <Select
            cursor="pointer"
            w="50%"
            // onChange={e => {
              // handleFilter(e.target.value)
            // }}
            placeholder="Filter"
            icon={<MdFilterList />}
          >
            {FilterArray.map(o => (
              <option key={o.id} value={o.id}>
                {o.value}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Flex pb={5}>
        <InsightTableWikiCreated wikiCreatedInsightData={wikis || []} />
      </Flex>
      <Flex justify="space-between" w="95%" m="0 auto">
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="outline"
          disabled={!activatePrevious}
          onClick={() => {
            decreasePagination()
            if (paginateOffset === 0) {
              setActivatePrevious(false)
            }
          }}
        >
          Previous
        </Button>
        <Button
          rightIcon={<ArrowForwardIcon />}
          variant="outline"
          onClick={() => {
            increasePagination()
            if (wikis && wikis?.length >= 10) {
              setActivatePrevious(true)
            }
          }}
          disabled={!wiki || wiki.length === 0}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}
