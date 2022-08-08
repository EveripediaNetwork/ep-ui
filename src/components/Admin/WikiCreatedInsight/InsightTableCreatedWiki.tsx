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
import config from '@/config'
import React from 'react'
import  shortenAccount  from '@/utils/shortenAccount'
import { shortenText }  from '@/utils/shortenText'
import {
  RiArrowDropDownLine,
  RiArrowDownLine,
  RiQuestionLine,
} from 'react-icons/ri'
import { BsDot } from 'react-icons/bs'
import { WikiImage } from '../../WikiImage'
import { Wikis } from '@/types/admin'



type InsightTableWikiCreatedProps = {
  wikiCreatedInsightData: Wikis[]
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
                          imageURL={`${config.pinataBaseUrl}${item.images? item.images[0].id : ''}  `}
                        />
                      </AspectRatio>
                      <Flex flexDirection="column">
                        <Text>{shortenText(item.title, 20)}</Text>
                        <Text color="#718096" fontSize="sm">
                          {item.author.profile?.username? item.author.profile.username : shortenAccount(item.author.id? item.author.id : '' ) }
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    <Text color="#718096">{item.created}</Text>
                  </Td>
                  <Td>
                    <Flex w="100%" p={5} gap={3} align="center">
                      {item.tags.map((tag, i) => (
                        <Tag
                          key={i}
                          size="md"
                          borderRadius="full"
                          variant="solid"
                          bg={bgTags[i].bg}
                          color={bgTags[i].color}
                        >
                          <TagLabel>{tag.id}</TagLabel>
                        </Tag>
                      ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      color={item.hidden ? '#38A169' : '#DD6B20'}
                      bg={item.hidden ? '#F0FFF4' : '#FFF5F5'}
                      px="2"
                    >
                      <HStack spacing={2}>
                        <Icon
                          fontSize="20px"
                          cursor="pointer"
                          color={
                            item.hidden ? '#38A169' : '#DD6B20'
                          }
                          as={BsDot}
                        />
                        <TagLabel>{item.hidden? 'Archived' : 'Active'}</TagLabel>
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
                          {item.hidden? 'Archived' : 'Active'}
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
