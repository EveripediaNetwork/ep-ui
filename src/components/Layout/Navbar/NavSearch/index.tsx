import React, { useState } from 'react'
import {
  Center,
  Flex,
  InputGroup,
  InputLeftElement,
  Spinner,
  chakra,
  Button,
  HTMLChakraProps,
  Avatar,
  Text,
  Stack,
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
import {
  SAMPLE_ARTICLES,
  SAMPLE_CATEGORIES,
  SAMPLE_PROFILES,
} from '@/components/Layout/Navbar/NavSearch/utils'

export const NavSearch = () => {
  const [isLoading, setIsLoading] = useState(false)

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

  const titleStyles: HTMLChakraProps<'div'> = {
    fontWeight: 'normal',
    fontSize: 'md',
    textTransform: 'capitalize',
    p: 4,
    m: 0,
  }

  const generalItemStyles: HTMLChakraProps<'div'> = {
    m: 0,
    rounded: 'none',
    px: 4,
    py: 2,
  }

  const articlesSearchList = (
    <AutoCompleteGroup>
      <AutoCompleteGroupTitle {...titleStyles}>Articles</AutoCompleteGroupTitle>
      {SAMPLE_ARTICLES.map(article => (
        <AutoCompleteItem
          key={article.id}
          value={article}
          getValue={art => art.title}
          label={article.title}
          {...generalItemStyles}
          gap="2.5"
        >
          <Avatar src={article.image} name={article.title} size="xs" />
          <Stack border="solid 1px red">
            <chakra.span fontWeight="semibold" fontSize="sm">
              {article.title}
            </chakra.span>
            <Text isTruncated maxW="full">
              {article.description}
            </Text>
          </Stack>
        </AutoCompleteItem>
      ))}
    </AutoCompleteGroup>
  )

  const cateoriesSearchList = (
    <AutoCompleteGroup>
      <AutoCompleteGroupTitle {...titleStyles}>
        Categories
      </AutoCompleteGroupTitle>
      {SAMPLE_CATEGORIES.map(category => (
        <AutoCompleteItem
          key={category.id}
          value={category}
          getValue={art => art.title}
          label={category.title}
          {...generalItemStyles}
        >
          {category.title}
        </AutoCompleteItem>
      ))}
    </AutoCompleteGroup>
  )

  const profilesSearchList = (
    <AutoCompleteGroup>
      <AutoCompleteGroupTitle {...titleStyles}>Profiles</AutoCompleteGroupTitle>
      {SAMPLE_PROFILES.map(profile => (
        <AutoCompleteItem
          key={profile.id}
          value={profile}
          getValue={art => art.name}
          label={profile.name}
          {...generalItemStyles}
        >
          {profile.name}
        </AutoCompleteItem>
      ))}
    </AutoCompleteGroup>
  )

  const searchList = (
    <>
      {articlesSearchList}
      {cateoriesSearchList}
      {profilesSearchList}
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

      <AutoCompleteList p="0" shadow="lg">
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
