import { SimpleGrid, VStack } from '@chakra-ui/react'
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
          columns={{ base: 2, sm: 4, md: 5, lg: 8, xl: 3 }}
          spacing={5}
        >
          {media.map((m, i) => (
            <MediaPreview
              type={m.source}
              src={constructMediaUrl(m)}
              key={i}
              bgColor="dimColor"
              borderRadius={4}
              w="90px"
              h="90px"
              overflow="hidden"
              data-caption={m?.caption}
            >
              <Image
                src={
                  m.source !== 'YOUTUBE'
                    ? constructMediaUrl(m)
                    : `https://i3.ytimg.com/vi/${m.name}/maxresdefault.jpg`
                }
                alt="related media"
                imgH={90}
                imgW={90}
                hideOnError
                objectFit="cover"
                bgColor="fadedText2"
              />
            </MediaPreview>
          ))}
        </SimpleGrid>
      </WikiAccordion>
    </VStack>
  )
}

export default RelatedMediaGrid
