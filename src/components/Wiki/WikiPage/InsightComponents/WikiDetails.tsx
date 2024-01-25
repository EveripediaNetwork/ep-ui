import React from 'react'
import {
  HStack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  TableContainer,
  VStack,
  AspectRatio,
  Wrap,
  Box,
  Stack,
  Tooltip,
} from '@chakra-ui/react'
import { shortenAccount } from '@/utils/textUtils'
import { SiIpfs } from 'react-icons/si'
import { GoLink } from 'react-icons/go'
import { WikiImage } from '@/components/WikiImage'
import { BaseCategory, WikiPreview } from '@everipedia/iq-utils'
import Link from '@/components/Elements/LinkElements/Link'
import config from '@/config'

import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { useTranslation } from 'next-i18next'

export const WikiDetails = ({
  wikiTitle,
  categories,
  ipfsHash,
  txHash,
  imgSrc,
  views,
}: {
  wikiTitle: WikiPreview
  categories: BaseCategory[]
  ipfsHash?: string
  txHash?: string
  imgSrc?: string
  views: number | undefined
}) => {
  const { title, tags, id: wikiId } = wikiTitle
  const wikiViews = views !== undefined && views > 250 ? views : undefined
  const { t } = useTranslation('wiki')
  return (
    <Box
      borderWidth="1px"
      p={2}
      borderRadius={8}
      w="full"
      borderColor="rankingListBorder"
    >
      <Stack
        direction={{ base: 'column', lg: 'row', xl: 'column' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={4}
        w="full"
      >
        <AspectRatio
          mx="auto"
          w="100%"
          // ml="0 !important"
          maxW="700"
          ratio={WIKI_IMAGE_ASPECT_RATIO}
        >
          <WikiImage
            bgColor="dimColor"
            priority
            imageURL={imgSrc}
            sizes="(max-width: 600px) 100vw, 400px"
            alt={title}
          />
        </AspectRatio>
        <VStack
          maxW={{ base: 'unset', md: 'unset', lg: 'unset' }}
          w="100%"
          spacing={4}
          mx="auto"
        >
          <TableContainer w="full">
            <Table size="sm" variant="simple">
              <Tbody>
                {categories.length !== 0 && (
                  <Tr>
                    <Td
                      w={{ base: 'unset', sm: '10%', xl: 'unset' }}
                      pt={1}
                      pb={3}
                    >
                      {t('categories')}
                    </Td>
                    <Td ml="auto" flex={1} pt={1} pb={3}>
                      <HStack flexWrap="wrap" justify="start">
                        {categories?.map((category, i) => (
                          <Link
                            key={i}
                            href={`/categories/${category.id}`}
                            color="brandLinkColor"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </HStack>
                    </Td>
                  </Tr>
                )}
                {tags.length !== 0 && (
                  <Tr>
                    <Td py={1}>{t('tags')}</Td>
                    <Td py={1}>
                      <Wrap marginLeft={-2} spacing={1}>
                        {tags?.map((tag, i) => (
                          <Link key={i} href={`/tags/${tag.id}`} py={1}>
                            <Tag whiteSpace="nowrap">{tag.id}</Tag>
                          </Link>
                        ))}
                      </Wrap>
                    </Td>
                  </Tr>
                )}
                <Tr>
                  <Td>
                    <Text>Network</Text>
                  </Td>
                  <Td display="flex" align="center">
                    <HStack spacing={4}>
                      <HStack spacing={2}>
                        <Tooltip label="IPFS" fontSize="xs">
                          <span>
                            <SiIpfs />
                          </span>
                        </Tooltip>
                        <Link
                          target="_blank"
                          href={`https://ipfs.everipedia.org/ipfs/${ipfsHash}`}
                          color="brandLinkColor"
                        >
                          <Text>{shortenAccount(ipfsHash ?? '')}</Text>
                        </Link>
                      </HStack>
                      <HStack spacing={2}>
                        <Tooltip label="Txn" fontSize="xs">
                          <span>
                            <GoLink />
                          </span>
                        </Tooltip>
                        <Link
                          target="_blank"
                          href={`${config.blockExplorerUrl}/tx/${txHash}`}
                          color="brandLinkColor"
                        >
                          <Text>{shortenAccount(txHash ?? '')}</Text>
                        </Link>
                      </HStack>
                    </HStack>
                  </Td>
                </Tr>

                <Tr>
                  <Td>
                    <HStack spacing={3} py="2">
                      <Text>{t('events')}</Text>
                    </HStack>
                  </Td>
                  <Td display="flex" align="center" gap={3}>
                    <HStack py="2">
                      <Link
                        href={`/wiki/${wikiId}/events`}
                        color="brandLinkColor"
                      >
                        <Text>{t('viewTimelineOfEvents')}</Text>
                      </Link>
                    </HStack>
                  </Td>
                </Tr>
                {wikiViews && (
                  <Tr>
                    <Td whiteSpace="nowrap">
                      <Text py="2">{t('views')}</Text>
                    </Td>
                    <Td>
                      <Text py="2">{views?.toLocaleString('en-US')}</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Stack>
    </Box>
  )
}
