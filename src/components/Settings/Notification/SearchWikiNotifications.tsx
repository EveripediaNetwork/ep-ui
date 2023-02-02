import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import {
  Center,
  Flex,
  InputGroup,
  Spinner,
  chakra,
  Button,
  Text,
  useEventListener,
  useToast,
  Icon,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete'
import {
  fillType,
  SearchItem,
  SEARCH_TYPES,
  useNavSearch,
} from '@/services/search/utils'
import { LinkButton } from '@/components/Elements'
import { logEvent } from '@/utils/googleAnalytics'
import config from '@/config'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { WikiImage } from '@/components/WikiImage'
import {
  RemoveWikiSubscriptionHandler,
  SubscribeWikiHandler,
} from '@/components/Notification/NotificationCard'
import { useIsWikiSubscribed } from '@/services/notification/utils'
import { useUserProfileData } from '@/services/profile/utils'
import { ActivityCardDetails } from '@everipedia/iq-utils'
import { RiAddLine, RiSubtractLine } from 'react-icons/ri'
import { getUserAddressFromCache } from '@/utils/DataFetching/getUserAddressFromCache'
import {
  getWikiSummary,
  WikiSummarySize,
} from '@/utils/DataFetching/getWikiSummary'

const ItemPaths = {
  [SEARCH_TYPES.WIKI]: '/wiki/',
  [SEARCH_TYPES.CATEGORY]: '/categories/',
  [SEARCH_TYPES.ACCOUNT]: '/account/',
}

const ARTICLES_LIMIT = 6

const WikiSubscriptionButton = ({
  wiki,
  email,
}: {
  wiki: ActivityCardDetails
  email?: string | null
}) => {
  const toast = useToast()
  const userAddress = getUserAddressFromCache()
  const isWikiSubscribed = useIsWikiSubscribed(wiki.id, userAddress)
  if (!isWikiSubscribed)
    return (
      <Button
        variant="outline"
        fontSize="sm"
        w={{ base: 8, md: 'initial' }}
        h={{ base: 10 }}
        display={{ base: 'flex', md: 'inline-flex' }}
        alignItems={{ base: 'center' }}
        justifyContent={{ base: 'center' }}
        fontWeight={500}
        onClick={e => {
          e.stopPropagation()
          SubscribeWikiHandler(email, wiki, userAddress, toast)
        }}
      >
        <Text display={{ base: 'none', md: 'block' }}>Add</Text>
        <Icon
          as={RiAddLine}
          w={6}
          h={6}
          display={{ base: 'block', md: 'none' }}
          fill="NotificationRemoveIcon"
        />
      </Button>
    )
  return (
    <Button
      variant="outline"
      fontSize="sm"
      w={{ base: 8, md: 'initial' }}
      h={{ base: 10 }}
      display={{ base: 'flex', md: 'inline-flex' }}
      alignItems={{ base: 'center' }}
      justifyContent={{ base: 'center' }}
      fontWeight={500}
      onClick={e => {
        e.stopPropagation()
        RemoveWikiSubscriptionHandler(email, wiki.id, userAddress, toast)
      }}
    >
      <Text display={{ base: 'none', md: 'block' }}>Remove</Text>
      <Icon
        as={RiSubtractLine}
        w={6}
        h={6}
        display={{ base: 'block', md: 'none' }}
        fill="NotificationRemoveIcon"
      />
    </Button>
  )
}

const SearchWikiNotifications = () => {
  const { query, setQuery, isLoading, results } = useNavSearch()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const { profileData } = useUserProfileData(getUserAddressFromCache(), {
    withAllSettings: true,
  })
  const router = useRouter()

  const noResults = results.wikis.length === 0
  const unrenderedWikis = results.wikis.length - ARTICLES_LIMIT
  const totalUnrenderedWikis = unrenderedWikis > 0 ? unrenderedWikis : 0

  useEventListener('keydown', event => {
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator?.userAgent)
    const hotkey = isMac ? 'metaKey' : 'ctrlKey'
    const el = event.target as Element | undefined
    const interactiveElementIsFocused =
      el?.closest('input, [contenteditable=true], [role="dialog"]') !== null
    if (
      ((event.key && event.key.toLowerCase() === 'k' && event[hotkey]) ||
        event.key === '/') &&
      !interactiveElementIsFocused
    ) {
      event.preventDefault()
      inputRef.current?.focus()
    }
  })

  const emptyState = (
    <Flex direction="column" gap="6" align="center" justify="center" py="16">
      <chakra.span fontWeight="semibold">No search Results</chakra.span>
      <LinkButton
        variant="outline"
        px="10"
        w="fit-content"
        fontWeight="semibold"
        fontSize="xs"
        href="/create-wiki"
      >
        Create New Wiki
      </LinkButton>
    </Flex>
  )

  const articlesSearchList = results.wikis
    .slice(0, ARTICLES_LIMIT)
    .map(wiki => {
      const articleImage = `${config.pinataBaseUrl}${
        wiki.images && wiki.images[0].id
      }`
      const value = fillType(wiki, SEARCH_TYPES.WIKI)
      return (
        <AutoCompleteItem
          key={wiki.id}
          value={value}
          getValue={art => art.title}
          label={wiki.title}
          m={0}
          rounded="none"
          px={4}
          py={2}
          gap="2.5"
          borderBottomWidth={1}
          _last={{
            borderBottomWidth: 0,
          }}
        >
          <WikiImage
            src={articleImage}
            alt={wiki.title}
            imgBoxSize={40 * WIKI_IMAGE_ASPECT_RATIO}
            flexShrink={0}
            borderRadius={5}
            overflow="hidden"
          />
          <Flex flexGrow="1" w={{ lg: '100%' }} justifyContent="space-between">
            <Flex direction="column" flexGrow="1">
              <Text noOfLines={1} fontWeight="semibold" fontSize="sm">
                {wiki.title}
              </Text>
              <Text
                display="-webkit-box"
                noOfLines={1}
                textOverflow="ellipsis"
                overflow="hidden"
                maxW="full"
                fontSize="xs"
              >
                {getWikiSummary(wiki, WikiSummarySize.Huge)}
              </Text>
            </Flex>
            <Flex ml="2">
              <WikiSubscriptionButton wiki={wiki} email={profileData?.email} />
            </Flex>
          </Flex>
        </AutoCompleteItem>
      )
    })

  return (
    <Flex
      maxW={{ base: 'full', md: '4xl', '2xl': 'calc(100% - 160px)' }}
      pos="relative"
    >
      <AutoComplete
        closeOnSelect={false}
        disableFilter
        suggestWhenEmpty
        emptyState={!isLoading && noResults && emptyState}
        openOnFocus={query.length >= 3}
        shouldRenderSuggestions={q => q.length >= 3}
        onSelectOption={option => {
          const { id, type } = option.item.originalValue
          router.push(ItemPaths[type as SearchItem] + id)
          logEvent({
            action: 'CLICK_BY_SEARCH',
            label: ItemPaths[type as SearchItem] + id,
            value: 1,
            category: 'search_tags',
          })
        }}
      >
        <form
          key={JSON.stringify(router.query.q) || ''}
          action=""
          onSubmit={e => {
            e.preventDefault()
            router.push({
              pathname: '/account/settings',
              query: { tab: 'notifications', q: query },
            })
          }}
        >
          <InputGroup>
            <Flex
              borderWidth="1px"
              borderLeftRadius="8"
              borderColor="searchBorder"
              w="full"
              borderRight="none"
              pos="relative"
            >
              <Flex alignItems="center" justifyContent="center" pl="4">
                <Search2Icon color="gray.300" />
              </Flex>
              <AutoCompleteInput
                pl="2.5"
                placeholder="Search to add wikis to your list"
                variant="unstyled"
                value={query || router.query.q}
                onChange={e => {
                  setQuery(() => {
                    return e.target.value
                  })
                  if (!e.target.value) {
                    router.push({
                      pathname: '/account/settings',
                      query: { tab: 'notifications' },
                    })
                  }
                }}
                _placeholderShown={{
                  textOverflow: 'ellipsis',
                }}
                ref={inputRef}
                fontSize={{ base: '12', md: '16' }}
              />
              <AutoCompleteList
                p="0"
                maxH="auto"
                borderWidth="1px"
                borderColor="searchBorder"
                shadow="lg"
                borderStyle="solid"
                w={{ base: 'calc(100% + 110px)', md: 'full' }}
                left="0"
                top="12"
              >
                {isLoading ? (
                  <Center py="9">
                    <Spinner color="#63B3ED" />
                  </Center>
                ) : (
                  <AutoCompleteGroup>{articlesSearchList}</AutoCompleteGroup>
                )}
                {totalUnrenderedWikis > 0 && !isLoading && (
                  <Flex
                    _dark={{ color: 'whiteAlpha.600' }}
                    py="5"
                    justify="center"
                  >
                    <LinkButton
                      href={`/account/settings?tab=notifications&q=${query}`}
                      variant="outline"
                    >
                      +View {totalUnrenderedWikis} more Results
                    </LinkButton>
                  </Flex>
                )}
              </AutoCompleteList>
            </Flex>
            <Button
              type="submit"
              fontSize={{ base: '12', md: '14' }}
              fontWeight={600}
              colorScheme="brandLinkColor"
              size="lg"
              borderLeftRadius="0"
              borderRightRadius="8"
            >
              Search
            </Button>
          </InputGroup>
        </form>
      </AutoComplete>
    </Flex>
  )
}

export default SearchWikiNotifications
