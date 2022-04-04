import { AspectRatio, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import React from 'react'
import MediaPreview from '@/components/Elements/MediaPreview/MediaPreview'
import { sampleRelatedMedia } from '@/data/WikiInsightsData'
import { RelatedMedia } from '@/types/WikiInsightsDataType'
import WikiAccordion from '../../WikiAccordion'

const RelatedMediaGrid = () => {
  const getImageSrc = (media: RelatedMedia) => {
    if (media.type === 'youtube') {
      const videoID = new URL(media.link).searchParams.get('v') || ''
      return `https://i3.ytimg.com/vi/${videoID}/maxresdefault.jpg`
    }

    if (media.type === 'vimeo') {
      const videoID = media.link.replace(
        /(https?:\/\/)?(www\.)?vimeo\.com\//,
        '',
      )
      return `https://vumbnail.com/${videoID}.jpg`
    }

    if (media.type === 'video') return media.thumbnail

    if (media.type === 'audio')
      // transparent placeholder
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='

    return media.link
  }
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <WikiAccordion title="Media">
        <SimpleGrid columns={3} spacing={5}>
          {sampleRelatedMedia.map((media, i) => (
            <AspectRatio ratio={1} key={i}>
              <MediaPreview
                type={media.type}
                src={media.link}
                bgColor="dimColor"
                borderRadius={4}
                w="100%"
                h="100%"
                overflow="hidden"
                data-caption={media.caption}
              >
                <Image
                  src={getImageSrc(media)}
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  bgColor={`hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`}
                />
              </MediaPreview>
            </AspectRatio>
          ))}
        </SimpleGrid>
      </WikiAccordion>
    </VStack>
  )
}

export default RelatedMediaGrid
