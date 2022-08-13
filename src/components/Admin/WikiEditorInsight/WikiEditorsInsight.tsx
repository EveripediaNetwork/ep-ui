import { useGetEditorsQuery } from '@/services/admin'
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
  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
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
      editorAvatar: item?.profile?.avatar ? item?.profile?.avatar : '',
      editorAddress: item?.id,
      createdWikis: item?.wikisCreated,
      editiedWikis: item?.wikisEdited,
      lastCreatedWiki: item?.wikisCreated[0],
      latestActivity: 'Jan 6, 2022 - 12:22am',
    })
    return null
  })

  editors?.filter(item => {
    return item.wikisCreated.length > 0
  })

  useEffect(() => {
    setEditorsData(newObj)
  }, [editors])

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
      <Flex justify="space-between" w="95%" m="0 auto">
        <Button
          leftIcon={<ArrowBackIcon />}
          color="black"
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
          rightIcon={<ArrowForwardIcon />}
          color="black"
          variant="outline"
          onClick={() => {
            increasePagination()
            if (editorsData && editorsData?.length >= 10) {
              setActivatePrevious(true)
            }
          }}
          disabled={!editorsData || editorsData?.length === 0}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}
