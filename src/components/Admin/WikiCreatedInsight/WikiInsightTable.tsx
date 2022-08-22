import { useGetAllCreatedWikiCountQuery } from '@/services/admin'
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
  MenuItemOption,
  MenuOptionGroup,
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

  // sorting creted wikis by date
  const WikisSortByHighest = wiki?.slice()
  WikisSortByHighest?.sort((a, b) => {
    const Data =
      new Date(b.created ? b.created : '').valueOf() -
      new Date(a.created ? a.created : '').valueOf()
    return Data
  })

  const WikisSortByLowest = wiki?.slice()
  WikisSortByLowest?.sort((a, b) => {
    const Data =
      new Date(a.created ? a.created : '').valueOf() -
      new Date(b.created ? b.created : '').valueOf()
    return Data
  })

  const WikisSortByAlpaUp = wiki?.slice()
  WikisSortByAlpaUp?.sort((a, b) => {
    const Data = a.title.trim().localeCompare(b.title.trim())
    return Data
  })

  const WikisSortByAlpaDown = wiki?.slice()
  WikisSortByAlpaDown?.sort((a, b) => {
    const Data = b.title.trim().localeCompare(a.title.trim())
    return Data
  })

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

  const wikiSorted = useMemo(() => {
    if (sortTableBy === 'default') {
      return wiki
    }
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
    return wiki
  }, [wiki, sortTableBy])

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

  const SortArray = [
    { id: 1, value: 'Newest' },
    { id: 2, value: 'Oldest' },
    { id: 3, value: 'Alpabetical (A-Z)' },
    { id: 4, value: 'Alpabetical (Z-A)' },
  ]

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
          <Menu closeOnSelect={false}>
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
                rightIcon={<MdFilterList />}
                variant="outline"
                fontWeight="light"
              >
                Filter
              </Button>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup title="Filters" type="checkbox">
                <MenuItemOption value="1">Promoted</MenuItemOption>
                <MenuItemOption value="2">Archived</MenuItemOption>
                <MenuItemOption value="3">Sponsored</MenuItemOption>
                <MenuItemOption value="4">Normal</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
