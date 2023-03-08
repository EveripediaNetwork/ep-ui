import config from '@/config'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import {
  Flex,
  Table,
  TableContainer,
  Avatar,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  AspectRatio,
  useDisclosure,
  Link,
  Box,
  Tag,
  HStack,
  Icon,
} from '@chakra-ui/react'
import React from 'react'
import { shortenAccount, shortenText } from '@/utils/textUtils'
import { RiQuestionLine } from 'react-icons/ri'
import { userNameData } from '@/utils/AdminUtils/dataUpdate'
import { InsightTableWikiEditorsProps } from '@/types/admin'
import { WikiImage } from '../../WikiImage'
import { TableHead } from '../GraphHeads'
import { LoadingAdminTableSkeleton } from '../LoadingAdminTableSkeleton'

export const InsightTableWikiEditors = (
  props: InsightTableWikiEditorsProps,
) => {
  const {
    wikiInsightData: wikiEditorInsightData,
    toggleUserFunc,
    editorsIsFetching,
    hiddenEditorsIsFetching,
  } = props

  const { onOpen } = useDisclosure()
  return wikiEditorInsightData && wikiEditorInsightData?.length > 0 ? (
    <TableContainer w="100%">
      <Table>
        <Thead bg="wikiTitleBg">
          <Tr>
            <TableHead text="Names" />
            <TableHead text="No. of created wikis" />
            <TableHead text="No. of edited wikis" />
            <TableHead text="Total No. of wikis" />
            <TableHead text="Last created wiki" />
            <TableHead text="Lastest activity" />
            <TableHead text="Status" />
            <TableHead text="Action" />
          </Tr>
        </Thead>
        <Tbody>
          {hiddenEditorsIsFetching || editorsIsFetching ? (
            <LoadingAdminTableSkeleton length={10} />
          ) : (
            wikiEditorInsightData.map((item, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    <Link href={`/account/${item.id}`} py={1}>
                      <Flex align="center" gap={2}>
                        <Avatar
                          boxSize="40px"
                          name={userNameData(item)}
                          src={
                            item?.profile?.avatar ? item?.profile?.avatar : ''
                          }
                        />
                        <Flex flexDirection="column">
                          <Text opacity={item.active ? 1 : 0.3}>
                            {userNameData(item)}
                          </Text>
                          <Text
                            color="#primaryGray"
                            fontSize="sm"
                            opacity={item.active ? 1 : 0.3}
                          >
                            {shortenAccount(item.id)}
                          </Text>
                        </Flex>
                      </Flex>
                    </Link>
                  </Td>
                  <Td opacity={item.active ? 1 : 0.3}>
                    <Text color="primaryGray">{item.wikisCreated.length}</Text>
                  </Td>
                  <Td opacity={item.active ? 1 : 0.3}>
                    <Text color="primaryGray">{item.wikisEdited.length}</Text>
                  </Td>
                  <Td opacity={item.active ? 1 : 0.3}>
                    <Text color="primaryGray">
                      {item.wikisCreated.length + item.wikisEdited.length}
                    </Text>
                  </Td>
                  <Td>
                    <Link href={`/wiki/${item.wikisEdited[0]?.wikiId}`} py={1}>
                      <Flex flexDir="row" align="center" gap={2}>
                        <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO} w="40px">
                          <WikiImage
                            cursor="pointer"
                            flexShrink={0}
                            alt="wiki"
                            imageURL={`${config.pinataBaseUrl}${
                              item.wikisEdited[0]?.content
                                ? item.wikisEdited[0]?.content[0].images[0].id
                                : ''
                            }`}
                          />
                        </AspectRatio>
                        <Text opacity={item.active ? 1 : 0.1}>
                          {item.wikisEdited[0]?.content[0]
                            ? shortenText(
                                item.wikisEdited[0]?.content[0].title,
                                18,
                              )
                            : ''}
                        </Text>
                      </Flex>
                    </Link>
                  </Td>
                  <Td color="primaryGray">
                    {item?.wikisCreated[0]?.datetime.split('T')[0]}
                  </Td>
                  <Td>
                    <Tag
                      bg={item.active ? '#F0FFF4' : '#FBD38D'}
                      display="flex"
                      w="fit-content"
                      gap="2"
                      py="1"
                      borderRadius="100px"
                      color={item.active ? '#276749' : '#9C4221'}
                    >
                      <Box
                        w="8px"
                        h="8px"
                        bg={item.active ? '#38A169' : '#DD6B20'}
                        borderRadius="100px"
                      />
                      {item.active ? 'Active' : 'Banned'}
                    </Tag>
                  </Td>
                  <Td _dark={{ opacity: item.active ? 1 : 0.5 }}>
                    {item.active ? (
                      <Text
                        cursor="pointer"
                        fontWeight="medium"
                        onClick={() => {
                          onOpen()
                          if (toggleUserFunc) {
                            toggleUserFunc(item.active, item.id)
                          }
                        }}
                      >
                        Ban
                      </Text>
                    ) : (
                      <HStack
                        spacing={2}
                        onClick={() => {
                          if (toggleUserFunc) {
                            toggleUserFunc(item.active, item.id)
                          }
                        }}
                      >
                        <Text
                          color='tetiaryGray'
                          _dark={{ color: '#495a68' }}
                          cursor="pointer"
                        >
                          UnBan
                        </Text>
                        <Icon
                          fontSize="20px"
                          cursor="pointer"
                          color="electricPink"
                          as={RiQuestionLine}
                        />
                      </HStack>
                    )}
                  </Td>
                </Tr>
              )
            })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Box textAlign="center" w="100%">
      <Text>No data to display 🐌</Text>
    </Box>
  )
}
