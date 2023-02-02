import React from 'react'
import {
  Input,
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { COMMONLY_SEARCHED_WIKIS } from '@/data/GlossaryAlphabetsData'

const GlossaryFilterSection = ({
  searchText,
  searchPage,
  shouldBeFixed,
  setSearchText,
  activeIndex,
  setActiveIndex,
}: {
  searchText: string
  searchPage: (value: string) => void
  shouldBeFixed: boolean
  setSearchText: (value: string) => void
  activeIndex: number | undefined
  setActiveIndex: (value: number) => void
}) => {
  return (
    <>
      <Box w="full" mb={shouldBeFixed ? 5 : 0}>
        <InputGroup size="md" w="full">
          <InputLeftElement
            ml={{ base: '15px', xl: 'unset' }}
            pointerEvents="none"
            h="full"
          >
            <Search2Icon
              color="gray.300"
              fontSize={{ base: 'sm', lg: 'auto' }}
              ml={{ base: '-8', lg: 0 }}
            />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Search for words"
            value={searchText}
            onChange={e => searchPage(e.target.value)}
            _placeholder={{ color: 'placeholderColor' }}
          />
        </InputGroup>
      </Box>
      <Flex
        my="4"
        w="full"
        wrap="wrap"
        alignItems="center"
        justifyContent={{ lg: 'start', '2xl': 'center' }}
        gap={{ base: '3', '2xl': '10' }}
      >
        {COMMONLY_SEARCHED_WIKIS.slice(0, 5)?.map((word, i) => {
          return (
            <Tag
              size="lg"
              key={word}
              bg={i === activeIndex ? 'tagActiveBgColor' : 'transparent'}
              color={i === activeIndex ? 'tagActiveColor' : 'tagColor'}
              cursor="pointer"
              borderRadius="full"
              borderWidth="thin"
              fontWeight="normal"
              fontSize={{ base: 'sm', lg: 'md' }}
              _hover={{
                bgColor: 'tagHoverColor',
              }}
              onClick={() => {
                setActiveIndex(i)
                setSearchText(word)
                searchPage(word)
              }}
            >
              <TagLabel>{word}</TagLabel>
            </Tag>
          )
        })}
      </Flex>
    </>
  )
}

export default GlossaryFilterSection
