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
import TagsInput from '@/components/CreateWiki/EditorModals/EditWikiDetailsModal/TagsInput'
import LinksInput from './LinksInput'
import CategoryInput from './CategoryInput'
import LinkedWikisInput from './LinkedWikisInput'
import EventsInput from './EventsInput'
import { useTranslation } from 'next-i18next'
import LocationInput from './LocationInput'

const HighlightsModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const currentWiki = useAppSelector((state) => state.wiki)
  const { t } = useTranslation('wiki')

  if (!isOpen) return null

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        w="min(95vw, 800px)"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalHeader fontSize="lg" display="flex" alignItems="center">
          {t('editDetails')}
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
            maxH="min(64vh, 500px)"
            overflowY="auto"
            zIndex="4"
          >
            <CategoryInput wiki={currentWiki} />
            <TagsInput wiki={currentWiki} />
            <LinkedWikisInput wiki={currentWiki} />
            <LinksInput wiki={currentWiki} />
            {currentWiki.tags.some((tag) => tag.id === 'Events') && (
              <LocationInput />
            )}

            <EventsInput wiki={currentWiki} />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mx="auto"
            w={{ base: 'full', md: 'initial' }}
            onClick={onClose}
          >
            {t('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default HighlightsModal
