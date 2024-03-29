import React from 'react'
import { WikiPreview } from '@everipedia/iq-utils'
import { VStack, Text, HStack, Box, LinkBox } from '@chakra-ui/react'
import WikiAccordion from '@/components/Wiki/WikiAccordion'
import { WikiImage } from '@/components/WikiImage'
import LinkOverlay from '@/components/Elements/LinkElements/LinkOverlay'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import {
  getWikiSummary,
  WikiSummarySize,
} from '@/utils/WikiUtils/getWikiSummary'
import { useGetWikiPreviewsByCategoryQuery } from '@/services/wikis'
import { useTranslation } from 'next-i18next'

export const RelatedWikiCard = ({ wiki }: { wiki: WikiPreview }) => {
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
          imageURL={getWikiImageUrl(wiki.images)}
          h="80px"
          w="80px"
          flexShrink={0}
          borderRadius={4}
          overflow="hidden"
          alt={wiki.title}
        />
        <Box>
          <LinkOverlay href={`/wiki/${id}`}>
            <Text fontSize="16px" wordBreak="break-word" fontWeight="500">
              {title}
            </Text>
          </LinkOverlay>
          <Text fontSize="13px" mt={0.5} wordBreak="break-word">
            {getWikiSummary(wiki, WikiSummarySize.Small)}
          </Text>
        </Box>
      </HStack>
    </LinkBox>
  )
}
export const RelatedWikis = ({
  wikiId,
  category,
}: {
  wikiId: string
  category: string
}) => {
  const { t } = useTranslation('wiki')
  const { data } = useGetWikiPreviewsByCategoryQuery({
    category: category,
    limit: 6,
  })

  const relatedWikis = data?.filter((w) => w.id !== wikiId)?.slice(0, 4)
  if (!relatedWikis) return null
  return (
    <VStack w="100%" spacing={4} borderRadius={2} mb="5">
      <WikiAccordion mt="-3px" title={t('relatedArticles')}>
        <VStack align="start" w="100%">
          {relatedWikis.map((wiki) => (
            <RelatedWikiCard key={wiki.id} wiki={wiki} />
          ))}
        </VStack>
      </WikiAccordion>
    </VStack>
  )
}
