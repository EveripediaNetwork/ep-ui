import {
  useGetEditorsQuery,
  useGetSearchedEditorsQuery,
  useToggleUserMutation,
} from '@/services/admin'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Text,
  Flex,
  Tag,
  TagLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { BiSortDown, BiSort, BiSortUp } from 'react-icons/bi'

import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { InsightTableWikiEditors } from './InsightTableWikiEditors'

export const WikiEditorsInsightTable = () => {
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const [sortTableBy, setSortTableBy] = useState<string>('default')
  const [searchKeyWord, setsearchKeyWord] = useState<string>('')
  const { data: editors } = useGetEditorsQuery({
    limit: 10,
    offset: paginateOffset,
  })
  const { data: searchedEditors } = useGetSearchedEditorsQuery({
    id: searchKeyWord,
  })
  // sorting editors
  const editorsSortByHighest = editors?.slice()
  editorsSortByHighest?.sort(
    (a, b) => b.wikisCreated.length - a.wikisCreated.length,
  )

  const editorsSortByLowest = editors?.slice()
  editorsSortByLowest?.sort(
    (a, b) => a.wikisCreated.length - b.wikisCreated.length,
  )

  const [toggleUser] = useToggleUserMutation()

  const toggleUserFunc = async () => {
    await toggleUser({
      id: '0xAe65930180ef4d86dbD1844275433E9e1d6311ED',
      active: false,
    })
  }

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
  }, [editors, sortTableBy])

  const editorsFilteredArr = useMemo(() => {
    if (sortTableBy === 'default') {
      return editors
    }
    if (sortTableBy === 'ascending') {
      return editorsSortByHighest
    }
    if (sortTableBy === 'descending') {
      return editorsSortByLowest
    }
    return editors
  }, [editors, sortTableBy])

  const handleSortChange = () => {
    if (sortTableBy === 'default') {
      setSortTableBy('descending')
    } else if (sortTableBy === 'descending') {
      setSortTableBy('ascending')
    } else if (sortTableBy === 'ascending') {
      setSortTableBy('descending')
    }
  }

  interface EditorInterface {
    editorName: string
    createdWikis: {
      content: {
        title: string
        images: {
          id: string
        }[]
      }[]
      datetime: string
      id: string
      ipfs: string
      wikiId: string
    }[]
    editiedWikis: {
      content: {
        title: string
        images: {
          id: string
        }[]
      }[]
      datetime: string
      id: string
      ipfs: string
      wikiId: string
    }[]
    lastCreatedWiki: {
      content: {
        title: string
        images: {
          id: string
        }[]
      }[]
    }
    editorAvatar: string
    latestActivity: string
    editorAddress: string
    active: boolean
  }

  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
  const [allowNext, setAllowNext] = useState<boolean>(true)
  const [editorsData, setEditorsData] = useState<Array<EditorInterface>>()
  const [searchedEditorsData, setSearchedEditorsData] =
    useState<Array<EditorInterface>>()
  const newObj: any = []
  const newSearchObj: any = []
  searchedEditors
    ?.filter(item => {
      return item?.wikisCreated?.length > 0 || item?.wikisEdited.length > 0
    })
    ?.forEach(item => {
      newSearchObj.push({
        editorName: item?.profile?.username
          ? item?.profile?.username
          : 'Unknown',
        editorAvatar: item?.profile?.avatar ? item?.profile?.avatar : '',
        editorAddress: item?.id,
        createdWikis: item?.wikisCreated,
        editiedWikis: item?.wikisEdited,
        lastCreatedWiki: item?.wikisCreated[0]
          ? item?.wikisCreated[0]
          : item?.wikisEdited[0],
        latestActivity: item?.wikisCreated[0]?.datetime.split('T')[0],
        active: item?.active,
      })
      return null
    })

  editorsFilteredArr
    ?.filter(item => {
      return item?.wikisCreated?.length > 0 || item?.wikisEdited.length > 0
    })
    ?.forEach(item => {
      newObj.push({
        editorName: item?.profile?.username
          ? item?.profile?.username
          : 'Unknown',
        editorAvatar: item?.profile?.avatar ? item?.profile?.avatar : '',
        editorAddress: item?.id,
        createdWikis: item?.wikisCreated,
        editiedWikis: item?.wikisEdited,
        lastCreatedWiki: item?.wikisCreated[0]
          ? item?.wikisCreated[0]
          : item?.wikisEdited[0],
        latestActivity: item?.wikisCreated[0]?.datetime.split('T')[0],
        active: item?.active,
      })
      return null
    })

  useEffect(() => {
    setEditorsData(newObj)
    setAllowNext(true)
  }, [editors, sortTableBy])

  useEffect(() => {
    setSearchedEditorsData(newSearchObj)
    setAllowNext(true)
  }, [searchedEditors])

  const increasePagination = () => {
    return (
      editors && editors?.length >= 10 && setPaginateOffset(paginateOffset + 10)
    )
  }

  const decreasePagination = () => {
    return (
      editors && editors?.length <= 10 && setPaginateOffset(paginateOffset - 10)
    )
  }

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
      <Flex borderBottomWidth="1px" w="100%" p={5} gap={2} align="center">
        <Text fontSize="lg">Editors</Text>
        <Tag
          size="sm"
          borderRadius="full"
          variant="solid"
          bg="#FFE5F1"
          color="#FF5CAA"
        >
          <TagLabel>100 Users</TagLabel>
        </Tag>
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
          <Button
            onClick={() => {
              handleSortChange()
              toggleUserFunc()
            }}
            borderColor="#E2E8F0"
            _dark={{ borderColor: '#2c323d' }}
            py={2}
            px={10}
            rightIcon={sortIcon}
            variant="outline"
            fontWeight="light"
          >
            Sort
          </Button>
          <Select
            cursor="pointer"
            w="40%"
            placeholder="Filter"
            icon={<MdFilterList />}
          >
            <option value="option1">Weekly</option>
            <option value="option2">Monthly</option>
            <option value="option3">Yearly</option>
          </Select>
        </Flex>
      </Flex>
      <Flex pb={5}>
        {searchKeyWord.length > 0 ? (
          <InsightTableWikiEditors wikiInsightData={searchedEditorsData} />
        ) : (
          <InsightTableWikiEditors wikiInsightData={editorsData} />
        )}
      </Flex>
      <Flex
        justify="space-between"
        w="95%"
        m="0 auto"
        display={searchKeyWord.length > 0 ? 'none' : 'flex'}
      >
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="outline"
          disabled={!activatePrevious}
          onClick={() => {
            decreasePagination()
            if (editorsData && editorsData?.length >= 10) {
              setActivatePrevious(false)
            }
          }}
        >
          Previous
        </Button>
        <Button
          disabled={editorsData && editorsData?.length < 9}
          rightIcon={<ArrowForwardIcon />}
          variant="outline"
          onClick={() => {
            if (allowNext) {
              increasePagination()
            }
            setAllowNext(false)
            if (editorsData && editorsData?.length >= 7) {
              setActivatePrevious(true)
            }
          }}
          cursor={
            !allowNext && editorsData && editorsData?.length >= 7
              ? 'wait'
              : 'pointer'
          }
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}
