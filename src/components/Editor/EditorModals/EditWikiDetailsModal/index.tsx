import React from 'react'
import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
} from '@chakra-ui/react'

import { useAppSelector } from '@/store/hook'

import TagsInput from '@/components/Editor/EditorModals/EditWikiDetailsModal/TagsInput'
import LinksInput from './LinksInput'
import CategoriesInput from './CategoriesInput'

const HighlightsModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const currentWiki = useAppSelector(state => state.wiki)

  if (!isOpen) return null

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        w="min(95vw, 600px)"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalHeader fontSize="lg" display="flex" alignItems="center">
          Edit Details
          <ModalCloseButton size="sm" my="auto" position="unset" ml="auto" />
        </ModalHeader>
        <ModalBody>
          <Stack
            borderTopWidth={1}
            borderBottomWidth={1}
            spacing="4"
            mx={-6}
            mt={-2}
            py={4}
            px={6}
            maxH="60vh"
            overflowY="auto"
          >
            <CategoriesInput wiki={currentWiki} />
            <TagsInput wiki={currentWiki} />
            <LinksInput wiki={currentWiki} />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mx="auto" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default HighlightsModal
