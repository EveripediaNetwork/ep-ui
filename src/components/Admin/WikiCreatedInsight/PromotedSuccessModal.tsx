import Icon from '@chakra-ui/icon'
import {
  Flex,
  Spacer,
  Box,
  Image,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import router from 'next/router'
import React from 'react'
import { RiCloseLine } from 'react-icons/ri'

export const PromotedSuccessModal = ({
  onClose,
  isOpen,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)

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
      <AlertDialogContent width={{ base: '90%', lg: '100%' }}>
        <Box p={8}>
          <Flex>
            <Spacer />
            <Icon
              cursor="pointer"
              fontSize="3xl"
              fontWeight={600}
              as={RiCloseLine}
              onClick={onClose}
            />
          </Flex>
          <Image src="/images/GIFs/checkmark.gif" alt="success" />
          <Text mt="5" fontSize="xl" textAlign="center">
            Wiki promotion Successful.
          </Text>
          <Text fontSize="sm" mt="5" textAlign="center">
            The wiki has been successfully promoted and is now displayed as one
            of the featured wikis on the homepage.
          </Text>
          <Flex my="5" justifyContent="center">
            <Button onClick={() => router.push('/')}>View </Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}
