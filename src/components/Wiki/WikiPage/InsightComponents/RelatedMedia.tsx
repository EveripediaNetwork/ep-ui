import { AspectRatio, SimpleGrid, VStack } from '@chakra-ui/react'
import React from 'react'
import MediaPreview from '@/components/Elements/MediaPreview/MediaPreview'
import { Media } from '@everipedia/iq-utils'
import { constructMediaUrl } from '@/utils/mediaUtils'
import { Image } from '@/components/Elements/Image/Image'
import WikiAccordion from '../../WikiAccordion'

const RELATED_MEDIA_IMAGE_BOX_SIZE = 150

const RelatedMediaGrid = ({ media }: { media?: Media[] }) => {
  if (!media || media.length === 0) return null
  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion title="Media">
        <SimpleGrid
          columns={{ base: 3, xl: 3, sm: 4, md: 6, '2xl': 4 }}
          spacing={3}
        >
          {media.map((m, i) => (
            <AspectRatio ratio={1} key={i}>
              <MediaPreview
                type={m.source}
                src={constructMediaUrl(m)}
                key={i}
                bgColor="dimColor"
                borderRadius={4}
                boxSize="100%"
                overflow="hidden"
                data-caption={m?.caption}
              >
                <Image
                  boxSize="100%"
                  src={
                    m.source !== 'YOUTUBE'
                      ? constructMediaUrl(m)
                      : `https://i3.ytimg.com/vi/${m.name}/maxresdefault.jpg`
                  }
                  alt="related media"
                  imgH={RELATED_MEDIA_IMAGE_BOX_SIZE}
                  imgW={RELATED_MEDIA_IMAGE_BOX_SIZE}
                  hideOnError
                  objectFit="cover"
                  bgColor="fadedText2"
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
