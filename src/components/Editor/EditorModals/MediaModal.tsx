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
  Select,
} from '@chakra-ui/react'
import { RiCloseLine, RiImageLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { shortenText, shortenBalance } from '@/utils/textUtils'
import { v4 as uuidv4 } from 'uuid'
import { saveImage } from '@/utils/CreateWikiUtils/createWiki'
import { MediaType } from '@everipedia/iq-utils'
import { WikiImage } from '@/components/WikiImage'
import { MEDIA_POST_DEFAULT_ID } from '@/data/Constants'
import {
  checkMediaDefaultId,
  constructMediaUrl,
} from '@/utils/DataTransform/mediaUtils'
import { ImageInput, Dropzone } from '@/components/Elements'
import { WikiImageObjectProps } from '@/types/CreateWikiType'

const MAX_MEDIA = 12

const MediaModal = ({
  onClose = () => {},
  isOpen = false,
  ...rest
}: Partial<ModalProps>) => {
  const wiki = useAppSelector(state => state.wiki)
  const dispatch = useAppDispatch()
  const toast = useToast()

  const uploadImageToIPFS = async (image: WikiImageObjectProps) => {
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
        type: MediaType.GALLERY,
        source: 'IPFS_IMG',
      },
    })
    uploadImageToIPFS({ id, type: value })
  }

  const handleSetType = (mediaId: string, type: MediaType) => {
    dispatch({
      type: 'wiki/updateMediaDetails',
      payload: {
        id: mediaId,
        hash: mediaId,
        type,
      },
    })
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
              <SimpleGrid
                mt={4}
                maxH="240px"
                borderWidth="1px"
                p={3}
                borderRadius={8}
                overflowY="scroll"
                columns={{ base: 1, md: 2 }}
                spacing={4}
              >
                {wiki.media.map(media => (
                  <Flex
                    key={media.id}
                    gap={4}
                    w="100%"
                    alignItems="center"
                    color="linkColor"
                  >
                    {!checkMediaDefaultId(media.id) ? (
                      <WikiImage
                        cursor="pointer"
                        alt="media"
                        flexShrink={0}
                        imageURL={
                          media.source !== 'YOUTUBE'
                            ? constructMediaUrl(media)
                            : `https://i3.ytimg.com/vi/${media.name}/maxresdefault.jpg`
                        }
                        boxSize="42"
                        borderRadius="lg"
                        overflow="hidden"
                        mt="1"
                      />
                    ) : (
                      <RiImageLine size="42" />
                    )}
                    <VStack spacing={1} w="full">
                      <Flex w="full">
                        <Text fontSize="sm" flex="1">
                          {media.name
                            ? shortenText(media.name, 15)
                            : 'untitled'}
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
                      {checkMediaDefaultId(media.id) && (
                        <Progress
                          w="full"
                          h="3px"
                          colorScheme="green"
                          size="sm"
                          isIndeterminate
                        />
                      )}
                      <Flex
                        w="full"
                        fontSize="xs"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Select
                          size="xs"
                          maxW="28"
                          variant="outline"
                          value={media.type}
                          onChange={e =>
                            handleSetType(media.id, e.target.value as MediaType)
                          }
                        >
                          <option value={MediaType.GALLERY}>Default</option>
                          <option
                            disabled={
                              wiki.media?.find(
                                m => m.type === MediaType.ICON,
                              ) !== undefined
                            }
                            value={MediaType.ICON}
                          >
                            Token Icon
                          </option>
                        </Select>
                        <Text textAlign="right" flex="1">
                          {media.size}mb
                        </Text>
                      </Flex>
                    </VStack>
                  </Flex>
                ))}
              </SimpleGrid>
            )}
            <Flex direction="column" gap={5} w="full" borderRadius="7px" py={3}>
              <Dropzone
                dropZoneActions={dropZoneActions}
                dropzonePlaceHolderTitle={`Drag and drop an ${dropZoneActions.textType} or click to select.`}
                dropzonePlaceHolderSize="(10mb max)"
                aspectRatio={11 / 3}
                mediaModal
              />
              <ImageInput
                setImage={handleSetImage}
                showFetchedImage={false}
                modalUpload
              />
            </Flex>
            {wiki.media !== undefined && wiki.media?.length > 0 && (
              <Box mb={4} justifyContent="center" display="flex">
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
