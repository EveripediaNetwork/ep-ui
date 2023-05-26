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
          <Text fontSize="sm" mt="5" textAlign="center">
            To publish a wiki, it is mandatory to possess a BrainPass. Don't
            worry if you don't have one yet! Simply mint your own BrainPass to
            gain access.
          </Text>
          <Flex my="5" justifyContent="center">
            <Button>Mint</Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default MintNotification
