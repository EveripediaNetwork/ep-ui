import React from 'react'
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  Flex,
  Text,
  Icon,
  Button,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri'
import {
  usePostHideWikiMutation,
  usePostUnHideWikiMutation,
} from '@/services/admin'

export const HideWikiNotification = ({
  onClose,
  isOpen,
  wikiChosenId,
  IsHide,
  hideFunc,
}: {
  isOpen: boolean
  onClose: () => void
  wikiChosenId: string
  IsHide: boolean
  hideFunc: () => void
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)
  const wikiId = wikiChosenId
  const toast = useToast()
  const [postHideWiki, { error: postHideWikiError }] = usePostHideWikiMutation()
  const [postUnHideWiki, { error: postUnHideWikiError }] =
    usePostUnHideWikiMutation()

  const hideWiki = () => {
    postHideWiki(wikiId)
    hideFunc()
    onClose()
    let toastTitle = 'Wiki Successfully Archived'
    let toastMessage =
      'The selected wiki has been archived. Refresh the page to see the changes.'
    let toastType: 'success' | 'error' = 'success'
    if (postHideWikiError) {
      toastTitle = 'Wiki Archive Failed'
      toastMessage =
        "We couldn't save your wiki changes. Refresh the page and try again."
      toastType = 'error'
    }
    toast({
      title: toastTitle,
      description: toastMessage,
      status: toastType,
      duration: 5000,
      isClosable: true,
    })
  }

  const unHideWiki = () => {
    postUnHideWiki(wikiId)
    hideFunc()
    onClose()
    let toastTitle = 'Wiki Successfully Unarchived'
    let toastMessage =
      'The selected wiki has been unarchived. Refresh the page to see the changes.'
    let toastType: 'success' | 'error' = 'success'
    if (postUnHideWikiError) {
      toastTitle = 'Wiki Unarchive Failed'
      toastMessage =
        "We couldn't save your wiki changes. Refresh the page and try again."
      toastType = 'error'
    }
    toast({
      title: toastTitle,
      description: toastMessage,
      status: toastType,
      duration: 5000,
      isClosable: true,
    })
  }

  if (!isOpen) return null

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="lg"
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <Box p={8}>
          <Flex>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiErrorWarningFill}
              mr={5}
            />
            <Text flex="1" fontSize="xl" fontWeight="black">
              {IsHide ? 'Archive Wiki' : 'Archive Wiki Details'}
            </Text>
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={onClose}
            />
          </Flex>
          <Text
            my="6"
            w="90%"
            lineHeight="2"
            textAlign="center"
            fontWeight="normal"
          >
            {IsHide
              ? ' You are about to archive the selected wiki. Do you wish to continue with this action?'
              : 'This archive is currently archived. Do you want to unarchive this wiki?'}
          </Text>
          <ButtonGroup px={2} pt={2} w="full" spacing={8} onClick={onClose}>
            <Button w="full" variant="outline">
              Cancel
            </Button>
            <Button w="full" onClick={IsHide ? hideWiki : unHideWiki}>
              {IsHide ? 'Archive' : 'Unarchive'}
            </Button>
          </ButtonGroup>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}
