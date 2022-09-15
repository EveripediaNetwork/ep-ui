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
  SimpleGrid,
  Flex,
  Progress,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { RiCloseLine, RiImageLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { shortenText } from '@/utils/shortenText'
import shortenBalance from '@/utils/shortenBallance'
import { v4 as uuidv4 } from 'uuid'
import { saveImage } from '@/utils/create-wiki'
import { Image } from '@/types/Wiki'
import { WikiImage } from '@/components/WikiImage'
import { MEDIA_POST_DEFAULT_ID } from '@/data/Constants'
import { checkMediaDefaultId, constructMediaUrl } from '@/utils/mediaUtils'
import { ImageInput, Dropzone } from '@/components/Elements'

const MAX_MEDIA = 12

const MediaModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
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

  const deleteMedia = (mediaId: string) => {
    dispatch({
      type: 'wiki/removeMedia',
      payload: {
        id: mediaId,
      },
    })
  }

  const handleSetImage = (name: string, value: ArrayBuffer) => {
    if (wiki.media !== undefined && wiki.media?.length >= MAX_MEDIA) {
      toast({
        title: `You cannot upload more than ${MAX_MEDIA} media. You can delete some existing media to create more spaces`,
        status: 'error',
        duration: 3000,
      })
      return
    }
    const id = `${uuidv4()}_${MEDIA_POST_DEFAULT_ID}`
    const fileSize = value.byteLength / 1024 ** 2
    if (fileSize > 10) {
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
        name,
        size: shortenBalance(fileSize),
        id,
        source: 'IPFS_IMG',
      },
    })
    uploadImageToIPFS({ id, type: value })
  }

  const dropZoneActions = {
    setImage: handleSetImage,
    showFetchedImage: false,
    textType: 'image',
  }

  return isOpen ? (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl" {...rest}>
      <ModalOverlay />
      <ModalContent
        w="min(95vw, 600px)"
        _dark={{
          bg: 'gray.800',
        }}
      >
        <ModalHeader>
          <VStack align="start">
            <Text fontSize="lg" fontWeight="bold">
              Add Image or Video to Media Gallery
            </Text>
            <Text fontSize="sm" fontWeight="normal">
              Adding media makes an article more interactive and engaging. You
              can upload jpg, gif and png files or link to youtube videos.
            </Text>
          </VStack>
        </ModalHeader>
        <Divider />
        <ModalBody>
          <Box mt="3">
            <Text fontWeight="bold">Uploads</Text>
            {wiki.media !== undefined && wiki.media?.length > 0 && (
              <Box
                my={4}
                display="flex"
                justifyContent={{ base: 'center', md: 'left' }}
                maxH="162px"
                borderWidth="1px"
                p={5}
                borderRadius={8}
                overflow="auto"
              >
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacingY={6}
                  spacingX={12}
                >
                  {wiki.media.map(media => (
                    <Flex key={media.id} gap={4} color="linkColor">
                      <Box mt={1}>
                        {!checkMediaDefaultId(media.id) ? (
                          <WikiImage
                            cursor="pointer"
                            flexShrink={0}
                            imageURL={
                              media.source !== 'YOUTUBE'
                                ? constructMediaUrl(media)
                                : `https://i3.ytimg.com/vi/${media.name}/maxresdefault.jpg`
                            }
                            h={{ base: '30px', lg: '40px' }}
                            w={{ base: '30px', lg: '40px' }}
                            borderRadius="lg"
                            overflow="hidden"
                            mt="1"
                          />
                        ) : (
                          <RiImageLine size="40" />
                        )}
                      </Box>
                      <VStack>
                        <Flex w="full">
                          {media.name && (
                            <Box flex="1">
                              <Text fontSize="sm">
                                {shortenText(media.name, 15)}
                              </Text>
                            </Box>
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
                            h="3px"
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

            <Flex
              direction="column"
              gap={5}
              w="full"
              borderRadius="7px"
              py={5}
              mb={3}
            >
              <Dropzone
                dropZoneActions={dropZoneActions}
                dropzonePlaceHolderTitle={`Drag and drop an ${dropZoneActions.textType} or click to select.`}
                dropzonePlaceHolderSize="(10mb max)"
                aspectRatio={8 / 3}
                mediaModal
              />
              <ImageInput
                setImage={handleSetImage}
                showFetchedImage={false}
                modalUpload
              />
            </Flex>
            {wiki.media !== undefined && wiki.media?.length > 0 && (
              <Box mb={8} justifyContent="center" display="flex">
                <Stack spacing={4} direction="row" align="center">
                  <Button size="md" onClick={onClose}>
                    <Text fontSize="xs">Save</Text>
                  </Button>
                  <Button onClick={onClose} variant="outline" size="md">
                    <Text fontSize="xs">Cancel</Text>
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null
}

export default MediaModal
