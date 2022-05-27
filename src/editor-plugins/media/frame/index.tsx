import { WikiImage } from '@/components/WikiImage'
import config from '@/config'
import { store } from '@/store/store'
import { Media } from '@/types/Wiki'
import {
  Box,
  Center,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'
import { RiImage2Fill } from 'react-icons/ri'

const MediaFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  const [media, setMedia] = React.useState<Media[]>()
  function handleImageClick(m: Media): void {
    editorContext.eventEmitter.emit('command', 'insertImage', {
      src: `${config.pinataBaseUrl}${m.ipfs}`,
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
              if (m.type === 'IMAGE')
                return (
                  <Box pos="relative">
                    <WikiImage
                      w="100%"
                      h="100px"
                      borderRadius="3px"
                      overflow="hidden"
                      key={m.id}
                      onClick={() => handleImageClick(m)}
                      cursor="pointer"
                      imageURL={`${config.pinataBaseUrl}${m.ipfs}`}
                    />
                    <Icon
                      as={RiImage2Fill}
                      pos="absolute"
                      bottom={0}
                      left={0}
                      fontSize="1.5rem"
                      color="#ffffff"
                      bgColor="#0000004f"
                      borderRadius="3px"
                    />
                  </Box>
                )
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
