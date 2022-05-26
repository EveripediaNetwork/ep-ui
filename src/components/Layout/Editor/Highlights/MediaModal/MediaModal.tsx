import React, { useRef } from 'react'
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
import { RiCloseLine, RiImageLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { shortenMediaText } from '@/utils/shortenText'
import shortenBalance from '@/utils/shortenBallance'
import { v4 as uuidv4 } from 'uuid'
import { saveImage } from '@/utils/create-wiki'
import { Image } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import config from '@/config'

const MediaModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const mediaRef = useRef<HTMLInputElement | null>(null)

  const uploadImageToIPFS = async (image: Image) => {
    const ipfsHash = await saveImage(image)
    if (ipfsHash) {
      dispatch({
        type: 'wiki/updateMediaDetails',
        payload: {
          ipfs: ipfsHash,
          id: image.id,
          progress: 'UPLOADED',
        },
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    const id = uuidv4()
    if (file) {
      dispatch({
        type: 'wiki/addMedia',
        payload: {
          name: file.name,
          size: shortenBalance(file.size / 1024 ** 2),
          type: file.type.includes('image') ? 'IMAGE' : 'VIDEO',
          id,
          progress: 'UPLOADING',
        },
      })
      uploadImageToIPFS({ id, type: file })
    }
  }

  const deleteMedia = (mediaId: string) => {
    dispatch({
      type: 'wiki/removeMedia',
      payload: {
        id: mediaId,
      },
    })
  }

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
            {wiki.media !== undefined && wiki.media?.length > 0 && (
              <Box
                my={4}
                display="flex"
                justifyContent={{ base: 'center', md: 'left' }}
              >
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={6}
                  spacingX={12}
                >
                  {wiki.media.map(media => (
                    <Flex key={media.id} gap={4} color="linkColor">
                      <Box mt={2}>
                        {media.ipfs ? (
                          <WikiImage
                            cursor="pointer"
                            flexShrink={0}
                            imageURL={`${config.pinataBaseUrl}${media.ipfs}`}
                            h={{ base: '50px', lg: '60px' }}
                            w={{ base: '50px', lg: '60px' }}
                            borderRadius="lg"
                            overflow="hidden"
                          />
                        ) : (
                          <RiImageLine size="50" />
                        )}
                      </Box>
                      <VStack>
                        <Flex w="full" gap={16}>
                          <Text fontSize="sm">
                            {shortenMediaText(media.name)}
                          </Text>
                          <Box mt={1}>
                            <RiCloseLine
                              cursor="pointer"
                              onClick={() => deleteMedia(media.id)}
                              color="red"
                              size="14"
                            />
                          </Box>
                        </Flex>
                        <Box w="full">
                          <Progress
                            value={media.progress === 'UPLOADING' ? 50 : 100}
                            h="5px"
                            colorScheme="green"
                            size="sm"
                          />
                        </Box>
                        <Flex w="full" fontSize="xs" gap={16}>
                          <Text flex="1">{media.size}mb</Text>
                          <Text flex="1">{media.progress.toLowerCase()}</Text>
                        </Flex>
                      </VStack>
                    </Flex>
                  ))}
                </SimpleGrid>
              </Box>
            )}
            <VStack align="center" mb={8} py={5} gap={10}>
              {wiki.media !== undefined && wiki.media?.length < 1 && (
                <Img src="/images/file-image.png" h={150} w={250} />
              )}
              <input
                type="file"
                id="file"
                accept="image/*"
                ref={mediaRef}
                style={{ display: 'none' }}
                onChange={handleChange}
              />
              <Button onClick={() => mediaRef.current?.click()} mx="auto">
                <Text fontSize="xs">Upload from computer (8mb max)</Text>
              </Button>
              {wiki.media !== undefined && wiki.media?.length > 0 && (
                <Stack spacing={4} direction="row" align="center">
                  <Button size="md">
                    <Text fontSize="xs">Save</Text>
                  </Button>
                  <Button onClick={onClose} variant="outline" size="md">
                    <Text fontSize="xs">Cancel</Text>
                  </Button>
                </Stack>
              )}
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null
}

export default MediaModal
