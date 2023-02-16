import {
  useGetEditorsQuery,
  useGetSearchedEditorsQuery,
  useToggleUserMutation,
  useGetHiddenEditorsQuery,
} from '@/services/admin'
import { Text, Flex, Tag, TagLabel, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { BiSortDown, BiSortUp } from 'react-icons/bi'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { DeleteEditorModal } from './DeleteEditorModal'
import { InsightTableWikiEditors } from './InsightTableWikiEditors'
import { pushItems, EditorsTable, dataUpdate } from './WikiEditorFunctions'
import WikiEditorInsightFooter from './WikiEditorInsightFooter'
import WikiEditorsInsightActionBar from './WikiEditorsInsightActionBar'

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

  pushItems(editorsFilteredArr, newObj)
  pushItems(searchedEditors, newSearchObj)
  pushItems(hiddeneditors, hiddenEditorsArr)

  useEffect(() => {
    setEditorsData(newObj)
    setAllowNext(true)
  }, [editors, sortTableBy, newObj])

  useEffect(() => {
    setSearchedEditorsData(newSearchObj)
    setAllowNext(true)
  }, [searchedEditors, newSearchObj])

  useEffect(() => {
    setHiddenEditorsData(hiddenEditorsArr)
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
    searchKeyWord.length,
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
