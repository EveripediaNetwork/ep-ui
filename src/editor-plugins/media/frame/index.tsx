import { WikiImage } from '@/components/WikiImage'
import config from '@/config'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import { store } from '@/store/store'
import { Media } from '@/types/Wiki'
import { constructMediaUrl } from '@/utils/mediaUtils'
import {
  Box,
  Center,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  Image,
  AspectRatio,
} from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'
import { RiImage2Line, RiVideoLine, RiCloseLine } from 'react-icons/ri'

const MediaFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  const [media, setMedia] = React.useState<Media[]>()
  const { eventEmitter } = editorContext

  function handleImageClick(m: Media): void {
    eventEmitter.emit('command', 'insertImage', {
      src: `${config.pinataBaseUrl}${m.id}`,
      alt: m.name,
    })
  }

  function handleVideoClick(m: Media): void {
    eventEmitter.emit('command', 'insertVideo', {
      src: `${m.id}`,
      alt: m.name,
    })
  }

  const deleteMedia = (mediaId: string) => {
    store.dispatch({
      type: 'wiki/removeMedia',
      payload: {
        id: mediaId,
      },
    })
  }

  const fetchReferences = () => {
    const fetchedMedia = store.getState().wiki.media
    setMedia(fetchedMedia)
  }

  useEffect(() => {
    fetchReferences()
    store.subscribe(fetchReferences)
  }, [])

  return (
    <Box>
      {media && media.length ? (
        <Box>
          <Heading fontSize="20px" mb="2px">
            Insert Media
          </Heading>
          <Text
            mb="10px"
            color="#2D3748 !important"
            _dark={{ color: '#ffffffa3 !important' }}
          >
            All media files will be displayed here. Click on them to insert to
            wiki.
          </Text>
          <SimpleGrid columns={3} gap={4}>
            {media.map(m => {
              if (m.source === 'IPFS_IMG') {
                return (
                  <Box key={m.id} pos="relative" h="100%">
                    <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO}>
                      <WikiImage
                        w="100%"
                        h="100%"
                        borderRadius="3px"
                        overflow="hidden"
                        key={m.id}
                        onClick={() => handleImageClick(m)}
                        cursor="pointer"
                        imageURL={constructMediaUrl(m)}
                      />
                    </AspectRatio>
                    <Icon
                      as={RiImage2Line}
                      pos="absolute"
                      bottom={0}
                      left={0}
                      fontSize="1.5rem"
                      color="#ffffff"
                      bgColor="#0000004f"
                    />
                    <Center
                      pos="absolute"
                      top="-10"
                      right="-10"
                      color="white"
                      bgColor="#1A202C"
                      w="24px"
                      h="24"
                      zIndex={3}
                      borderRadius="50%"
                      _dark={{ color: '#1A202C', bgColor: 'white' }}
                    >
                      <RiCloseLine
                        cursor="pointer"
                        onClick={() => deleteMedia(m.id)}
                        color="inherit"
                        size="14"
                      />
                    </Center>
                  </Box>
                )
              }
              if (m.source === 'YOUTUBE') {
                return (
                  <Box key={m.id} pos="relative" h="100%">
                    <AspectRatio ratio={WIKI_IMAGE_ASPECT_RATIO}>
                      <Image
                        src={
                          m.source !== 'YOUTUBE'
                            ? constructMediaUrl(m)
                            : `https://i3.ytimg.com/vi/${m.name}/maxresdefault.jpg`
                        }
                        onClick={() => handleVideoClick(m)}
                        h="100%"
                        w="100%"
                        objectFit="contain"
                        bgColor="fadedText2"
                        borderRadius="3px"
                        cursor="pointer"
                      />
                    </AspectRatio>
                    <Icon
                      as={RiVideoLine}
                      pos="absolute"
                      bottom={0}
                      left={0}
                      fontSize="1.5rem"
                      color="#ffffff"
                      bgColor="#0000004f"
                    />
                  </Box>
                )
              }
              return null
            })}
          </SimpleGrid>
        </Box>
      ) : (
        <Center h="150px" w="100% !important">
          <VStack>
            <Heading fontSize="20px" mb="2px">
              No Media Found
            </Heading>
            <Text
              textAlign="center"
              maxW="300px"
              mb="10px"
              color="#2D3748 !important"
              _dark={{ color: '#ffffffa3 !important' }}
            >
              To add media files, click on the &quot;Add new image and
              video&quot; button at the right of editor
            </Text>
          </VStack>
        </Center>
      )}
    </Box>
  )
}

export default MediaFrame
