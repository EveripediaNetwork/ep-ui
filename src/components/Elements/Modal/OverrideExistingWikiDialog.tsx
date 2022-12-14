import React, { useEffect, useRef, useState } from 'react'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import { Wiki } from '@everipedia/iq-utils'
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
import { RiCloseLine, RiErrorWarningFill } from 'react-icons/ri'
import LinkButton from '../LinkElements/LinkButton'

interface OverrideExistingWikiDialogProps {
  isOpen: boolean
  onClose: () => void
  publish: () => void
  getSlug: () => Promise<string>
  existingWikiData?: Wiki
}
const OverrideExistingWikiDialog = ({
  isOpen,
  onClose,
  publish,
  getSlug,
  existingWikiData,
}: OverrideExistingWikiDialogProps) => {
  const cancelRef = useRef<FocusableElement>(null)
  const [slug, setSlug] = useState('')

  useEffect(() => {
    async function getWikiSlug() {
      setSlug(await getSlug())
    }
    getWikiSlug()
  }, [getSlug])

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
              color="fadedText2"
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
            <LinkButton href={`/create-wiki?slug=${slug}`} variant="outline">
              Edit Wiki
            </LinkButton>
          </ButtonGroup>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OverrideExistingWikiDialog
