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
import { useRouter } from 'next/router'

const PublishNotification = ({
  modalState,
  setModalState,
  buttonTitle,
  text,
}: {
  modalState: boolean
  setModalState: (state: boolean) => void
  buttonTitle: string
  text: string
}) => {
  const cancelRef = React.useRef<FocusableElement>(null)
  const router = useRouter()
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
            {text}
          </Text>
          <Flex my="5" justifyContent="center">
            <Button onClick={() => router.push('/mint-pass')}>
              {buttonTitle}
            </Button>
          </Flex>
        </Box>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default PublishNotification
