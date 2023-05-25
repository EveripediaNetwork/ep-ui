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
  Spacer,
  Image,
} from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { RiCloseLine } from 'react-icons/ri'

const MintNotification = ({
  modalState,
  setModalState,
}: {
  modalState: boolean
  setModalState: (state: boolean) => void
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => setModalState(false)}
      isOpen={modalState}
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
              onClick={() => setModalState(false)}
            />
          </Flex>
          <Image src="/images/nft-pass/success.gif" alt="success" />
          <Text mt="5" fontSize="xl" textAlign="center">
            Brainpass subscription renewed!
          </Text>
          <Text fontSize="sm" mt="5" textAlign="center">
            Your Brainpass subscription has been successfully Renewed. You can
            continue to create and edit wikis and contribute to the platform's
            wealth of knowledge.
          </Text>
          <Flex my="5" justifyContent="center">
            <Button>Connect Wallet</Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MintNotification
