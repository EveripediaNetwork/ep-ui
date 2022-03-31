import React from 'react'
import {
  Heading,
  HStack,
  Link,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import shortenAccount from '@/utils/shortenAccount'
import { SiIpfs } from 'react-icons/si'
import { WikiImage } from '@/components/WikiImage'
import { WikiTitle } from '@/services/nav-search'
import { BaseCategory } from '@/types/Wiki'
import CustomAvatar from 'boring-avatars'

export const TitleAndImage = ({
  wikiTitle,
  categories,
  lastEdited,
  ipfsHash,
  lastEditor,
  imgSrc,
}: {
  wikiTitle: WikiTitle
  categories: BaseCategory[]
  lastEdited: string | undefined
  ipfsHash: string | undefined
  lastEditor: string | undefined
  imgSrc?: string
}) => {
  const { title } = wikiTitle
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <Heading
        bgColor="wikiCardBg"
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
      <WikiImage bgColor="dimColor" image={imgSrc} w="100%" h="320px" />
      <Table size="sm" variant="simple">
        <Tbody>
          {categories.length !== 0 && (
            <Tr>
              <Td py={1}>Categories</Td>
              <Td py={1}>
                <HStack marginLeft={-2} flexWrap="wrap" justify="start">
                  {categories?.map((category, i) => (
                    <NextLink href={`/categories/${category.id}`} passHref>
                      <Link m="3px !important" href="passRef">
                        <Tag key={i} whiteSpace="nowrap">
                          {category.id}
                        </Tag>
                      </Link>
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
            <Td whiteSpace="nowrap">latest Editor</Td>
            <Td>
              <HStack>
                <CustomAvatar name={lastEditor} size={25} variant="beam" />
                <Link
                  target="_blank"
                  href={`/user/${lastEditor}`}
                  color="blue.400"
                >
                  {shortenAccount(lastEditor || '')}
                </Link>
              </HStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  )
}
