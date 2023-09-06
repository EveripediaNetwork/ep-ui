import { shortenText } from '@/utils/textUtils'
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
import { RiArrowDownLine } from 'react-icons/ri'
import { WikisTableProps } from '@/types/admin'
import { accountUsername } from '@/utils/AdminUtils/dataUpdate'
import { TableHead } from '../GraphHeads'
import { WikiColDate, WikiTableCol } from './WikiElemets'

export const WikisTable = (props: WikisTableProps) => {
  const { wikiTableData, findSection, shouldArchive, shouldPromote } = props
  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="wikiAdminTableBg">
          <Tr>
            <TableHead text="Wiki Title" />
            <TableHead text="Date/Time" />
            <TableHead text="Tags" />
            <Th
              color="primaryGray"
              _dark={{ color: 'white' }}
              textTransform="none"
              fontWeight="medium"
            >
              <HStack spacing={1}>
                <Text fontWeight="bold">Status</Text>
                <Icon
                  fontSize="17px"
                  fontWeight="black"
                  cursor="pointer"
                  color="primaryGray"
                  _dark={{ color: 'white' }}
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
                      src={`${config.pinataBaseUrl}${item.images?.[0].id}  `}
                    />
                    <Flex flexDirection="column">
                      <Link href={`/wiki/${item.id}`} py={1}>
                        <Text
                          color={
                            item.hidden
                              ? 'archivedTextColor'
                              : 'wikiFlagTextColor'
                          }
                        >
                          {shortenText(item.title, 20)}
                        </Text>
                      </Link>
                      <Text
                        color={
                          item.hidden ? 'archivedTextColor' : 'primaryGray'
                        }
                        fontSize="sm"
                      >
                        <Link href={`/account/${item.author?.id}`} py={1}>
                          {accountUsername(item)}
                        </Link>
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td
                  color={
                    item.hidden ? 'archivedTextColor' : 'wikiFlagTextColor'
                  }
                >
                  <WikiColDate colDate={item.created} />
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
                      bg={item.hidden ? 'archivedTagColor' : 'tagNormalBgColor'}
                      color={
                        item.hidden ? 'archivedTextColor' : 'tagNormalColor'
                      }
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
                        bg="wikiPromotedTag"
                        color="dazBlue"
                      >
                        <TagLabel fontSize="13px" fontWeight="medium">
                          {`Slot ${item.promoted} Promoted`}
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
                    color={!item.hidden ? 'mediumGreen' : 'tangRed'}
                    bg={item.hidden ? 'tagArchiveBg' : 'dewGray'}
                    py="1"
                  >
                    <HStack spacing={2}>
                      <Box
                        w="8px"
                        h="8px"
                        bg={item.hidden ? 'boxArchiveBg' : 'mediumGreen'}
                        borderRadius="100px"
                      />
                      <TagLabel
                        fontWeight="medium"
                        color={item.hidden ? 'archiveLabelBg' : 'mediumGreen'}
                        fontSize="13px"
                      >
                        {item.hidden ? 'Archived' : 'Active'}
                      </TagLabel>
                    </HStack>
                  </Tag>
                </Td>
                <Td>
                  <WikiTableCol
                    item={item}
                    PromoteClickOne={() => {
                      if (!item.hidden) {
                        shouldPromote(item.title, item.id)
                      }
                    }}
                    PromoteClickTwo={() => {
                      if (!item.hidden) {
                        findSection(item.promoted)
                      }
                    }}
                    ArchiveClickOne={() => {
                      if (!item.hidden) {
                        shouldArchive(item.hidden, item.id)
                      }
                    }}
                    ArchiveClickTwo={() => shouldArchive(item.hidden, item.id)}
                  />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
