import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { InsightTableWikiCreated } from './InsightTableWikiCreated'

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
      promoted: false,
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
  ]
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
    </Flex>
  )
}
