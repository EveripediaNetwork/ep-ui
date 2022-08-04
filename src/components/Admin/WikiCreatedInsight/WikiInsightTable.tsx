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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { InsightTableWikiCreated } from './InsightTableCreatedWiki'

export const WikiInsightTable = () => {
  const wikiData = [
    {
      Wiki: {
        title: 'Sushiswap',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmNqqvGLEyTanEHowse84GtXoqVmZDBDKdA846u3RRaGck&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Jan 6, 2022 - 12:22am',
      Tags: ['Normal', 'Promoted'],
      status: 'Active',
      statusDropdown: ['Archive', 'Active'],
      promoted: false,
    },
    {
      Wiki: {
        title: 'Flying Jeans',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmaow6d3nriW4XoaVqTVWsJMr5bME4JFrNsGXDuijMYocZ&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Apr 11, 2022 - 19:22am',
      Tags: ['Normal'],
      status: 'Active',
      statusDropdown: ['Archive', 'Active'],
      promoted: true,
    },
    {
      Wiki: {
        title: 'From Mars',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmZxbkyAGqJt6yUo74QsoKeP6WLWRTn7921Qwxwngxv977&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Apr 11, 2022 - 19:22am',
      Tags: ['Normal'],
      status: 'Archived',
      statusDropdown: ['Archive', 'Active'],
      promoted: true,
    },
    {
      Wiki: {
        title: 'Flying Jeans',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmaow6d3nriW4XoaVqTVWsJMr5bME4JFrNsGXDuijMYocZ&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Jan 6, 2022 - 12:22am',
      Tags: ['Normal', 'Promoted'],
      status: 'Active',
      statusDropdown: ['Archive', 'Active'],
      promoted: false,
    },
    {
      Wiki: {
        title: 'From Mars',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmZxbkyAGqJt6yUo74QsoKeP6WLWRTn7921Qwxwngxv977&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Jan 6, 2022 - 12:22am',
      Tags: ['Normal', 'Promoted'],
      status: 'Active',
      statusDropdown: ['Archive', 'Active'],
      promoted: false,
    },
    {
      Wiki: {
        title: 'From Mars',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmZxbkyAGqJt6yUo74QsoKeP6WLWRTn7921Qwxwngxv977&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Apr 11, 2022 - 19:22am',
      Tags: ['Normal'],
      status: 'Archived',
      statusDropdown: ['Archive', 'Active'],
      promoted: true,
    },
    {
      Wiki: {
        title: 'Sushiswap',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmNqqvGLEyTanEHowse84GtXoqVmZDBDKdA846u3RRaGck&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Jan 6, 2022 - 12:22am',
      Tags: ['Normal', 'Promoted'],
      status: 'Active',
      statusDropdown: ['Archive', 'Active'],
      promoted: false,
    },
    {
      Wiki: {
        title: 'From Mars',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmZxbkyAGqJt6yUo74QsoKeP6WLWRTn7921Qwxwngxv977&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Jan 6, 2022 - 12:22am',
      Tags: ['Normal', 'Promoted'],
      status: 'Active',
      statusDropdown: ['Archive', 'Active'],
      promoted: false,
    },
    {
      Wiki: {
        title: 'Flying Jeans',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmaow6d3nriW4XoaVqTVWsJMr5bME4JFrNsGXDuijMYocZ&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Apr 11, 2022 - 19:22am',
      Tags: ['Normal'],
      status: 'Active',
      statusDropdown: ['Archive', 'Active'],
      promoted: true,
    },
    {
      Wiki: {
        title: 'From Mars',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmZxbkyAGqJt6yUo74QsoKeP6WLWRTn7921Qwxwngxv977&w=3840&q=95',
      },
      editorAddress: 'Kesar.eth',
      DateTime: 'Apr 11, 2022 - 19:22am',
      Tags: ['Normal'],
      status: 'Archived',
      statusDropdown: ['Archive', 'Active'],
      promoted: false,
    },
  ]

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
    total: wikiData.length,
    limits: {
      outer: 3,
      inner: 3,
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1,
    },
  })

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
        <InsightTableWikiCreated wikiCreatedInsightData={wikiData} />
      </Flex>
      <Pagination
        pagesCount={10}
        currentPage={1}
        isDisabled={false}
        onPageChange={() => {
          console.log('hey')
        }}
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
            onClick={() => null}
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
