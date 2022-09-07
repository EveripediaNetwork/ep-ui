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
  Box,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import config from '@/config'
import React, { useEffect, useState } from 'react'
import shortenAccount from '@/utils/shortenAccount'
import { shortenText } from '@/utils/shortenText'
import {
  RiArrowDownLine,
  RiQuestionLine,
  RiArrowDropDownLine,
  RiCloseLine,
} from 'react-icons/ri'
import { BsDot } from 'react-icons/bs'
import { Wikis } from '@/types/admin'
import { PromoteCreatedWikisModal } from './PromoteCreatedWikisModal'
import { HideWikiNotification } from './HideWikiNotification'
import { FocusableElement } from '@chakra-ui/utils'

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
  const [sectionType, setsectionType] = useState('')
  const [wikiChosenTitle, setWikiChosenTitle] = useState('')
  const [wikiChosenIdPromote, setWikiChosenIdPromote] = useState('')
  const {
    isOpen: isOpenWikiHideNotification,
    onOpen: onOpenWikiHideNotification,
    onClose: onCloseWikiHideNotification,
  } = useDisclosure()
  const cancelRef = React.useRef<FocusableElement>(null)
  const {
    isOpen: isOpenPromotion,
    onOpen: onOpenPromotion,
    onClose: onClosePromotion,
  } = useDisclosure()
  const [isHide, setIsHide] = useState(true)
  const [hideNotify, setHideNotify] = useState(false)
  const VisibilityOptions = ['Archive', 'Unarchive']

  const findSection = (promotedNum: number) => {
    let num = wikiCreatedInsightData && wikiCreatedInsightData[0].promoted
    if (promotedNum === num) {
      setsectionType('hero section')
    } else {
      setsectionType('trending wiki section')
    }
    onOpenPromotion()
  }
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
  useEffect(() => {
    hideWikisFunc()
  }, [hideNotify])

  return (
    <TableContainer w="100%">
      <Table>
        <Thead bg="wikiTitleBg">
          <Tr>
            <Th color="#718096" textTransform="none" fontWeight="medium">
              <Text fontWeight="bold">Wiki Title</Text>
            </Th>
            <Th color="#718096" textTransform="none" fontWeight="medium">
              <Text fontWeight="bold">Date/Time</Text>
            </Th>
            <Th color="#718096" textTransform="none" fontWeight="medium">
              <Text fontWeight="bold">Tags</Text>
            </Th>
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
          {wikiCreatedInsightData.map((item, i) => {
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
                          {' '}
                          Promoted{' '}
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
                  >
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
                                shouldArchive(o, item.hidden, item.id)
                              }}
                              py="1"
                              px="1"
                              isDisabled={
                                (!item.hidden && o === 'Unarchive') ||
                                (item.hidden && o === 'Archive')
                              }
                            >
                              {o}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                      {!item.promoted ? (
                        <Text
                          color="#FF5CAA"
                          _dark={{ color: '#F11a82' }}
                          cursor="pointer"
                          fontWeight="semibold"
                          onClick={() => {
                            shouldPromote(item.title, item.id)
                          }}
                        >
                          Promote
                        </Text>
                      ) : (
                        <HStack
                          spacing={2}
                          onClick={() => findSection(item.promoted)}
                        >
                          <Text
                            color="#E2E8F0"
                            _dark={{ color: '#495a68' }}
                            cursor="pointer"
                          >
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
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClosePromotion}
            isOpen={isOpenPromotion}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <Box p={8}>
                <Flex>
                  <Icon
                    cursor="pointer"
                    fontSize="3xl"
                    fontWeight={600}
                    as={RiQuestionLine}
                    color="#898787"
                    mr={5}
                  />
                  <Text flex="1" fontSize="xl" fontWeight="black">
                    Promotion Details
                  </Text>
                  <Icon
                    cursor="pointer"
                    fontSize="3xl"
                    fontWeight={600}
                    as={RiCloseLine}
                    onClick={onClosePromotion}
                  />
                </Flex>
                <Text
                  my="6"
                  w="90%"
                  lineHeight="2"
                  textAlign="center"
                  fontWeight="normal"
                >
                  This wiki is currently promoted to the {sectionType} of the
                  home page
                </Text>
              </Box>
            </AlertDialogContent>
          </AlertDialog>
          <HideWikiNotification
            isOpen={isOpenWikiHideNotification}
            onClose={onCloseWikiHideNotification}
            wikiChosenId={wikiChosenId}
            IsHide={isHide}
            hideFunc={() => {
              setHideNotify(!hideNotify)
            }}
          />
          <PromoteCreatedWikisModal
            isOpen={isOpen}
            onClose={onClose}
            wikiChosenTitle={wikiChosenTitle}
            wikiChosenId={wikiChosenIdPromote}
            hideFunc={() => {
              setHideNotify(!hideNotify)
            }}
          />
        </Tbody>
      </Table>
    </TableContainer>
  )
}
