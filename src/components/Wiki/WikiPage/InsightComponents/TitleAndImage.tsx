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
import { Image } from '@/components/Elements/Image/Image'
import { BaseCategory } from '@/types/Wiki'
import NextLink from 'next/link'
import shortenAccount from '@/utils/shortenAccount'
import { SiIpfs } from 'react-icons/si'

export const TitleAndImage = ({
  title,
  categories,
  lastEdited,
}: {
  title: string | undefined
  categories: BaseCategory[] | undefined
  lastEdited: string | undefined
}) => {
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
      <Image
        src={`https://picsum.photos/seed/${Buffer.from(
          title || 'sample',
          'base64',
        )}/400/400`}
        w="100%"
        h="320px"
      />
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Td py={0}>Categories</Td>
            <Td py={0}>
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
                href="https://ipfs.everipedia.org/ipfs/QmXacPjgKBnpPgBsCdnavjqfndvfjnGG8UrQGt85r2XEXh"
                color="blue.400"
              >
                {shortenAccount(
                  'QmXacPjgKBnpPgBsCdnavjqfndvfjnGG8UrQGt85r2XEXh',
                )}
              </Link>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  )
}
