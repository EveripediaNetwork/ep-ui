import {
  Flex,
  Text,
  Icon,
  useDisclosure,
  Box,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {  RiQuestionLine, RiCloseLine } from 'react-icons/ri'
import { Wikis } from '@/types/admin'
import { FocusableElement } from '@chakra-ui/utils'
import { PromoteCreatedWikisModal } from './PromoteCreatedWikisModal'
import { HideWikiNotification } from './HideWikiNotification'
import { WikisTable } from './WikisTable'

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

  const findSection = (promotedNum: number) => {
    const num = wikiCreatedInsightData && wikiCreatedInsightData[0].promoted
    if (promotedNum === num) {
      setsectionType('hero section')
    } else {
      setsectionType('trending wiki section')
    }
    onOpenPromotion()
  }
  const shouldArchive = (ishidden: boolean, wikiId: string) => {
    if (ishidden) {
      setIsHide(false)
      onOpenWikiHideNotification()
      setWikiChosenId(wikiId)
    } else if (!ishidden) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideNotify])

  return (
    <>
      <WikisTable
        wikiTableData={wikiCreatedInsightData}
        findSection={findSection}
        shouldPromote={shouldPromote}
        shouldArchive={shouldArchive}
      />

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
              This wiki is currently promoted to the {sectionType} of the home
              page
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
    </>
  )
}
