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
  useDisclosure,
  MenuButton,
  Button,
  Menu,
  MenuItem,
  MenuList,
  Avatar,
} from '@chakra-ui/react'
import config from '@/config'
import React, { useState } from 'react'
import shortenAccount from '@/utils/shortenAccount'
import { shortenText } from '@/utils/shortenText'
import {
  RiArrowDownLine,
  RiQuestionLine,
  RiArrowDropDownLine,
} from 'react-icons/ri'
import { BsDot } from 'react-icons/bs'
import { Wikis } from '@/types/admin'
import { PromoteCreatedWikisModal } from './PromoteCreatedWikisModal'
import { HideWikiNotification } from './HideWikiNotification'

type InsightTableWikiCreatedProps = {
  wikiCreatedInsightData: Wikis[]
  hideWikisFunc: () => void
}

export const InsightTableWikiCreated = (
  props: InsightTableWikiCreatedProps,
) => {
  const { wikiCreatedInsightData, hideWikisFunc } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [wikiChosenId, setWikiChosenId] = useState('')
  const [wikiChosenTitle, setWikiChosenTitle] = useState('')
  const [wikiChosenIdPromote, setWikiChosenIdPromote] = useState('')
  const {
    isOpen: isOpenWikiHideNotification,
    onOpen: onOpenWikiHideNotification,
    onClose: onCloseWikiHideNotification,
  } = useDisclosure()
  const [isHide, setIsHide] = useState(true)

  const VisibilityOptions = ['Archive', 'Unarchive']

  const shouldArchive = (e: string, ishidden: boolean, wikiId: string) => {
    if (ishidden && e === 'Unarchive') {
      setIsHide(false)
      onOpenWikiHideNotification()
      setWikiChosenId(wikiId)
    } else if (!ishidden && e === 'Archive') {
      onOpenWikiHideNotification()
      setWikiChosenId(wikiId)
    }
  }
  const shouldPromote = (wikiTitle: string, id: string) => {
    setWikiChosenTitle(wikiTitle)
    setWikiChosenIdPromote(id)
    onOpen()
  }

  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="wikiTitleBg">
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
          {wikiCreatedInsightData.map((item, i) => {
            return (
              <Tr key={i}>
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
                          {item.author?.profile?.username
                            ? item.author.profile.username
                            : shortenAccount(
                                item.author?.id ? item.author.id : '0x0',
                              )}
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
                      color="#FE6FB5"
                    >
                      <TagLabel>Normal</TagLabel>
                    </Tag>
                    {item.promoted && (
                      <Tag
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        bg="#EBF8FF"
                        color="#385C8A"
                      >
                        <TagLabel> Promoted </TagLabel>
                      </Tag>
                    )}
                  </HStack>
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
                        color={item.hidden ? '#38A169' : '#DD6B20'}
                        as={BsDot}
                      />
                      <TagLabel>
                        {item.hidden ? 'Archive' : 'Unarchive'}
                      </TagLabel>
                    </HStack>
                  </Tag>
                </Td>
                <Td>
                  <Flex w="100%" p={5} gap={2} align="center">
                    <HStack spacing={5}>
                      <Menu>
                        <MenuButton
                          transition="all 0.2s"
                          borderRadius="md"
                          _expanded={{ bg: 'brand.500', color: 'white' }}
                        >
                          <Button
                            borderColor="#E2E8F0"
                            _dark={{ borderColor: '#2c323d' }}
                            py={2}
                            px={5}
                            variant="outline"
                            fontWeight="light"
                          >
                            <Text px={2}> Archive </Text>
                            <Icon
                              fontSize="2xl"
                              fontWeight="bold"
                              cursor="pointer"
                              color="#718096"
                              as={RiArrowDropDownLine}
                            />
                          </Button>
                        </MenuButton>
                        <MenuList px={1}>
                          {VisibilityOptions.map((o, m) => (
                            <MenuItem
                              key={m}
                              onClick={() => {
                                hideWikisFunc()
                                shouldArchive(o, item.hidden, item.id)
                              }}
                              py="1"
                              px="1"
                            >
                              {o}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                      {!item.promoted ? (
                        <Text
                          color="#FF5CAA"
                          cursor="pointer"
                          fontWeight="semibold"
                          onClick={() => {
                            hideWikisFunc()
                            shouldPromote(item.title, item.id)
                          }}
                        >
                          Promote
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
                    </HStack>
                  </Flex>
                </Td>
              </Tr>
            )
          })}
          <HideWikiNotification
            isOpen={isOpenWikiHideNotification}
            onClose={onCloseWikiHideNotification}
            wikiChosenId={wikiChosenId}
            IsHide={isHide}
          />
          <PromoteCreatedWikisModal
            isOpen={isOpen}
            onClose={onClose}
            wikiChosenTitle={wikiChosenTitle}
            wikiChosenId={wikiChosenIdPromote}
          />
        </Tbody>
      </Table>
    </TableContainer>
  )
}
