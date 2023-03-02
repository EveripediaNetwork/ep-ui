import { shortenText, shortenAccount } from '@/utils/textUtils'
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
  Icon,
  Tag,
  TagLabel,
  HStack,
  Link,
  Box,
  Avatar,
} from '@chakra-ui/react'
import config from '@/config'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { RiArrowDownLine, RiQuestionLine } from 'react-icons/ri'
import { TableHead } from '../GraphHeads'
import { Wikis } from '@/types/admin'

type WikisTableProps = {
  wikiTableData: Wikis[]
  findSection: (promotedNum: number) => void
  shouldPromote: (wikiTitle: string, id: string) => void
  shouldArchive: (ishidden: boolean, wikiId: string) => void
}

export const WikisTable = (props: WikisTableProps) => {
  const { wikiTableData, findSection, shouldArchive, shouldPromote } = props
  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="wikiTitleBg">
          <Tr>
            <TableHead text="Wiki Title" />
            <TableHead text="Date/Time" />
            <TableHead text="Tags" />
            <Th color="#718096" textTransform="none" fontWeight="medium">
              <HStack spacing={1}>
                <Text fontWeight="bold">Status</Text>
                <Icon
                  fontSize="17px"
                  fontWeight="black"
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
          {wikiTableData.map((item, i) => {
            return (
              <Tr key={i} my="-5">
                <Td>
                  <Flex flexDir="row" align="center" gap={2}>
                    <Avatar
                      cursor="pointer"
                      name={item.author?.profile?.username}
                      src={`${config.pinataBaseUrl}${
                        item.images && item.images[0].id
                      }  `}
                    />
                    <Flex flexDirection="column">
                      <Link href={`/wiki/${item.id}`} py={1}>
                        <Text>{shortenText(item.title, 20)}</Text>
                      </Link>
                      <Text color="#718096" fontSize="sm">
                        <Link href={`/account/${item.author?.id}`} py={1}>
                          {/* eslint-disable no-nested-ternary */}
                          {item.author?.profile?.username
                            ? item.author.profile.username
                            : item.author?.id
                            ? shortenAccount(item.author.id)
                            : 'UnKnown'}
                        </Link>
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <HStack>
                    <Text color="#718096">
                      {item.created
                        ? new Date(item.created).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : '-'}
                    </Text>
                    <Icon
                      fontSize="20px"
                      cursor="pointer"
                      color="black"
                      alignSelf="center"
                      as={BsDot}
                      justifySelf="center"
                    />
                    <Text color="#718096" textTransform="lowercase">
                      {item.created
                        ? new Date(item.created).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                          })
                        : '-'}
                    </Text>
                  </HStack>
                </Td>
                <Td py={1}>
                  <HStack
                    marginLeft={-2}
                    flexWrap="wrap"
                    justify="start"
                    gap={2}
                  >
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      bg="#F9F5FF"
                      _dark={{ bg: '#FFB3D7', color: '#FF409B' }}
                      color="#FE6FB5"
                      py="1"
                    >
                      <TagLabel fontSize="13px" fontWeight="medium">
                        Normal
                      </TagLabel>
                    </Tag>
                    {item.promoted && (
                      <Tag
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        bg="#EBF8FF"
                        _dark={{ bg: '#90CDF4' }}
                        color="#385C8A"
                      >
                        <TagLabel fontSize="13px" fontWeight="medium">
                          {item.promoted === 1
                            ? '🎖 Hero Promoted'
                            : `Slot ${item.promoted - 1} Promoted`}{' '}
                        </TagLabel>
                      </Tag>
                    )}
                  </HStack>
                </Td>
                <Td>
                  <Tag
                    size="md"
                    borderRadius="full"
                    variant="solid"
                    color={!item.hidden ? '#38A169' : '#DD6B20'}
                    _dark={{ bg: item.hidden ? '#FBD38D' : '#F0FFF4' }}
                    bg={!item.hidden ? '#F0FFF4' : '#FFF5F5'}
                    py="1"
                  >
                    <HStack spacing={2}>
                      <Box
                        w="8px"
                        h="8px"
                        bg={!item.hidden ? '#38A169' : '#DD6B20'}
                        _dark={{ bg: item.hidden ? '#AE5D35' : '#38A169' }}
                        borderRadius="100px"
                      />
                      <TagLabel
                        fontWeight="medium"
                        color={!item.hidden ? '#38A169' : '#9C4221'}
                        _dark={{ color: item.hidden ? '#AE5D35' : '#38A169' }}
                        fontSize="13px"
                      >
                        {item.hidden ? 'Archived' : 'Active'}
                      </TagLabel>
                    </HStack>
                  </Tag>
                </Td>
                <Td>
                  <Flex
                    w="100%"
                    gap={2}
                    alignItems="center"
                    justifyContent="flex-end"
                    pr={5}
                  >
                    <HStack spacing={5}>
                      {!item.promoted ? (
                        <Text
                          color={item.hidden ? '#E2E8F0' : '#FF5CAA'}
                          _dark={{
                            color: item.hidden ? '#51565F' : '#FF1A88',
                          }}
                          cursor={item.hidden ? 'not-allowed' : 'pointer'}
                          fontWeight="semibold"
                          onClick={() => {
                            if (!item.hidden) {
                              shouldPromote(item.title, item.id)
                            }
                          }}
                        >
                          Promote
                        </Text>
                      ) : (
                        <HStack
                          spacing={2}
                          onClick={() => {
                            if (!item.hidden) {
                              findSection(item.promoted)
                            }
                          }}
                        >
                          <Text
                            color="#E2E8F0"
                            _dark={{
                              color: item.hidden ? '#51565F' : '#495a68',
                            }}
                            cursor={item.hidden ? 'not-allowed' : 'pointer'}
                          >
                            Promote
                          </Text>
                          <Icon
                            fontSize="20px"
                            cursor="pointer"
                            color="#F11a82"
                            as={RiQuestionLine}
                          />
                        </HStack>
                      )}

                      {!item.hidden ? (
                        <Text
                          cursor={item.hidden ? 'not-allowed' : 'pointer'}
                          fontWeight="medium"
                          onClick={() => {
                            if (!item.hidden) {
                              shouldArchive(item.hidden, item.id)
                            }
                          }}
                        >
                          Archive
                        </Text>
                      ) : (
                        <HStack
                          spacing={2}
                          onClick={() => shouldArchive(item.hidden, item.id)}
                        >
                          <Text
                            color="#F11a82"
                            _dark={{ color: '#FF1A88' }}
                            cursor="pointer"
                          >
                            Unarchive
                          </Text>
                          <Icon
                            fontSize="20px"
                            cursor="pointer"
                            color="#F11a82"
                            as={RiQuestionLine}
                          />
                        </HStack>
                      )}
                    </HStack>
                  </Flex>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
