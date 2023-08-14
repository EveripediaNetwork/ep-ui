import {
  Box,
  Image,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import React from 'react'

const MetaMaskConnectionErrorModal = ({
  onClose = () => {},
  isOpen = false,
}: Partial<ModalProps>) => {
  const { colorMode } = useColorMode()

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent
        w="min(95vw, 600px)"
        _dark={{
          bg: 'gray.800',
        }}
        rounded={'16px'}
      >
        <ModalHeader px={3} fontSize="lg" display="flex" alignItems="center">
          <HStack spacing={2}>
            <Image
              alt="Warning"
              src={
                colorMode === 'dark'
                  ? '/images/icons/warning.svg'
                  : '/images/icons/warning-light.svg'
              }
              h="34px"
              w="34px"
            />
            <Text fontSize={'xl'}>Metamask not detected</Text>
          </HStack>
          <ModalCloseButton size="md" my="auto" position="unset" ml="auto" />
        </ModalHeader>
        <ModalBody>
          <Box px={5} pb={9} textAlign={'center'}>
            Metamask was not detected in your browser, You can acquire MetaMask,
            connect using a different wallet, or opt for email/social media
            connection.
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MetaMaskConnectionErrorModal
