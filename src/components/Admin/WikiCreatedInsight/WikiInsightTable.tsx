import {
  useGetAllCreatedWikiCountQuery,
  useGetSearchedWikisByTitleQuery,
} from '@/services/admin'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Checkbox,
  CheckboxGroup,
  VStack,
  HStack,
  useDisclosure,
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
  const [searchKeyWord, setsearchKeyWord] = useState<string>('')
  const { data: SearchedWikis } = useGetSearchedWikisByTitleQuery(searchKeyWord)
  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
  const [filterItems, setFilterItems] = useState<Array<[] | any>>()

  const { isOpen, onToggle, onClose } = useDisclosure()
  // sorting creted wikis by date

  const sortIcon = useMemo(() => {
    if (sortTableBy === 'default') {
      return <BiSort fontSize="1.3rem" />
    }
    if (sortTableBy === 'Newest' || sortTableBy === 'AlpaUp') {
      return <BiSortUp fontSize="1.3rem" />
    }
    if (sortTableBy === 'Oldest' || sortTableBy === 'AlpaDown') {
      return <BiSortDown fontSize="1.3rem" />
    }
    return <BiSort fontSize="1.3rem" />
  }, [wiki, sortTableBy])

  enum FilterTypes {
    promoted = 'promoted',
    archived = 'archived',
    sponsored = 'sponsored',
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

  const ApplyFilterItems = (e: any) => {
    e.preventDefault()
    // get all checkboxes from form
    const checkboxes = Array.from(
      e.currentTarget.querySelectorAll(
        'input[type="checkbox"]',
      ) as unknown as Array<HTMLInputElement>,
    )

    // get all the checked and unchecked checkboxes with their names
    const data: string[] = []
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) data.push(checkbox.value)
    })
    setFilterItems(data)
    onClose()
  }

  const SortArray = [
    { id: 1, value: 'Newest' },
    { id: 2, value: 'Oldest' },
    { id: 3, value: 'Alpabetical (A-Z)' },
    { id: 4, value: 'Alpabetical (Z-A)' },
  ]

  const FilterArray = [
    { id: 'promoted', value: 'Promoted' },
    { id: 'archived', value: 'Archived' },
    { id: 'sponsored', value: 'Sponsored' },
    { id: 'normal', value: 'Normal' },
  ]

  const newWikis = useMemo(() => {
    let filteredWikis = wiki
    if (filterItems?.includes(FilterTypes.promoted)) {
      filteredWikis = filteredWikis?.filter(item => item.promoted > 0)
    }
    if (filterItems?.includes(FilterTypes.archived)) {
      filteredWikis = filteredWikis?.filter(item => item.hidden === true)
    }
    if (filterItems?.includes(FilterTypes.sponsored)) {
      // will get sponsored wiki
    }
    if (filterItems?.includes(FilterTypes.normal)) {
      // normal is the normal wiki
      filteredWikis = wiki
    }
    return filteredWikis
  }, [wiki, filterItems])

  const WikisSortByHighest = newWikis?.slice()
  WikisSortByHighest?.sort((a, b) => {
    const Data =
      new Date(b.created ? b.created : '').valueOf() -
      new Date(a.created ? a.created : '').valueOf()
    return Data
  })

  const WikisSortByLowest = newWikis?.slice()
  WikisSortByLowest?.sort((a, b) => {
    const Data =
      new Date(a.created ? a.created : '').valueOf() -
      new Date(b.created ? b.created : '').valueOf()
    return Data
  })

  const WikisSortByAlpaUp = newWikis?.slice()
  WikisSortByAlpaUp?.sort((a, b) => {
    const Data = a.title.trim().localeCompare(b.title.trim())
    return Data
  })

  const WikisSortByAlpaDown = newWikis?.slice()
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
    return newWikis
  }, [newWikis, sortTableBy])

  const whichWiki = () => {
    if (searchKeyWord.length < 1) {
      setWikis(wikiSorted)
    } else if (searchKeyWord.length > 0) {
      setWikis(SearchedWikis)
    }
  }

  const increasePagination = () => {
    return (
      wikis && wikis?.length >= 10 && setPaginateOffset(paginateOffset + 10)
    )
  }

  const decreasePagination = () => {
    return (
      wikis && wikis?.length >= 10 && setPaginateOffset(paginateOffset - 10)
    )
  }

  useEffect(() => {
    whichWiki()
  }, [wiki, filterItems, sortTableBy, SearchedWikis, searchKeyWord])

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
            <Input
              type="text"
              placeholder="Search"
              onChange={e => {
                setsearchKeyWord(e.target.value)
              }}
            />
          </InputGroup>
          <Menu>
            <MenuButton
              transition="all 0.2s"
              borderRadius="md"
              _expanded={{ bg: 'brand.500', color: 'white' }}
            >
              <Button
                borderColor="#E2E8F0"
                _dark={{ borderColor: '#2c323d' }}
                py={2}
                px={5}
                leftIcon={sortIcon}
                variant="outline"
                fontWeight="light"
              >
                Sort
              </Button>
            </MenuButton>
            <MenuList>
              {SortArray.map((o, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleSortChange(o.id)
                  }}
                  py="1"
                  px="3"
                >
                  {o.value}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Popover isLazy isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button
                _dark={{ borderColor: '#2c323d' }}
                py={2}
                px={10}
                rightIcon={<MdFilterList />}
                variant="outline"
                fontWeight="medium"
                onClick={onToggle}
              >
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent w="fit-content">
              <PopoverBody>
                <form onSubmit={e => ApplyFilterItems(e)}>
                  <CheckboxGroup colorScheme="pink" defaultValue={filterItems}>
                    <VStack
                      spacing={1}
                      w="fit-content"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                    >
                      {FilterArray.map((item, i) => (
                        <Checkbox key={i} py={1} value={item.id}>
                          {item.value}
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                  <HStack gap={4} w="fit-content" pt="4">
                    <Button
                      type="button"
                      p={2}
                      onClick={() => {
                        setFilterItems([])
                        onClose()
                      }}
                    >
                      Reset
                    </Button>
                    <Button type="submit" p={2}>
                      Apply
                    </Button>
                  </HStack>
                </form>
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
