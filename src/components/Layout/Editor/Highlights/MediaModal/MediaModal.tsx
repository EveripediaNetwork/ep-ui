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
  SimpleGrid,
  Flex,
  Progress,
  Stack,
} from '@chakra-ui/react'
import { RiCloseLine, RiFilmLine, RiImageLine } from 'react-icons/ri'

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
            <Box my={4} display="flex" justifyContent={{base: 'center', md: "left"}}>
              <SimpleGrid columns={{base: 1, md: 2}} spacing={6} spacingX={12}>
                <Flex gap={4} color="linkColor">
                  <Box mt={2}>
                    <RiImageLine size="50" />
                  </Box>
                  <VStack>
                    <Flex w="full" gap={16}>
                      <Text fontSize="sm">brainies.png</Text>
                      <Box mt={1}>
                        <RiCloseLine color="red" size="14" />
                      </Box>
                    </Flex>
                    <Box w="full">
                      <Progress
                        value={80}
                        h="5px"
                        colorScheme="green"
                        size="sm"
                      />
                    </Box>
                    <Flex w="full" fontSize="xs" gap={16}>
                      <Text flex="1">3mb</Text>
                      <Text flex="1">Uploading</Text>
                    </Flex>
                  </VStack>
                </Flex>
                <Flex gap={4} color="linkColor">
                  <Box mt={2}>
                    <RiFilmLine size="50" />
                  </Box>
                  <VStack>
                    <Flex w="full" gap={16}>
                      <Text fontSize="sm">brainies.png</Text>
                      <Box mt={1}>
                        <RiCloseLine color="red" size="14" />
                      </Box>
                    </Flex>
                    <Box w="full">
                      <Progress
                        value={80}
                        h="5px"
                        colorScheme="green"
                        size="sm"
                      />
                    </Box>
                    <Flex w="full" fontSize="xs" gap={16}>
                      <Text flex="1">3mb</Text>
                      <Text flex="1">Uploading</Text>
                    </Flex>
                  </VStack>
                </Flex>
                <Flex gap={4} color="linkColor">
                  <Box mt={2}>
                    <RiImageLine size="50" />
                  </Box>
                  <VStack>
                    <Flex w="full" gap={16}>
                      <Text fontSize="sm">brainies.png</Text>
                      <Box mt={1}>
                        <RiCloseLine color="red" size="14" />
                      </Box>
                    </Flex>
                    <Box w="full">
                      <Progress
                        value={80}
                        h="5px"
                        colorScheme="green"
                        size="sm"
                      />
                    </Box>
                    <Flex w="full" fontSize="xs" gap={16}>
                      <Text flex="1">3mb</Text>
                      <Text flex="1">Uploading</Text>
                    </Flex>
                  </VStack>
                </Flex>
                <Flex gap={4} color="linkColor">
                  <Box mt={2}>
                    <RiFilmLine size="50" />
                  </Box>
                  <VStack>
                    <Flex w="full" gap={16}>
                      <Text fontSize="sm">brainies.png</Text>
                      <Box mt={1}>
                        <RiCloseLine color="red" size="14" />
                      </Box>
                    </Flex>
                    <Box w="full">
                      <Progress
                        value={80}
                        h="5px"
                        colorScheme="green"
                        size="sm"
                      />
                    </Box>
                    <Flex w="full" fontSize="xs" gap={16}>
                      <Text flex="1">3mb</Text>
                      <Text flex="1">Uploading</Text>
                    </Flex>
                  </VStack>
                </Flex>
              </SimpleGrid>
            </Box>
            <VStack align="center" mb={8} py={5} gap={10}>
              <Img src="/images/file-image.png" h={150} w={250} />
              <Button mx="auto">
                <Text fontSize="xs">Upload from computer (8mb max)</Text>
              </Button>
              <Stack spacing={4} direction="row" align="center">
                <Button size="md">
                  <Text fontSize="xs">Save</Text>
                </Button>
                <Button onClick={onClose} variant="outline" size="md">
                  <Text fontSize="xs">Cancel</Text>
                </Button>
              </Stack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null
}

export default MediaModal
