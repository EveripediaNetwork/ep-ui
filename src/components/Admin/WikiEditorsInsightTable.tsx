import {
  Text,
  Flex,
  Tag,
  TagLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdFilterList } from 'react-icons/md'
import { InsightTableWikiEditors } from './InsightTableWikiEditors'

export const WikiEditorsInsightTable = () => {
  const wikiInsightData = [
    {
      editorName: 'Joe Dohn',
      editorAvatar: 'https://bit.ly/dan-abramov',
      editorAddress: '0xFe9d...2358',
      createdWikis: 3,
      editiedWikis: 12,
      lastCreatedWiki: {
        title: 'Sushiswap',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmNqqvGLEyTanEHowse84GtXoqVmZDBDKdA846u3RRaGck&w=3840&q=95',
      },
      latestActivity: 'Jan 6, 2022 - 12:22am',
    },
    {
      editorName: 'Lucy Xander',
      editorAvatar:
        'https://www.the.com/__PUBLIC_LIGHT/assets/RpJA1-grace-headshot.jpg',
      editorAddress: '0xSegd...2358',
      createdWikis: 12,
      editiedWikis: 8,
      lastCreatedWiki: {
        title: 'Flying Jeans',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmaow6d3nriW4XoaVqTVWsJMr5bME4JFrNsGXDuijMYocZ&w=3840&q=95',
      },
      latestActivity: 'Apr 11, 2022 - 19:22am',
    },
    {
      editorName: 'Mike Drawn',
      editorAvatar:
        'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmZkRriG5pzevdGvLMh6EVUKkaobTUykw7AhGtTswW35DM&w=3840&q=95',
      editorAddress: 'FxSegd...2358',
      createdWikis: 93,
      editiedWikis: 122,
      lastCreatedWiki: {
        title: 'From Mars',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmZxbkyAGqJt6yUo74QsoKeP6WLWRTn7921Qwxwngxv977&w=3840&q=95',
      },
      latestActivity: 'Apr 11, 2022 - 19:22am',
    },
    {
      editorName: 'Joe Dohn',
      editorAvatar: 'https://bit.ly/dan-abramov',
      editorAddress: '0xFe9d...2358',
      createdWikis: 3,
      editiedWikis: 12,
      lastCreatedWiki: {
        title: 'Sushiswap',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmNqqvGLEyTanEHowse84GtXoqVmZDBDKdA846u3RRaGck&w=3840&q=95',
      },
      latestActivity: 'Jan 6, 2022 - 12:22am',
    },
    {
      editorName: 'Lucy Xander',
      editorAvatar:
        'https://www.the.com/__PUBLIC_LIGHT/assets/RpJA1-grace-headshot.jpg',
      editorAddress: '0xSegd...2358',
      createdWikis: 12,
      editiedWikis: 8,
      lastCreatedWiki: {
        title: 'Flying Jeans',
        img: 'https://alpha.everipedia.org/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmaow6d3nriW4XoaVqTVWsJMr5bME4JFrNsGXDuijMYocZ&w=3840&q=95',
      },
      latestActivity: 'Apr 11, 2022 - 19:22am',
    },
  ]
  return (
    <Flex
      flexDir="column"
      pb={5}
      w="100%"
      my={3}
      border="1px solid #e2e8f0"
      borderRadius="sm"
    >
      <Flex
        borderBottom="1px solid #e2e8f0"
        w="100%"
        p={5}
        gap={2}
        align="center"
      >
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
            w="30%"
            placeholder="Filter"
            icon={<MdFilterList />}
          >
            <option value="option1">Weekly (2020)</option>
            <option value="option1">Monthly (2020)</option>
            <option value="option1">Yearly (2020)</option>
          </Select>
        </Flex>
      </Flex>
      <Flex pb={5}>
        <InsightTableWikiEditors wikiInsightData={wikiInsightData} />
      </Flex>
    </Flex>
  )
}
