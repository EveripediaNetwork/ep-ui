import { WikiImage } from '@/components/WikiImage'
import config from '@/config'
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
} from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'
import { RiImage2Fill } from 'react-icons/ri'

const MediaFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  const [media, setMedia] = React.useState<Media[]>()
  function handleImageClick(m: Media): void {
    editorContext.eventEmitter.emit('command', 'insertImage', {
      src: `${config.pinataBaseUrl}${m.id}`,
      alt: m.name,
    })
  }

  function handleVideoClick(m: Media): void {
    editorContext.eventEmitter.emit('command', 'insertVideo', {
      src: `${m.id}`,
      alt: m.name,
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
          <Text mb="10px" color="#758093">
            All media files will be displayed here. Click on them to insert to
            wiki.
          </Text>
          <SimpleGrid columns={3} gap={4}>
            {media.map(m => {
              if (m.source === 'IPFS_IMG') {
                return (
                  <Box key={m.id} pos="relative" h="100%">
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
                    <Icon
                      as={RiImage2Fill}
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
              if (m.source === 'YOUTUBE') {
                return (
                  <Box key={m.id} pos="relative" h="100%">
                    <Image
                      src={
                        m.source !== 'YOUTUBE'
                          ? constructMediaUrl(m)
                          : `https://i3.ytimg.com/vi/${m.name}/maxresdefault.jpg`
                      }
                      onClick={() => handleVideoClick(m)}
                      h="100%"
                      w="100%"
                      objectFit="cover"
                      bgColor="gray.500"
                      borderRadius="3px"
                      cursor="pointer"
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
            <Text textAlign="center" maxW="300px" mb="10px" color="#758093">
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
