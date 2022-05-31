import { AspectRatio, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import React from 'react'
import MediaPreview from '@/components/Elements/MediaPreview/MediaPreview'
import WikiAccordion from '../../WikiAccordion'
import { Media } from '@/types/Wiki'
import { constructMediaUrl } from '@/utils/mediaUtils'

const RelatedMediaGrid = ({media}: {media:Media[]}) => {
  return (
    <VStack w="100%" spacing={4} borderRadius={2}>
      <WikiAccordion title="Media">
        <SimpleGrid columns={3} spacing={5}>
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
                  src={constructMediaUrl(m)}
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  bgColor="gray.500"
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
