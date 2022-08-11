import { useGetEditorsQuery } from '@/services/admin'
import {
  Pagination,
  PaginationContainer,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationSeparator,
  PaginationPage,
  PaginationNext,
  usePagination,
} from '@ajna/pagination'
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
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { InsightTableWikiEditors } from './InsightTableWikiEditors'

export const WikiEditorsInsightTable = () => {
  const [paginateOffset, setPaginateOffset] = useState<number>(0)
  const { data: editors } = useGetEditorsQuery({
    limit: 10,
    offset: paginateOffset,
  })
  const [editorsData, setEditorsData] = useState<
    Array<{
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
    }>
  >()
  const newObj: any = []
  editors?.map(item => {
    newObj.push({
      editorName: item?.profile?.username ? item?.profile?.username : 'Unknown',
      editorAvatar: item?.profile?.avatar ? item?.profile?.avatar : 'james.png',
      editorAddress: item?.id,
      createdWikis: item?.wikisCreated,
      editiedWikis: item?.wikisEdited,
      lastCreatedWiki: item?.wikisCreated[0],
      latestActivity: 'Jan 6, 2022 - 12:22am',
    })
    return null
  })

  useEffect(() => {
    setEditorsData(newObj)
  }, [editors])
  const {
    pages,
    // pagesCount,
    // offset,
    // currentPage,
    // setCurrentPage,
    // setIsDisabled,
    // isDisabled,
    // pageSize,
    // setPageSize,
  } = usePagination({
    total: editorsData?.length,
    limits: {
      outer: 3,
      inner: 3,
    },
    initialState: {
      pageSize: 2,
      isDisabled: false,
      currentPage: 1,
    },
  })

  const increasePagination = () => {
    return (
      editors && editors?.length >= 10 && setPaginateOffset(paginateOffset + 10)
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
            <Input type="tel" placeholder="Search" />
          </InputGroup>
          <Select
            cursor="pointer"
            w="40%"
            placeholder="Filter"
            icon={<MdFilterList />}
          >
            <option value="option1">Weekly</option>
            <option value="option1">Monthly</option>
            <option value="option1">Yearly</option>
          </Select>
        </Flex>
      </Flex>
      <Flex pb={5}>
        <InsightTableWikiEditors wikiInsightData={editorsData} />
      </Flex>
      <Pagination
        pagesCount={10}
        currentPage={1}
        isDisabled={false}
        onPageChange={() => {}}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
          display="flex"
          flexDirection={{ lg: 'row', base: 'column' }}
          gap={5}
        >
          <PaginationPrevious
            bg="white"
            onClick={() => null}
            _hover={{ bg: 'none' }}
            _active={{ bg: 'none' }}
          >
            <Button
              leftIcon={<ArrowBackIcon />}
              color="black"
              variant="outline"
            >
              Previous
            </Button>
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                onClick={() =>
                  console.log(
                    'Im executing my own function along with Separator component functionality',
                  )
                }
                bg="blue.300"
                fontSize="sm"
                w={7}
                jumpSize={11}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                w={7}
                key={`pagination_page_${page}`}
                page={page}
                p={5}
                onClick={() =>
                  console.log(
                    'Im executing my own function along with Page component functionality',
                  )
                }
                fontSize="sm"
                _hover={{
                  bg: '#FFE5F1',
                  color: 'brand.500',
                }}
                _current={{
                  bg: '#FFE5F1',
                  fontSize: 'sm',
                  color: 'brand.500',
                  w: 7,
                }}
                bg="transparent"
                color="#718096"
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            bg="white"
            onClick={() => {
              increasePagination()
            }}
            _hover={{ bg: 'none' }}
            _active={{ bg: 'none' }}
          >
            <Button
              rightIcon={<ArrowForwardIcon />}
              color="black"
              variant="outline"
            >
              Next
            </Button>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  )
}
