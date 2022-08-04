import React from 'react'
import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Heading,
  Box,
  Text,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'

export const DeleteEditorModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  if (!isOpen) return null
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ lg: 'xl', base: 'sm' }}
      {...rest}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalBody px="0rem">
          <Box borderBottom="1px solid #E2E8F0" p="2">
            <Heading fontSize="xl" color="#1A202C">
              Delete Editor
            </Heading>
          </Box>
          <Box borderBottom="1px solid #E2E8F0" pb={12} px={2}>
            <Text color="#718096">
              Are you sure you want to delete this editor?
            </Text>
            <Text color="#718096">This action is not reversible </Text>
          </Box>
          <ButtonGroup px={2} pt={2}>
            <Button variant="outline">Cancel</Button>
            <Button>Yes, I am sure.</Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
