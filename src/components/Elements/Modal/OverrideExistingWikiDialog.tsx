import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import { Wiki } from '@/types/Wiki'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonGroup,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import React from 'react'
import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri'

interface OverrideExistingWikiDialogProps {
  isOpen: boolean
  onClose: () => void
  publish: () => void
  slug: string
  existingWikiData?: Wiki
}
const OverrideExistingWikiDialog = ({
  isOpen,
  onClose,
  publish,
  slug,
  existingWikiData,
}: OverrideExistingWikiDialogProps) => {
  const cancelRef = React.useRef<FocusableElement>(null)
  if (!isOpen) return null
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size="2xl"
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        _dark={{
          backgroundColor: 'gray.800',
        }}
        maxW="min(500px, 90vw)"
      >
        <Box p={8}>
          <AlertDialogHeader
            px="0 !important"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack spacing={4}>
              <Center
                p={2}
                bgColor="dimColor"
                w="40px"
                h="40px"
                borderRadius="full"
              >
                <Icon as={RiErrorWarningFill} fontSize={30} />
              </Center>
              <Heading size="lg">Warning !</Heading>
            </HStack>
            <IconButton
              variant="unstyled"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.500"
              aria-label="Close"
              onClick={onClose}
              icon={<RiCloseLine />}
              fontSize={30}
            />
          </AlertDialogHeader>

          <Text align="center">
            This wiki is already in existence, creating a new wiki with the same
            id (Wiki title) will overwrite the existing one.
          </Text>
          {existingWikiData && (
            <Center>
              <Box maxW="300px" transform="scale(0.8)">
                <WikiPreviewCard
                  wiki={existingWikiData}
                  showLatestEditor={false}
                />
              </Box>
            </Center>
          )}
          <ButtonGroup display="flex" justifyContent="center">
            <Button onClick={publish}>Proceed anyways</Button>
            <Button as="a" href={`/create-wiki?slug=${slug}`} variant="outline">
              Edit Wiki
            </Button>
          </ButtonGroup>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OverrideExistingWikiDialog
