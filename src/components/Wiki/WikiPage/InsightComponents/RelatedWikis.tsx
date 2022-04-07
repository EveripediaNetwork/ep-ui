import React, { useEffect } from 'react'
import { BaseCategory, Wiki } from '@/types/Wiki'
import {
  VStack,
  Text,
  HStack,
  Box,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import { getWikisByCategory } from '@/services/wikis'
import { store } from '@/store/store'
import NextLink from 'next/link'
import { WikiTitle } from '@/services/nav-search'
import { WikiImage } from '@/components/WikiImage'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { getWikiSummary } from '@/utils/getWikiSummary'

export const RelatedWikiCard = ({ wiki }: { wiki: WikiTitle }) => {
  const { id, title } = wiki
  return (
    <LinkBox w="100%">
      <HStack
        _hover={{ bgColor: 'dimColor' }}
        borderRadius={4}
        p={3}
        mx={-2}
        align="start"
      >
        <WikiImage
          imageURL={getWikiImageUrl(wiki)}
          h="80px"
          w="80px"
          flexShrink={0}
          borderRadius={4}
          overflow="hidden"
        />
        <Box>
          <NextLink href={`/wiki/${id}`} passHref>
            <LinkOverlay>
              <Text fontSize="16px" fontWeight="500">
                {title}
              </Text>
            </LinkOverlay>
          </NextLink>
          <Text fontSize="13px" mt={0.5} wordBreak="break-word">
            {getWikiSummary(wiki)}
          </Text>
        </Box>
      </HStack>
    </LinkBox>
  )
}
export const RelatedWikis = ({
  categories,
}: {
  categories: BaseCategory[] | undefined
}) => {
  const [wikis, setWikis] = React.useState<Wiki[] | []>([])
  useEffect(() => {
    categories?.forEach(category => {
      store.dispatch(getWikisByCategory.initiate(category.id)).then(res => {
        setWikis(prev => [
          ...prev,
          ...(res?.data?.filter(wiki => {
            return !prev.some(w => w.id === wiki.id)
          }) || []),
        ])
      })
    })
  }, [categories])
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <WikiAccordion mt="-3px" title="Related Articles">
        <VStack align="start">
          {wikis.slice(0, 4).map(wiki => (
            <RelatedWikiCard key={wiki.id} wiki={wiki} />
          ))}
        </VStack>
      </WikiAccordion>
    </VStack>
  )
}
