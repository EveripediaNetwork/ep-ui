import { useGetAllCreatedWikiCountQuery } from '@/services/admin'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { InsightTableWikiCreated } from './InsightTableCreatedWiki'

export const WikiInsightTable = () => {
  const [paginateOffset, setPaginateOffset] = useState<number>(0)

  const { data: wiki } = useGetAllCreatedWikiCountQuery(paginateOffset)
  const [wikis, setWikis] = useState<Array<[] | any>>()
  const [activatePrevious, setActivatePrevious] = useState<boolean>(false)
  const increasePagination = () => {
    return wiki && wiki?.length >= 10 && setPaginateOffset(paginateOffset + 10)
  }

  const decreasePagination = () => {
    return wiki && wiki?.length >= 10 && setPaginateOffset(paginateOffset - 10)
  }

  useEffect(() => {
    setWikis(wiki)
  }, [wiki])

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
          <Select
            cursor="pointer"
            w="50%"
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
        <InsightTableWikiCreated wikiCreatedInsightData={wikis || []} />
      </Flex>
      <Flex justify="space-between" w="95%" m="0 auto">
        <Button
          leftIcon={<ArrowBackIcon />}
          color="black"
          variant="outline"
          disabled={!activatePrevious}
          onClick={() => {
            decreasePagination()
            if (paginateOffset == 0) {
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
            if (wikis && wikis?.length >= 10) {
              setActivatePrevious(true)
            }
          }}
          disabled={!wiki || wiki.length == 0}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  )
}
