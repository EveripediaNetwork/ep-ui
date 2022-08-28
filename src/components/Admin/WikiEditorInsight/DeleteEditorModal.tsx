import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Heading,
  Box,
  Text,
  ButtonGroup,
  Button,
  Flex,
  Icon,
  HStack,
} from '@chakra-ui/react'

import { AiFillExclamationCircle } from 'react-icons/ai'

export const DeleteEditorModal = ({
  onClose = () => {},
  isOpen = false,
  toggleUserFunc,
  ...rest
}: {
  id: string
  isActive: boolean
  isOpen: boolean
  toggleUserFunc: (ban: boolean) => void
  onClose: () => void
}) => {
  if (!isOpen) return null
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ lg: 'lg', base: 'sm' }}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalBody p="5">
          <HStack py="2" px="2">
            <Box bg="#2d3748" px="2" py="2" pb="0" rounded="full">
              <Icon
                fontSize="20px"
                cursor="pointer"
                color="white"
                as={AiFillExclamationCircle}
              />
            </Box>
            <Heading fontSize="xl">
              {rest.isActive ? 'Ban' : 'Unban'} Editor
            </Heading>
          </HStack>
          <Flex
            py={5}
            alignItems="center"
            justifyContent="space-between"
            w="full"
          >
            <Text textAlign="center">
              You are about to ban an editor. Do you wish to continue with this
              action?
            </Text>
          </Flex>
          <ButtonGroup px={2} pt={2} w="full" spacing={8}>
            <Button onClick={onClose} w="full" variant="outline">
              Cancel
            </Button>
            <Button
              w="full"
              onClick={() => {
                toggleUserFunc(!rest.isActive)
                onClose()
              }}
            >
              {rest.isActive ? 'Ban' : 'Unban'}
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
