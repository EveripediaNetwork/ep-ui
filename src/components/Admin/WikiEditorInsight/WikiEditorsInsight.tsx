import {
  useGetEditorsQuery,
  useGetSearchedEditorsQuery,
  useToggleUserMutation,
  useGetHiddenEditorsQuery,
} from '@/services/admin'
import { EditorsTable } from '@/types/admin'
import { dataUpdate } from '@/utils/AdminUtils/dataUpdate'
import { pushItems } from '@/utils/AdminUtils/pushArrayData'
import { Text, Flex, Tag, TagLabel, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { BiSortDown, BiSortUp } from 'react-icons/bi'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { DeleteEditorModal } from './DeleteEditorModal'
import { InsightTableWikiEditors } from './InsightTableWikiEditors'
import WikiEditorInsightFooter from './WikiEditorInsightFooter'
import WikiEditorsInsightActionBar from './WikiEditorsInsightActionBar'

interface EditorInterface {
  editorName: string
  createdWikis: {
    id: string
    wikiId: string
    datetime: string
    ipfs: string
    content: { title: string; images: { id: string } }
  }[]
  editiedWikis: {
    content: {
      title: string
      images: {
        id: string
      }
    }
    datetime: string
    id: string
    ipfs: string
    wikiId: string
  }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastCreatedWiki: any
  editorAvatar: string
  latestActivity: string
  editorAddress: string
  active: boolean
}

export const WikiEditorsInsightTable = () => {
  const editorTableRef = useRef<null | HTMLDivElement>(null)
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const [sortTableBy, setSortTableBy] = useState<string>('default')
  const [searchKeyWord, setsearchKeyWord] = useState<string>('')
  const [filterEditors, setFilterEditors] = useState<string>('')
  const [checked, setChecked] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [toggleUser] = useToggleUserMutation()
  const {
    isOpen: isOpenFilter,
    onToggle: onToggleFilter,
    onClose: onCloseFilter,
  } = useDisclosure()
  const [initiateFetchSearchEditors, setInitiateFetchSearchEditors] =
    useState<boolean>(true)
  const [initiateFilterEditors, setInitiateFilterEditors] =
    useState<boolean>(true)
  const [editorToBeToggled, setEditorToBeToggled] = useState<{
    id: string
    active: boolean
  }>({ id: '', active: false })
  const [activatePrevious, setActivatePrevious] = useState(false)
  const [allowNext, setAllowNext] = useState(true)
  const [editorsData, setEditorsData] = useState<Array<EditorsTable>>()
  const [searchedEditorsData, setSearchedEditorsData] =
    useState<Array<EditorsTable>>()
  const [hiddenEditorsData, setHiddenEditorsData] =
    useState<Array<EditorsTable>>()
  const newObj: EditorsTable[] = useMemo(() => [], [])
  const newSearchObj: EditorsTable[] = useMemo(() => [], [])
  const hiddenEditorsArr: EditorsTable[] = useMemo(() => [], [])

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

  const { data: searchedEditors } = useGetSearchedEditorsQuery(
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

  const sortIcon = useMemo(() => {
    if (sortTableBy === 'default') {
      return <RiArrowUpDownLine fontSize="1.3rem" />
    }
    if (sortTableBy === 'ascending') {
      return <BiSortUp fontSize="1.3rem" />
    }
    if (sortTableBy === 'descending') {
      return <BiSortDown fontSize="1.3rem" />
    }
    return <RiArrowUpDownLine fontSize="1.3rem" />
  }, [sortTableBy])

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
  }, [sortTableBy, editors, editorsSortByHighest, editorsSortByLowest])

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
    { id: 'Banned', value: 'Banned Editors' },
    { id: 'Active', value: 'Active Editors' },
  ]

  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
  const [allowNext, setAllowNext] = useState<boolean>(true)
  const [editorsData, setEditorsData] = useState<Array<EditorInterface>>()
  const [searchedEditorsData, setSearchedEditorsData] =
    useState<Array<EditorInterface>>()
  const [hiddenEditorsData, setHiddenEditorsData] =
    useState<Array<EditorInterface>>()
  const newObj: EditorInterface[] = useMemo(() => [], [])
  const newSearchObj: EditorInterface[] = useMemo(() => [], [])
  const hiddenEditorsArr: EditorInterface[] = useMemo(() => [], [])

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

  pushItems(editorsFilteredArr, newObj)
  pushItems(searchedEditors, newSearchObj)
  pushItems(hiddeneditors, hiddenEditorsArr)

  useEffect(() => {
    newObj.length = 0

    setEditorsData(() => {
      return [...newObj]
    })
    setAllowNext(true)
  }, [editors, newObj, editorsFilteredArr])

  useEffect(() => {
    newSearchObj.length = 0

    setSearchedEditorsData(() => {
      return [...newSearchObj]
    })
    setAllowNext(true)
  }, [searchedEditors, newSearchObj])

  useEffect(() => {
    hiddenEditorsArr.length = 0

    setHiddenEditorsData(() => {
      return [...hiddenEditorsArr]
    })
  }, [hiddeneditors, hiddenEditorsArr])

  const scrolltoTableTop = () => {
    editorTableRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

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
  const ApplyFilterItems = (e: React.FormEvent<HTMLFormElement>) => {
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
    setFilterEditors(data[0])
    setInitiateFilterEditors(false)
    onCloseFilter()
  }

  const completeEditorTable = useMemo(() => {
    if (searchKeyWord.length > 2) {
      return searchedEditorsData
    }
    if (filterEditors === 'Banned') {
      return hiddenEditorsData
    }

    return editorsData
  }, [
    searchedEditorsData,
    editorsData,
    filterEditors,
    hiddenEditorsData,
    searchKeyWord,
  ])

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
      ref={editorTableRef}
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
      <WikiEditorsInsightActionBar
        setsearchKeyWord={setsearchKeyWord}
        setInitiateFetchSearchEditors={setInitiateFetchSearchEditors}
        handleSortChange={handleSortChange}
        isOpenFilter={isOpenFilter}
        onCloseFilter={onCloseFilter}
        ApplyFilterItems={ApplyFilterItems}
        onToggleFilter={onToggleFilter}
        FilterArray={FilterArray}
        sortIcon={sortIcon}
        setChecked={setChecked}
        checked={checked}
        setFilterEditors={setFilterEditors}
      />
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
      <WikiEditorInsightFooter
        searchKeyWord={searchKeyWord}
        allowNext={allowNext}
        setAllowNext={setAllowNext}
        decreasePagination={decreasePagination}
        activatePrevious={activatePrevious}
        editorsData={editorsData}
        setActivatePrevious={setActivatePrevious}
        scrolltoTableTop={scrolltoTableTop}
        increasePagination={increasePagination}
      />
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
          // Possibly apply conditon to this Optimistic state update
          setEditorsData(dataUpdate(editorsData, ban, editorToBeToggled.id))
          setSearchedEditorsData(
            dataUpdate(editorsData, ban, editorToBeToggled.id),
          )
          setHiddenEditorsData(
            dataUpdate(editorsData, ban, editorToBeToggled.id),
          )
        }}
      />
    </Flex>
  )
}
