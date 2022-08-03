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
} from '@chakra-ui/react'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { WikiImage } from '../WikiImage'

interface WikiInsightDataInterface {
  editorName: string
  createdWikis: number
  editiedWikis: number
  lastCreatedWiki: { title: string; img: string }
  editorAvatar: string
  latestActivity: string
  editorAddress: string
}

type InsightTableWikiEditorsProps = {
  wikiInsightData: WikiInsightDataInterface[]
}

export const InsightTableWikiEditors = (
  props: InsightTableWikiEditorsProps,
) => {
  const { wikiInsightData } = props

  console.log(wikiInsightData)
  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="#2d3748" color="">
          <Tr>
            <Th textTransform="none" fontWeight="semibold">
              Names
            </Th>
            <Th textTransform="none" fontWeight="normal">
              No. of created wikis
            </Th>
            <Th textTransform="none" fontWeight="medium">
              No. of edited wikis
            </Th>
            <Th textTransform="none" fontWeight="medium">
              Total No. of wikis
            </Th>
            <Th textTransform="none" fontWeight="medium">
              Last created wiki
            </Th>
            <Th textTransform="none" fontWeight="medium">
              Lastest activity
            </Th>
            <Th textTransform="none" fontWeight="medium">
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {wikiInsightData.map(item => {
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
                    <Text color="#718096">{item.createdWikis}</Text>
                  </Td>
                  <Td>
                    <Text color="#718096">{item.editiedWikis}</Text>
                  </Td>
                  <Td>
                    <Text color="#718096">
                      {item.createdWikis + item.editiedWikis}
                    </Text>
                  </Td>
                  <Td>
                    <Flex flexDir="row" align="center" gap={2}>
                      <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO} w="40px">
                        <WikiImage
                          cursor="pointer"
                          flexShrink={0}
                          imageURL={item.lastCreatedWiki.img}
                        />
                      </AspectRatio>
                      <Text>{item.lastCreatedWiki.title}</Text>
                    </Flex>
                  </Td>
                  <Td color="#718096">{item.latestActivity}</Td>
                  <Td>
                    <Icon
                      fontSize="20px"
                      cursor="pointer"
                      color="#718096"
                      as={RiDeleteBin6Line}
                    />
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
