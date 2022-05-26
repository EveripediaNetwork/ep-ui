import { WikiImage } from '@/components/WikiImage'
import config from '@/config'
import { Media } from '@/types/Wiki'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { PluginContext } from '@toast-ui/editor'
import React from 'react'
import { media } from '../dummyData'

const MediaFrame = ({ editorContext }: { editorContext: PluginContext }) => {
  function handleImageClick(m: Media): void {
    editorContext.eventEmitter.emit('command', 'insertImage', {
      src: `${config.pinataBaseUrl}${m.ipfs}`,
      alt: m.name,
    })
  }

  return (
    <Box>
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
    </Box>
  )
}

export default MediaFrame
