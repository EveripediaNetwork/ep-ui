import React, { useEffect, useState } from 'react'
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

export type NavSearchProps = {
  inputGroupProps?: HTMLChakraProps<'div'>
  inputProps?: HTMLChakraProps<'div'>
}

export const NavSearch = (props: NavSearchProps) => {
  const { inputGroupProps, inputProps } = props
  const [isLoading, setIsLoading] = useState(true)

  const fetchList = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    fetchList()
  }, [])

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
    gap: '2.5',
    borderY: '1px',
    borderColor: 'inherit',
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
        >
          <Avatar src={article.image} name={article.title} size="xs" />
          <Flex direction="column">
            <chakra.span fontWeight="semibold" fontSize="sm">
              {article.title}
            </chakra.span>
            <Text noOfLines={1} maxW="full" fontSize="xs">
              {article.description}
            </Text>
          </Flex>
          <chakra.div
            fontWeight="medium"
            fontSize="xs"
            alignSelf="center"
            px="2"
            borderWidth={1}
            rounded="md"
            _dark={{
              bg: 'gray.800',
            }}
            ml="auto"
          >
            {article.tag}
          </chakra.div>
          <chakra.span alignSelf="center" fontSize="xs" whiteSpace="nowrap">
            {article.views} views
          </chakra.span>
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
          <Avatar src={category.image} name={category.title} size="xs" />
          <chakra.span fontWeight="semibold" fontSize="sm">
            {category.title}
          </chakra.span>
          <chakra.div
            fontWeight="medium"
            fontSize="xs"
            alignSelf="center"
            px="2"
            borderWidth={1}
            rounded="md"
            _dark={{
              bg: 'gray.800',
            }}
            ml="auto"
          >
            {category.tag}
          </chakra.div>
          <chakra.span alignSelf="center" fontSize="xs" whiteSpace="nowrap">
            {category.views} views
          </chakra.span>
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
          <Avatar src={profile.image} name={profile.name} size="xs" />
          <Flex direction="column">
            <chakra.span fontWeight="semibold" fontSize="sm">
              {profile.name}
            </chakra.span>
            <Text noOfLines={2} maxW="full" fontSize="xs">
              {profile.bio}
            </Text>
          </Flex>
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
    <AutoComplete
      openOnFocus
      suggestWhenEmpty
      emptyState={!isLoading && emptyState}
    >
      <InputGroup
        size="lg"
        maxW="800px"
        display={{ base: 'none', sm: 'none', md: 'block' }}
        {...inputGroupProps}
      >
        <InputLeftElement pointerEvents="none" h="full">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <AutoCompleteInput
          placeholder="Search items, collections and accounts"
          {...inputProps}
        />
      </InputGroup>

      <AutoCompleteList p="0" shadow="lg" minW="lg">
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
