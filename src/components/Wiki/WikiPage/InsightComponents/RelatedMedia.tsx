import { AspectRatio, SimpleGrid, VStack } from '@chakra-ui/react'
import React from 'react'
import MediaPreview from '@/components/Elements/MediaPreview/MediaPreview'
import { Media } from '@everipedia/iq-utils'
import { constructMediaUrl } from '@/utils/mediaUtils'
import { Image } from '@/components/Elements/Image/Image'
import WikiAccordion from '../../WikiAccordion'

const RelatedMediaGrid = ({ media }: { media?: Media[] }) => {
  if (!media || media.length === 0) return null
  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion title="Media">
        <SimpleGrid
          columns={{ base: 3, sm: 5, md: 6, lg: 8, xl: 3 }}
          spacing={5}
        >
          {media.map((m, i) => (
            <AspectRatio ratio={1} key={i}>
              <MediaPreview
                type={m.source}
                src={constructMediaUrl(m)}
                bgColor="dimColor"
                borderRadius={4}
                w="100%"
                h="100%"
                overflow="hidden"
                data-caption={m?.caption}
              >
                <Image
                  src={
                    m.source !== 'YOUTUBE'
                      ? constructMediaUrl(m)
                      : `https://i3.ytimg.com/vi/${m.name}/maxresdefault.jpg`
                  }
                  imgH={100}
                  imgW={100}
                  alt="related media"
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
