import React from 'react'
import {
  Heading,
  HStack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  Box,
} from '@chakra-ui/react'
import shortenAccount from '@/utils/shortenAccount'
import { SiIpfs } from 'react-icons/si'
import { GoLink } from 'react-icons/go'
import { WikiImage } from '@/components/WikiImage'
import { BaseCategory, WikiPreview } from '@/types/Wiki'
import Link from '@/components/Elements/Link/Link'
import DisplayAvatar from '@/components/Elements/Avatar/Avatar'
import { useENSData } from '@/hooks/useENSData'
import NextLink from 'next/link'
import config from '@/config'

export const WikiDetails = ({
  wikiTitle,
  categories,
  lastEdited,
  ipfsHash,
  txHash,
  lastEditor,
  imgSrc,
}: {
  wikiTitle: WikiPreview
  categories: BaseCategory[]
  lastEdited: string | undefined
  ipfsHash: string | undefined
  txHash: string | undefined
  lastEditor: string | undefined
  imgSrc?: string
}) => {
  const { title, tags } = wikiTitle
  const [, username] = useENSData(lastEditor || '')
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <Heading
        bgColor="wikiTitleBg"
        as="h3"
        fontSize="18px"
        p={3}
        borderRadius={4}
        fontWeight="600"
        w="100%"
        textAlign="center"
      >
        {title}
      </Heading>
      <WikiImage bgColor="dimColor" imageURL={imgSrc} w="100%" h="320px" />
      <Table size="sm" variant="simple">
        <Tbody>
          {categories.length !== 0 && (
            <Tr>
              <Td py={1}>Categories</Td>
              <Td py={1}>
                <HStack marginLeft={-2} flexWrap="wrap" justify="start">
                  {categories?.map((category, i) => (
                    <Link
                      key={i}
                      m="3px !important"
                      href={`/categories/${category.id}`}
                    >
                      <Tag key={i} whiteSpace="nowrap">
                        {category.id}
                      </Tag>
                    </Link>
                  ))}
                </HStack>
              </Td>
            </Tr>
          )}
          {tags.length !== 0 && (
            <Tr>
              <Td py={1}>Tags</Td>
              <Td py={1}>
                <HStack marginLeft={-2} flexWrap="wrap" justify="start">
                  {tags?.map((tag, i) => (
                    <NextLink key={i} href={`/tags/${tag.id}`} passHref>
                      <Box py={1}>
                        <Tag key={i} whiteSpace="nowrap" as="a">
                          {tag.id}
                        </Tag>
                      </Box>
                    </NextLink>
                  ))}
                </HStack>
              </Td>
            </Tr>
          )}
          <Tr>
            <Td>Last Edit</Td>
            <Td>
              {lastEdited
                ? new Date(lastEdited).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '-'}
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack spacing={3}>
                <Text>IPFS</Text>
              </HStack>
            </Td>
            <Td display="flex" align="center" gap={3}>
              <SiIpfs />
              <Link
                target="_blank"
                href={`https://ipfs.everipedia.org/ipfs/${ipfsHash}`}
                color="blue.400"
              >
                {shortenAccount(ipfsHash || '')}
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td>
              <HStack spacing={3}>
                <Text>TX Hash</Text>
              </HStack>
            </Td>
            <Td display="flex" align="center" gap={3}>
              <GoLink />
              <Link
                target="_blank"
                href={`${config.blockExplorerUrl}/tx/${txHash}`}
                color="blue.400"
              >
                {shortenAccount(txHash || '')}
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td whiteSpace="nowrap">latest Editor</Td>
            <Td>
              <HStack>
                <DisplayAvatar address={lastEditor} />
                <Link href={`/account/${lastEditor}`} color="blue.400">
                  {username || shortenAccount(lastEditor || '')}
                </Link>
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  )
}
