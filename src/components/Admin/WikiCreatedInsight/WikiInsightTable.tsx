import {
  useGetAllCreatedWikiCountQuery,
  useGetSearchedWikisByTitleQuery,
  useGetAllHiddenWikiCountQuery,
  useGetAllPromotedWikiCountQuery,
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
  VStack,
  HStack,
  useDisclosure,
  PopoverFooter,
} from '@chakra-ui/react'

import React, { useEffect, useState, useMemo } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { BiSortDown, BiSort, BiSortUp } from 'react-icons/bi'
import { InsightTableWikiCreated } from './InsightTableCreatedWiki'

export const WikiInsightTable = () => {
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const [initGetHiddenWikis, setInitGetHiddenWikis] = useState<boolean>(true)
  const [initGetPromotedWikis, setInitGetPromotedWikis] =
    useState<boolean>(true)
  const [initGetSearchedWikis, setInitGetSearchedWikis] =
    useState<boolean>(true)
    const [toggler, setToggler] =
    useState<boolean>(false)
  const [sortTableBy, setSortTableBy] = useState<string>('default')
  const { data: wiki, refetch } = useGetAllCreatedWikiCountQuery(paginateOffset)
  const [wikis, setWikis] = useState<Array<[] | any>>()
  const [searchKeyWord, setsearchKeyWord] = useState<string>('')
  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
  const [filterItems, setFilterItems] = useState<Array<[] | any>>()
  const [checked, setChecked] = useState(0)
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { data: hidden, refetch: hiddenRefresh } =
    useGetAllHiddenWikiCountQuery(paginateOffset, {
      skip: initGetHiddenWikis,
    })
  const { data: SearchedWikis, refetch: searchRefresh } = useGetSearchedWikisByTitleQuery(
    searchKeyWord,
    { skip: initGetSearchedWikis },
  )

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

  const { data: promotedWikis, refetch: promotedRefresh } = useGetAllPromotedWikiCountQuery(
    paginateOffset,
    {
      skip: initGetPromotedWikis,
    },
  )

  const SortArray = [
    { id: 1, value: 'Newest' },
    { id: 2, value: 'Oldest' },
    { id: 3, value: 'Alpabetical (A-Z)' },
    { id: 4, value: 'Alpabetical (Z-A)' },
  ]

  const FilterArray = [
    { id: 'promoted', value: 'Promoted' },
    { id: 'archived', value: 'Archived' },
    { id: 'normal', value: 'Normal' },
  ]

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
    initGetPromotedWikis,
    initGetHiddenWikis,
    promotedWikis,
    hidden,
  ])

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
      setInitGetSearchedWikis(false)
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
    refetch()
    hiddenRefresh()
    promotedRefresh()
    searchRefresh()
  }, [
    wiki,
    filterItems,
    sortTableBy,
    searchKeyWord,
    initGetSearchedWikis,
    SearchedWikis,
    promotedWikis,
    hidden,
    initGetPromotedWikis,
    initGetHiddenWikis,
    toggler

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
                transition="all 0.2s"
                borderRadius="md"
                _expanded={{ bg: 'brand.500', color: 'white' }}
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
              <form onSubmit={e => ApplyFilterItems(e)}>
                <PopoverBody py={3}>
                  <VStack
                    spacing={1}
                    w="fit-content"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                  >
                    {FilterArray.map((item, i) => (
                      <Checkbox
                        onChange={() => setChecked(i + 1)}
                        key={i}
                        colorScheme="pink"
                        isChecked={checked === i + 1}
                        py={1}
                        value={item.id}
                      >
                        {item.value}
                      </Checkbox>
                    ))}
                  </VStack>
                </PopoverBody>
                <PopoverFooter>
                  <HStack gap={4} w="fit-content" px={2}>
                    <Button
                      type="button"
                      px={6}
                      py={1}
                      variant="ghost"
                      borderWidth="1px"
                      onClick={() => {
                        setChecked(0)
                        onClose()
                      }}
                      rounded="lg"
                      fontWeight="semibold"
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      rounded="lg"
                      px={6}
                      py={1}
                      fontWeight="semibold"
                    >
                      Apply
                    </Button>
                  </HStack>
                </PopoverFooter>
              </form>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      <Flex pb={5}>
        {wikis?.length && wikis.length > 0 ? (
          <InsightTableWikiCreated
            wikiCreatedInsightData={wikis || []}
            hideWikisFunc={() => setToggler(!toggler)}
          />
        ) : (
          <Text pt="2" textAlign="center" w="full">
            No data to display
          </Text>
        )}
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
