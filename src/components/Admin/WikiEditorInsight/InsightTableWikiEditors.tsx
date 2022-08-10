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
  Icon,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { WikiImage } from '../../WikiImage'
import { DeleteEditorModal } from './DeleteEditorModal'

interface WikiInsightDataInterface {
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
}

type InsightTableWikiEditorsProps = {
  wikiInsightData: WikiInsightDataInterface[] | undefined
}

export const InsightTableWikiEditors = (
  props: InsightTableWikiEditorsProps,
) => {
  const { wikiInsightData } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="#F7FAFC">
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
          {wikiInsightData?.map(item => {
            return (
              <>
                <Tr>
                  <Td>
                    <Flex align="center" gap={2}>
                      <Avatar
                        boxSize="40px"
                        name={item.editorName}
                        src={item.editorAvatar}
                      />
                      <Flex flexDirection="column">
                        <Text>{item.editorName}</Text>
                        <Text color="#718096" fontSize="sm">
                          {item.editorAddress}
                        </Text>
                      </Flex>
                    </Flex>
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
                      <Text>{item.lastCreatedWiki?.content[0]?.title}</Text>
                    </Flex>
                  </Td>
                  <Td color="#718096">{item.latestActivity}</Td>
                  <Td>
                    <Button
                      w="fit-content"
                      bg="none"
                      _hover={{ bg: 'none' }}
                      _active={{ bg: 'none', outline: 'none' }}
                      _focus={{ bg: 'none', outline: 'none' }}
                      p="0"
                      m="0"
                    >
                      <Icon
                        fontSize="20px"
                        cursor="pointer"
                        color="#718096"
                        as={RiDeleteBin6Line}
                        onClick={() => {
                          onOpen()
                        }}
                      />
                    </Button>
                  </Td>
                </Tr>
              </>
            )
          })}
          <DeleteEditorModal isOpen={isOpen} onClose={onClose} />
        </Tbody>
      </Table>
    </TableContainer>
  )
}
