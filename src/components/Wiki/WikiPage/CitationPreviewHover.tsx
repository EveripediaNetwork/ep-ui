/* eslint-disable react-hooks/rules-of-hooks */
import { useGetActivityByIdQuery } from '@/services/activities'
import { useGetWikiQuery } from '@/services/wikis'
import { CiteReference, CommonMetaIds, Wiki } from '@/types/Wiki'
import { getWikiMetadataById } from '@/utils/getWikiFields'
import {
  HStack,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Tag,
  Text,
} from '@chakra-ui/react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useRouter } from 'next/router'
import React from 'react'

const CitationPreviewHover = ({
  text,
  href,
  id,
}: {
  text: string
  href?: string
  id?: string
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()
  const { slug } = router.query
  let wiki: Wiki | undefined

  if (slug) {
    const { data: wikiData } = useGetWikiQuery(
      typeof slug === 'string' ? slug : skipToken,
      {
        skip: router.isFallback,
      },
    )
    wiki = wikiData
  } else if (router.asPath.includes('/revision/')) {
    const revisionId = router.asPath.replace('/revision/', '')
    const { data: revisionData } = useGetActivityByIdQuery(
      typeof revisionId === 'string' ? revisionId : skipToken,
      {
        skip: router.isFallback,
      },
    )
    wiki = revisionData?.content[0]
  }

  if (!wiki)
    return (
      <Link as="sup" href={href}>{text}</Link>
    )

  const referencesString = getWikiMetadataById(
    wiki,
    CommonMetaIds.REFERENCES,
  )?.value
  const references = referencesString ? JSON.parse(referencesString) : []
  const ref = references.find(
    (r: CiteReference) => r.id === id?.split('#cite-id-')[1],
  )

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      returnFocusOnClose={false}
      aria-label="Wiki preview"
    >
      <PopoverTrigger>
        <Link
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={() => setIsOpen(false)}
          onFocus={() => {}}
          onBlur={() => {}}
          href={href}
        >
          <sup>{text}</sup>
        </Link>
      </PopoverTrigger>
      {ref && (
        <PopoverContent
          boxShadow="rgb(4 17 29 / 25%) 0px 0px 8px 0px"
          _focus={{ outline: 'none' }}
          mx={4}
        >
          <PopoverArrow />
          <PopoverBody>
            <HStack
              pb={2}
              mb={2}
              borderBottomWidth="1px"
              justify="space-between"
            >
              <Tag colorScheme="blue" size="sm" fontWeight="medium">
                <Link
                  color="#304262 !important"
                  _dark={{
                    color: '#9dcbf0 !important',
                  }}
                  fontSize="sm"
                  p="0 0 0 0 !important"
                  href={ref.url}
                >
                  {new URL(ref.url).hostname}
                </Link>
              </Tag>
              {ref.timestamp && (
                <Text m="2px !important" opacity={0.6} fontSize="sm">
                  {new Date(ref.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              )}
            </HStack>
            <Text m="2px !important">{ref.description}</Text>
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  )
}

export default CitationPreviewHover
