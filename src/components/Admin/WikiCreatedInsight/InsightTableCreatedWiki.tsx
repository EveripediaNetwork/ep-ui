import {
  Flex,
  Text,
  Icon,
  useDisclosure,
  Box,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  Circle,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RiQuestionLine, RiCloseLine } from 'react-icons/ri'
import { Wikis } from '@/types/admin'
import { FocusableElement } from '@chakra-ui/utils'
import { PromoteCreatedWikisModal } from './PromoteCreatedWikisModal'
import { HideWikiNotification } from './HideWikiNotification'
import { WikisTable } from './WikisTable'
import { PromotedSuccessModal } from './PromotedSuccessModal'

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
  const { onClose: onClosePromotionModal } = useDisclosure()
  const cancelRef = React.useRef<FocusableElement>(null)
  const {
    isOpen: isOpenPromotion,
    onOpen: onOpenPromotion,
    onClose: onClosePromotion,
  } = useDisclosure()
  const [isHide, setIsHide] = useState(true)
  const [hideNotify, setHideNotify] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

  const findSection = (promotedNum: number) => {
    setsectionType(`Slot ${promotedNum}`)
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
            <Flex alignItems="center">
              <Circle
                size="40px"
                bg="modalIconBg"
                mr={1}
                color="wikiFlagTextColor"
              >
                <Icon cursor="pointer" fontSize="3xl" as={RiQuestionLine} />
              </Circle>

              <Text flex="1" fontSize="xl" fontWeight="black">
                Promotion Details
              </Text>
              <Icon
                cursor="pointer"
                fontSize="2xl"
                as={RiCloseLine}
                color="closeBtnModal"
                onClick={onClosePromotion}
                mt={-4}
              />
            </Flex>
            <Text
              my="6"
              w="90%"
              lineHeight="2"
              textAlign="center"
              fontWeight="normal"
            >
              This wiki is currently promoted to {sectionType} of the featured
              wikis
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
        setSuccessModal={setSuccessModal}
      />
      <PromotedSuccessModal
        isOpen={!isOpen && successModal}
        onClose={onClosePromotionModal}
      />
    </>
  )
}
