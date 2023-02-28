import {
  useGetSearchedEditorsQuery,
  useToggleUserMutation,
  useGetHiddenEditorsQuery,
  useGetEditorsQuery,
} from '@/services/admin'
import { Editors } from '@/types/admin'
import { dataUpdate } from '@/utils/AdminUtils/dataUpdate'
import { Text, Flex, Tag, TagLabel, useDisclosure } from '@chakra-ui/react'
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  ChangeEvent,
  useCallback,
} from 'react'
import { BiSortDown, BiSortUp } from 'react-icons/bi'
import { RiArrowUpDownLine } from 'react-icons/ri'
import { DeleteEditorModal } from './DeleteEditorModal'
import { InsightTableWikiEditors } from './InsightTableWikiEditors'
import WikiEditorInsightFooter from './WikiEditorInsightFooter'
import WikiEditorsInsightActionBar from './WikiEditorsInsightActionBar'

export const WikiEditorsInsightTable = () => {
  const refetchFunc = useRef<() => void>()
  const editorTableRef = useRef<null | HTMLDivElement>(null)
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const [searchKeyWord, setsearchKeyWord] = useState<string>('')
  const [initiateFetchSearchEditors, setInitiateFetchSearchEditors] =
    useState<boolean>(true)
  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
  const [filterItems, setFilterItems] = useState<string[]>()
  const [sortTableBy, setSortTableBy] = useState<string>('default')
  const { isOpen, onToggle, onClose } = useDisclosure()
  const {
    isOpen: deleteModalIsOpen,
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose,
  } = useDisclosure()
  const [checked, setChecked] = useState(0)
  const [editorsList, setEditorslist] = useState<Editors[] | undefined>()
  const [editorState, setEditorState] = useState<{
    id: string
    active: boolean
  }>({ id: '', active: false })
  const [toggleUser] = useToggleUserMutation()

  const {
    data: editors,
    isFetching: editorsIsFetching,
    refetch,
  } = useGetEditorsQuery({
    limit: 10,
    offset: paginateOffset,
  })

  const { data: hiddeneditors, isFetching: hiddenEditorsIsFetching } =
    useGetHiddenEditorsQuery(paginateOffset)

  const { data: searchedEditors } = useGetSearchedEditorsQuery(
    {
      id: searchKeyWord,
      username: searchKeyWord,
    },
    { skip: initiateFetchSearchEditors, refetchOnMountOrArgChange: true },
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

  enum FilterTypes {
    active = 'Active',
    banned = 'Banned',
  }

  const handleSortChange = useCallback(() => {
    if (sortTableBy === 'default') {
      setSortTableBy('descending')
    } else if (sortTableBy === 'descending') {
      setSortTableBy('ascending')
    } else if (sortTableBy === 'ascending') {
      setSortTableBy('descending')
    }
  }, [sortTableBy, setSortTableBy])

  const handleRefetch = () => {
    if (refetchFunc.current) {
      refetchFunc.current()
    }
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

    setFilterItems(data)
    onClose()
  }

  const FilterArray = [
    { id: 'Banned', value: 'Banned Editors' },
    { id: 'Active', value: 'Active Editors' },
  ]

  const newEditors = useMemo(() => {
    let filteredEditors = editors
    if (filterItems?.includes(FilterTypes.banned)) {
      handleRefetch()
      filteredEditors = hiddeneditors
    }

    if (filterItems?.includes(FilterTypes.active)) {
      handleRefetch()
      filteredEditors = editors
    }

    return filteredEditors
  }, [
    editors,
    filterItems,
    hiddeneditors,
    FilterTypes.active,
    FilterTypes.banned,
  ])

  // sorting editors
  const editorsSortByHighest = newEditors?.slice()
  editorsSortByHighest?.sort(
    (a, b) => b.wikisCreated.length - a.wikisCreated.length,
  )

  const editorsSortByLowest = newEditors?.slice()
  editorsSortByLowest?.sort(
    (a, b) => a.wikisCreated.length - b.wikisCreated.length,
  )

  const editorsSortedArray = useMemo(() => {
    if (sortTableBy === 'ascending') {
      return editorsSortByHighest
    }
    if (sortTableBy === 'descending') {
      return editorsSortByLowest
    }
    return newEditors
  }, [sortTableBy, newEditors, editorsSortByHighest, editorsSortByLowest])

  const whichEditorList = useCallback(() => {
    if (searchKeyWord.length < 2) {
      setEditorslist(editorsSortedArray)
    } else if (searchKeyWord.length > 2) {
      setInitiateFetchSearchEditors(false)
      setEditorslist(searchedEditors)
    }
  }, [searchedEditors, searchKeyWord.length, editorsSortedArray])

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
      editors && editors?.length >= 10 && setPaginateOffset(paginateOffset - 10)
    )
  }

  useEffect(() => {
    refetchFunc.current = refetch
  }, [refetch])

  useEffect(() => {
    whichEditorList()
  }, [whichEditorList, editors, filterItems, hiddeneditors, editorsList])

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchKeyWord(() => {
      return e.target.value
    })
    if (e.target.value.length > 2) {
      setInitiateFetchSearchEditors(false)
    }
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
        handleSearchKeyword={handleSearchKeyword}
        handleSortChange={handleSortChange}
        isOpenFilter={isOpen}
        onCloseFilter={onClose}
        ApplyFilterItems={ApplyFilterItems}
        onToggleFilter={onToggle}
        FilterArray={FilterArray}
        sortIcon={sortIcon}
        setChecked={setChecked}
        checked={checked}
        setFilterEditors={setFilterItems}
        setPaginateOffset={setPaginateOffset}
      />
      <Flex pb={5}>
        <InsightTableWikiEditors
          wikiInsightData={editorsList}
          toggleUserFunc={(active: boolean, id: string) => {
            const editorData = {
              id,
              active,
            }
            setEditorState(editorData)
            deleteModalOnOpen()
          }}
          editorsIsFetching={editorsIsFetching}
          hiddenEditorsIsFetching={hiddenEditorsIsFetching}
        />
      </Flex>
      <WikiEditorInsightFooter
        searchKeyWord={searchKeyWord}
        decreasePagination={decreasePagination}
        activatePrevious={activatePrevious}
        editorsData={editorsList}
        setActivatePrevious={setActivatePrevious}
        scrolltoTableTop={scrolltoTableTop}
        increasePagination={increasePagination}
        paginateOffset={paginateOffset}
      />
      <DeleteEditorModal
        id={editorState.id}
        isActive={editorState.active}
        isOpen={deleteModalIsOpen}
        onClose={deleteModalOnClose}
        toggleUserFunc={(ban: boolean) => {
          toggleUser({
            id: editorState.id,
            active: ban,
          })
          setEditorslist(() => dataUpdate(editorsList, ban, editorState.id))
          handleRefetch()
        }}
      />
    </Flex>
  )
}
