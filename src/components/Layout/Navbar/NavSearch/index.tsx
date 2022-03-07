import React, { useState } from 'react'
import {
  Center,
  Flex,
  InputGroup,
  InputLeftElement,
  Spinner,
  chakra,
  Button,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteGroupTitle,
} from '@choc-ui/chakra-autocomplete'
import { SAMPLE_ARTICLES } from '@/components/Layout/Navbar/NavSearch/utils'

export const NavSearch = () => {
  const [isLoading, setIsLoading] = useState(false)

  const countries = [
    'nigeria',
    'japan',
    'india',
    'united states',
    'south korea',
  ]

  const emptyState = (
    <Flex direction="column" gap="6" align="center" justify="center" py="16">
      <chakra.span fontWeight="semibold">No search Results</chakra.span>
      <Button
        variant="outline"
        px="10"
        w="fit-content"
        fontWeight="semibold"
        fontSize="xs"
      >
        Create New Wiki
      </Button>
    </Flex>
  )

  const loadingView = (
    <Center py="9">
      <Spinner color="#63B3ED" />
    </Center>
  )

  const searchList = (
    <>
      wow
      <AutoCompleteGroup showDivider>
        <AutoCompleteGroupTitle textTransform="capitalize">
          Countries
        </AutoCompleteGroupTitle>
        {countries.map(country => (
          <AutoCompleteItem
            key={country}
            value={{ short: country.charAt(0), name: country }}
            // getValue={art => art.title}
            textTransform="capitalize"
          />
        ))}
      </AutoCompleteGroup>
      <AutoCompleteGroup showDivider>
        <AutoCompleteGroupTitle textTransform="capitalize">
          Articles
        </AutoCompleteGroupTitle>
        {SAMPLE_ARTICLES.map(article => (
          <AutoCompleteItem
            key={article.id}
            value={article}
            getValue={art => art.title}
            label="wow"
            textTransform="capitalize"
          >
            {article.title}
          </AutoCompleteItem>
        ))}
      </AutoCompleteGroup>
    </>
  )

  return (
    <AutoComplete openOnFocus emptyState={!isLoading && emptyState}>
      <InputGroup
        size="lg"
        maxW="800px"
        display={{ base: 'none', sm: 'none', md: 'block' }}
      >
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <AutoCompleteInput placeholder="Search items, collections and accounts" />
      </InputGroup>

      <AutoCompleteList pb="0" shadow="lg">
        {isLoading ? loadingView : searchList}

        <Flex
          color="whiteAlpha.600"
          fontSize="xs"
          pl="3.5"
          py="5"
          borderTopWidth={1}
        >
          Press ‘Enter’ to reveal search results
        </Flex>
      </AutoCompleteList>
    </AutoComplete>
  )
}
