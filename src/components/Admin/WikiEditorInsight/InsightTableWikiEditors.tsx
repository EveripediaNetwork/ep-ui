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
  Th,
  Thead,
  Tr,
  AspectRatio,
  Button,
  useDisclosure,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from '@chakra-ui/react'
import React from 'react'
import shortenAccount from '@/utils/shortenAccount'
import { shortenText } from '@/utils/shortenText'
import { BiChevronDown } from 'react-icons/bi'
import { WikiImage } from '../../WikiImage'

interface WikiEditorInsightDataInterface {
  editorName: string
  createdWikis: {
    content: {
      title: string
      images: {
        id: string
      }[]
    }[]
    datetime: string
    id: string
    ipfs: string
    wikiId: string
  }[]
  editiedWikis: {
    content: {
      title: string
      images: {
        id: string
      }[]
    }[]
    datetime: string
    id: string
    ipfs: string
    wikiId: string
  }[]
  lastCreatedWiki: {
    content: {
      title: string
      images: {
        id: string
      }[]
    }[]
  }
  editorAvatar: string
  latestActivity: string
  editorAddress: string
  active: boolean
}

type InsightTableWikiEditorsProps = {
  wikiInsightData: WikiEditorInsightDataInterface[] | undefined
  toggleUserFunc: (active: boolean, id: string) => void
}

export const InsightTableWikiEditors = (
  props: InsightTableWikiEditorsProps,
) => {
  const { wikiInsightData: wikiEditorInsightData } = props
  const { toggleUserFunc } = props
  const { onOpen } = useDisclosure()
  return wikiEditorInsightData && wikiEditorInsightData?.length > 0 ? (
    <TableContainer w="100%">
      <Table>
        <Thead bg="wikiTitleBg">
          <Tr>
            <Th
              color="#718096"
              textTransform="capitalize"
              fontWeight="semibold"
            >
              Names
            </Th>
            <Th color="#718096" textTransform="capitalize" fontWeight="normal">
              No. of created wikis
            </Th>
            <Th color="#718096" textTransform="capitalize" fontWeight="medium">
              No. of edited wikis
            </Th>
            <Th color="#718096" textTransform="capitalize" fontWeight="medium">
              Total No. of wikis
            </Th>
            <Th color="#718096" textTransform="capitalize" fontWeight="medium">
              Last created wiki
            </Th>
            <Th color="#718096" textTransform="capitalize" fontWeight="medium">
              Lastest activity
            </Th>
            <Th color="#718096" textTransform="capitalize" fontWeight="medium">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {wikiEditorInsightData?.map((item, i) => {
            return (
              <Tr key={i}>
                <Td>
                  <Link href={`/account/${item.editorAddress}`} py={1}>
                    <Flex align="center" gap={2}>
                      <Avatar
                        boxSize="40px"
                        name={item.editorName}
                        src={item.editorAvatar}
                      />
                      <Flex flexDirection="column">
                        <Text>{item.editorName}</Text>
                        <Text color="#718096" fontSize="sm">
                          {shortenAccount(item.editorAddress)}
                        </Text>
                      </Flex>
                    </Flex>
                  </Link>
                </Td>
                <Td>
                  <Text color="#718096">{item.createdWikis.length}</Text>
                </Td>
                <Td>
                  <Text color="#718096">{item.editiedWikis.length}</Text>
                </Td>
                <Td>
                  <Text color="#718096">
                    {item.createdWikis.length + item.editiedWikis.length}
                  </Text>
                </Td>
                <Td>
                  <Link href={`/wiki/${item.editiedWikis[0]?.wikiId}`} py={1}>
                    <Flex flexDir="row" align="center" gap={2}>
                      <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO} w="40px">
                        <WikiImage
                          cursor="pointer"
                          flexShrink={0}
                          imageURL={`${config.pinataBaseUrl}${
                            item.lastCreatedWiki?.content
                              ? item.lastCreatedWiki.content[0].images[0].id
                              : ''
                          }`}
                        />
                      </AspectRatio>
                      <Text>
                        {item.lastCreatedWiki?.content[0]
                          ? shortenText(
                              item.lastCreatedWiki?.content[0].title,
                              18,
                            )
                          : ''}
                      </Text>
                    </Flex>
                  </Link>
                </Td>
                <Td color="#718096">{item.latestActivity}</Td>
                <Td>
                  <Menu>
                    <MenuButton
                      transition="all 0.2s"
                      borderRadius="md"
                      _expanded={{ bg: 'brand.500', color: 'white' }}
                      _hover={{ bg: 'none' }}
                      _active={{ bg: 'none', outline: 'none' }}
                      _focus={{ bg: 'none', outline: 'none' }}
                    >
                      <MenuButton
                        as={Button}
                        rightIcon={<BiChevronDown />}
                        bg="transparent"
                        color="#718096"
                        _hover={{ bg: 'none' }}
                        _active={{ bg: 'none', outline: 'none' }}
                        _focus={{ bg: 'none', outline: 'none' }}
                        fontWeight="medium"
                      >
                        {item.active ? 'Ban' : 'Unban'}
                      </MenuButton>
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          onOpen()
                          toggleUserFunc(item.active, item.editorAddress)
                        }}
                        py="5"
                        px="3"
                      >
                        Ban
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          toggleUserFunc(item.active, item.editorAddress)
                        }}
                        py="5"
                        px="3"
                      >
                        Unban
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Box textAlign="center" w="100%">
      <Text>No data to display 🐌</Text>
    </Box>
  )
}
