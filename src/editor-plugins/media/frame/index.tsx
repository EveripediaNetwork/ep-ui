import { WikiImage } from '@/components/WikiImage'
import config from '@/config'
import { store } from '@/store/store'
import { Media } from '@/types/Wiki'
import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React, { useEffect } from 'react'

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
        <SimpleGrid columns={3} gap={4}>
          {media.map(m => {
            if (m.type === 'IMAGE')
              return (
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
              )
            return null
          })}
        </SimpleGrid>
      ) : (
        <Center h="100px" w="100% !important">
          <Text textAlign="center" color="#758093" maxW="250px">
            Your Media files will be displayed here as you add them.
          </Text>
        </Center>
      )}
    </Box>
  )
}

export default MediaFrame
