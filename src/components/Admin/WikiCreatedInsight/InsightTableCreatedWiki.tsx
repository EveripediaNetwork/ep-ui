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
  HStack,
} from '@chakra-ui/react'
import React from 'react'
import {
  RiArrowDropDownLine,
  RiArrowDownLine,
  RiQuestionLine,
} from 'react-icons/ri'
import { BsDot } from 'react-icons/bs'
import { WikiImage } from '../../WikiImage'

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

  const bgTags = [
    {
      bg: '#F9F5FF',
      color: '#FE6FB5',
    },
    {
      bg: '#EBF8FF',
      color: '#385C8A',
    },
  ]
  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="#F7FAFC">
          <Tr>
            <Th color="#718096" textTransform="none" fontWeight="medium">
              Wiki Title
            </Th>
            <Th color="#718096" textTransform="none" fontWeight="medium">
              Date/Time
            </Th>
            <Th color="#718096" textTransform="none" fontWeight="medium">
              Tags
            </Th>
            <Th color="#718096" textTransform="none" fontWeight="medium">
              <HStack spacing={3}>
                <Text>Status</Text>
                <Icon
                  fontSize="10px"
                  cursor="pointer"
                  color="#718096"
                  as={RiArrowDownLine}
                />
              </HStack>
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
                    <Flex w="100%" p={5} gap={3} align="center">
                      {item.Tags.map((tag, i) => (
                        <Tag
                          key={i}
                          size="md"
                          borderRadius="full"
                          variant="solid"
                          bg={bgTags[i].bg}
                          color={bgTags[i].color}
                        >
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      color={item.status === 'Active' ? '#38A169' : '#DD6B20'}
                      bg={item.status === 'Active' ? '#F0FFF4' : '#FFF5F5'}
                      px="2"
                    >
                      <HStack spacing={2}>
                        <Icon
                          fontSize="20px"
                          cursor="pointer"
                          color={
                            item.status === 'Active' ? '#38A169' : '#DD6B20'
                          }
                          as={BsDot}
                        />
                        <TagLabel>{item.status}</TagLabel>
                      </HStack>
                    </Tag>
                  </Td>
                  <Td>
                    <Flex w="100%" p={5} gap={2} align="center">
                      <HStack spacing={2}>
                        <Text
                          color="#718096"
                          cursor="pointer"
                          fontWeight="semibold"
                        >
                          {item.statusDropdown[0]}
                        </Text>
                        <Icon
                          fontSize="20px"
                          cursor="pointer"
                          color="#718096"
                          as={RiArrowDropDownLine}
                        />
                      </HStack>
                      {!item.promoted ? (
                        <Text
                          color="#FF5CAA"
                          cursor="pointer"
                          fontWeight="semibold"
                        >
                          Promoted
                        </Text>
                      ) : (
                        <HStack spacing={2}>
                          <Text color="#E2E8F0" cursor="pointer">
                            Promote
                          </Text>
                          <Icon
                            fontSize="20px"
                            cursor="pointer"
                            color="#718096"
                            as={RiQuestionLine}
                          />
                        </HStack>
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
