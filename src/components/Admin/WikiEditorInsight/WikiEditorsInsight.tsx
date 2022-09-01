import {
  useGetEditorsQuery,
  useGetSearchedEditorsQuery,
  useToggleUserMutation,
  useGetHiddenEditorsQuery,
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
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { BiSortDown, BiSort, BiSortUp } from 'react-icons/bi'

import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { DeleteEditorModal } from './DeleteEditorModal'
import { InsightTableWikiEditors } from './InsightTableWikiEditors'

export const WikiEditorsInsightTable = () => {
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const [sortTableBy, setSortTableBy] = useState<string>('default')
  const [searchKeyWord, setsearchKeyWord] = useState<string>('')
  const [filterEditors, setFilterEditors] = useState<string>('')
  const [initiateFetchSearchEditors, setInitiateFetchSearchEditors] =
    useState<boolean>(true)
  const [initiateFilterEditors, setInitiateFilterEditors] =
    useState<boolean>(true)
  const [editorToBeToggled, setEditorToBeToggled] = useState<{
    id: string
    active: boolean
  }>({ id: '', active: false })
  const { data: editors } = useGetEditorsQuery({
    limit: 10,
    offset: paginateOffset,
  })
  const { data: hiddeneditors } = useGetHiddenEditorsQuery(
    {
      limit: 10,
      offset: paginateOffset,
    },
    { skip: initiateFilterEditors },
  )
  const { data: searchedEditors, error } = useGetSearchedEditorsQuery(
    {
      id: searchKeyWord,
    },
    { skip: initiateFetchSearchEditors },
  )

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
  const [hiddenEditorsData, setHiddenEditorsData] =
    useState<Array<EditorInterface>>()
  const newObj: any = []
  const newSearchObj: any = []
  const hiddenEditorsArr: any = []
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

  hiddeneditors
    ?.filter(item => {
      return item?.wikisCreated?.length > 0 || item?.wikisEdited.length > 0
    })
    ?.forEach(item => {
      hiddenEditorsArr.push({
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

  useEffect(() => {
    setHiddenEditorsData(hiddenEditorsArr)
  }, [hiddeneditors])

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

  const completeEditorTable = useMemo(() => {
    if (searchKeyWord.length > 2) {
      return searchedEditorsData
    }
    if (filterEditors === 'Banned') {
      return hiddenEditorsData
    }
    return editorsData

    return editorsData
  }, [searchedEditorsData, editorsData, hiddenEditorsArr])
  const { isOpen, onOpen, onClose } = useDisclosure()
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
                if (e.target.value.length > 2) {
                  setInitiateFetchSearchEditors(false)
                }
              }}
            />
          </InputGroup>
          <Button
            onClick={() => {
              handleSortChange()
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
            onChange={item => {
              setFilterEditors(item.target.value)
              setInitiateFilterEditors(false)
            }}
          >
            <option value="Banned">Banned Editors</option>
            <option value="Active">Active Editors</option>
          </Select>
        </Flex>
      </Flex>
      <Flex pb={5}>
        <InsightTableWikiEditors
          wikiInsightData={completeEditorTable}
          toggleUserFunc={(active: boolean, id: string) => {
            const editorData = {
              id,
              active,
            }
            setEditorToBeToggled(editorData)
            onOpen()
          }}
          filterBy={filterEditors}
        />
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
      <DeleteEditorModal
        id={editorToBeToggled.id}
        isActive={editorToBeToggled.active}
        isOpen={isOpen}
        onClose={onClose}
        toggleUserFunc={(ban: boolean) => {
          toggleUser({
            id: editorToBeToggled.id,
            active: ban,
          })
          setEditorsData(p =>
            p?.map(user => {
              if (user.editorAddress === editorToBeToggled.id) {
                return { ...user, active: ban }
              }
              return user
            }),
          )
          setSearchedEditorsData(p =>
            p?.map(user => {
              if (user.editorAddress === editorToBeToggled.id) {
                return { ...user, active: ban }
              }
              return user
            }),
          )
        }}
      />
    </Flex>
  )
}
