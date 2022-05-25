import React from 'react'
import {
  Divider,
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Text,
  VStack,
  Box,
  Img,
} from '@chakra-ui/react'

const MediaModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  return isOpen ? (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalHeader>
          <VStack align="start" w={{ base: '100%', md: '90%', lg: '80%' }}>
            <Text fontSize="lg" fontWeight="bold">
              Add Image or Video to Media Gallery
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Adding media makes an article more interactive and engaging. You
              can upload jpg, gif and png files.
            </Text>
          </VStack>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Box mt="3">
            <Text fontWeight="bold">Local Files</Text>
            <VStack align="center" mb={8} py={5} gap={5}>
              <Img src="/images/file-image.png" h={150} w={250} />
              <Button colorScheme="blue" mx="auto">
                <Text fontSize="xs">Upload from computer (8mb max)</Text>
              </Button>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null
}

export default MediaModal
