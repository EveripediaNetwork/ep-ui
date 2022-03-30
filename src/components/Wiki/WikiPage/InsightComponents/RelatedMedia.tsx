import { AspectRatio, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import React from 'react'
import MediaPreview from '@/components/Elements/MediaPreview/MediaPreview'
import { sampleRelatedMedia } from '@/data/WikiInsightsData'
import WikiAccordion from '../../WikiAccordion'

const RelatedMedia = () => {
  const getImageSrc = (media: any) => {
    if (media.type === 'image') {
      return media.link
    }
    if (media.type === 'youtube') {
      return `https://i3.ytimg.com/vi/${
        media.link.split('=')[1]
      }/maxresdefault.jpg`
    }
    return media.link
  }
  return (
    <VStack w="100%" p={4} spacing={4} borderWidth="1px" borderRadius={2}>
      <WikiAccordion title="Media">
        <SimpleGrid columns={3} spacing={5}>
          {sampleRelatedMedia.map((media: any) => (
            <AspectRatio ratio={1}>
              <MediaPreview
                type={media.type}
                src={media.link}
                bgColor="dimColor"
                borderRadius={4}
                w="100%"
                h="100%"
                overflow="hidden"
              >
                <Image
                  src={getImageSrc(media)}
                  h="100%"
                  w="100%"
                  objectFit="cover"
                />
              </MediaPreview>
            </AspectRatio>
          ))}
        </SimpleGrid>
      </WikiAccordion>
    </VStack>
  ) /*  */
}

export default RelatedMedia
