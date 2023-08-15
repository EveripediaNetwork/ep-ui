import { WarningIcon } from '@chakra-ui/icons'
import {
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Flex,
} from '@chakra-ui/react'
import React from 'react'

const ConnectionErrorModal = ({
  onClose = () => {},
  connector,
  isOpen = false,
}: Partial<ModalProps> & { connector: string }) => {
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
            <Flex
              align={'center'}
              justify="center"
              bg="modalIconBg"
              w="34px"
              h={'34px'}
              rounded={'full'}
            >
              <WarningIcon />
            </Flex>
            <Text fontSize={'xl'}>{connector} not detected</Text>
          </HStack>
          <ModalCloseButton size="md" my="auto" position="unset" ml="auto" />
        </ModalHeader>
        <ModalBody>
          <Box px={5} pb={9} textAlign={'center'}>
            {connector} was not detected in your browser, You can acquire{' '}
            {connector}, connect using a different wallet, or opt for
            email/social media connection.
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConnectionErrorModal
