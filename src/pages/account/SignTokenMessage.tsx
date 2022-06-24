import {
  Center,
  Heading,
  VStack,
  Text,
  Icon,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { RiErrorWarningFill, RiSettings4Line } from 'react-icons/ri'

interface SignTokenMessageProps {
  error?: string
  reopenSigningDialog: Dispatch<SetStateAction<boolean>>
}

const SignTokenMessage = ({
  error,
  reopenSigningDialog,
}: SignTokenMessageProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (error) onOpen()
  }, [error, onOpen])

  return (
    <>
      <Center p={4} mt="25vh" mb="25vh">
        <VStack>
          <Icon as={RiSettings4Line} fontSize={42} />
          <Heading textAlign="center">Authenticate to continue</Heading>
          <Text pb={4} maxW="380px" textAlign="center">
            To make changes to your profile, authenticate your wallet to
            continue.
          </Text>
        </VStack>
      </Center>

      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack justifyContent="space-between">
              <HStack spacing={4}>
                <Center
                  bgColor="dimColor"
                  w="35px"
                  h="35px"
                  borderRadius="full"
                >
                  <Icon as={RiErrorWarningFill} fontSize={25} />
                </Center>
                <Heading fontSize="25px">Notice</Heading>
              </HStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton m={2} />
          <ModalBody>
            <VStack pb={4} spacing={4}>
              <Text>
                Sign the prompt to make changes to your profile page. Rejecting
                the prompt will prevent access to your profile settings page.
              </Text>
              <Button
                variant="outline"
                onClick={() => reopenSigningDialog(true)}
              >
                Try again
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SignTokenMessage
