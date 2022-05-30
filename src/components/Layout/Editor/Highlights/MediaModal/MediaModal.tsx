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
  useToast,
} from '@chakra-ui/react'
import { RiCloseLine, RiImageLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { shortenMediaText } from '@/utils/shortenText'
import shortenBalance from '@/utils/shortenBallance'
import { v4 as uuidv4 } from 'uuid'
import { saveImage } from '@/utils/create-wiki'
import { Image } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import { WIKI_POST_DEFAULT_ID } from '@/data/Constants'
import { checkMediaDefaultId, constructMediaUrl } from '@/utils/mediaUtils'

const MediaModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const mediaRef = useRef<HTMLInputElement | null>(null)
  const toast = useToast()

  const uploadImageToIPFS = async (image: Image) => {
    const ipfsHash = await saveImage(image)
    if (ipfsHash) {
      dispatch({
        type: 'wiki/updateMediaDetails',
        payload: {
          hash: ipfsHash,
          id: image.id,
        },
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0]
    const id = `${uuidv4()}_${WIKI_POST_DEFAULT_ID}`
    if (file) {
      const fileSize = file.size / 1024 ** 2
      if (fileSize > 8) {
        toast({
          title: 'File size is larger than 8mb',
          status: 'error',
          duration: 3000,
        })
        return
      }
      dispatch({
        type: 'wiki/addMedia',
        payload: {
          name: file.name,
          size: shortenBalance(fileSize),
          id,
          format: 'IMAGE',
          source: 'IPFS_IMG',
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
                      <Box mt={1}>
                        {checkMediaDefaultId(media.id) ? (
                          <WikiImage
                            cursor="pointer"
                            flexShrink={0}
                            imageURL={constructMediaUrl(media)}
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
                          {media.name && (
                            <Text fontSize="sm">
                              {shortenMediaText(media.name)}
                            </Text>
                          )}
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
                            value={checkMediaDefaultId(media.id) ? 50 : 100}
                            h="5px"
                            colorScheme="green"
                            size="sm"
                          />
                        </Box>
                        <Flex w="full" fontSize="xs" gap={16}>
                          <Text flex="1">{media.size}mb</Text>
                          <Text flex="1">
                            {checkMediaDefaultId(media.id)
                              ? 'uploading'
                              : 'uploaded'}
                          </Text>
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
