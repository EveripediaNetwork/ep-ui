import React from 'react'
import {
  Heading,
  HStack,
  Table,
  Tag,
  Tbody,
  Td,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { BaseCategory } from '@/types/Wiki'

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
        src={`https://picsum.photos/seed/${title}/400/400`}
        w="100%"
        h="320px"
      />
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Td py={0}>Categories</Td>
            <Td py={0}>
              <HStack marginLeft={-2} flexWrap="wrap" justify="start">
                {categories?.map(category => (
                  <Tag m="3px !important" whiteSpace="nowrap">
                    {category.id}
                  </Tag>
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
        </Tbody>
      </Table>
    </VStack>
  )
}
