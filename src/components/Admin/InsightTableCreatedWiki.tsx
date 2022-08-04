import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  AspectRatio,
  Icon,
  Tag,
  TagLabel,
} from '@chakra-ui/react'
import React from 'react'
import {
  RiArrowDropDownLine,
  RiArrowDownLine,
  RiQuestionLine,
} from 'react-icons/ri'
import { WikiImage } from '../WikiImage'

interface WikiCreatedInsightDataInterface {
  Wiki: { title: string; img: string }
  editorAddress: string
  DateTime: string
  Tags: string[]
  status: string
  statusDropdown: string[]
  promoted: boolean
}

type InsightTableWikiCreatedProps = {
  wikiCreatedInsightData: WikiCreatedInsightDataInterface[]
}

export const InsightTableWikiCreated = (
  props: InsightTableWikiCreatedProps,
) => {
  const { wikiCreatedInsightData } = props

  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="#2d3748" color="">
          <Tr>
            <Th textTransform="none" fontWeight="semibold">
              Wiki Title
            </Th>
            <Th textTransform="none" fontWeight="normal">
              Date/Time
            </Th>
            <Th textTransform="none" fontWeight="medium">
              Tags
            </Th>
            <Th textTransform="none" fontWeight="medium">
              Status
              <Icon
                fontSize="10px"
                cursor="pointer"
                color="#718096"
                as={RiArrowDownLine}
              />
            </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {wikiCreatedInsightData.map(item => {
            return (
              <>
                <Tr>
                  <Td>
                    <Flex flexDir="row" align="center" gap={2}>
                      <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO} w="50px">
                        <WikiImage
                          cursor="pointer"
                          flexShrink={0}
                          imageURL={item.Wiki.img}
                        />
                      </AspectRatio>
                      <Flex flexDirection="column">
                        <Text>{item.Wiki.title}</Text>
                        <Text color="#718096" fontSize="sm">
                          {item.editorAddress}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    <Text color="#718096">{item.DateTime}</Text>
                  </Td>
                  <Td>
                    <Flex w="100%" p={5} gap={2} align="center">
                      {item.Tags.map((tag, i) => (
                        <Tag
                          key={i}
                          size="sm"
                          borderRadius="full"
                          variant="solid"
                          bg="#FFE5F1"
                          color="#FF5CAA"
                        >
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Tag
                      size="sm"
                      borderRadius="full"
                      variant="solid"
                      bg="#FFE5F1"
                      color="#FF5CAA"
                    >
                      <TagLabel>{item.status}</TagLabel>
                    </Tag>
                  </Td>
                  <Td>
                    <Flex w="100%" p={5} gap={2} align="center">
                      <Text color="#718096" cursor="pointer">
                        {item.statusDropdown[0]}
                        <Icon
                          fontSize="20px"
                          cursor="pointer"
                          color="#718096"
                          as={RiArrowDropDownLine}
                        />
                      </Text>
                      {!item.promoted ? (
                        <Text color="#FF5CAA" cursor="pointer">
                          Promoted
                        </Text>
                      ) : (
                        <Text color="#718096" cursor="pointer">
                          Promote
                          <Icon
                            fontSize="20px"
                            cursor="pointer"
                            color="#718096"
                            as={RiQuestionLine}
                          />
                        </Text>
                      )}
                    </Flex>
                  </Td>
                </Tr>
              </>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
