import { WIKI_IMAGE_ASPECT_RATIO, IMAGE_BOX_SIZE } from '@/data/Constants'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { AspectRatio, Link } from '@chakra-ui/react'
import { Image as ActivityImage } from '@/components/Elements/Image/Image'
import { ActivityCardImageProps } from '@/types/ActivityDataType'
import NextLink from 'next/link'

const ActivityCardImage = (props: ActivityCardImageProps) => {
  const { title, link, isNotifSubCard, wikiImgObj } = props
  return (
    <Link as={NextLink} href={link} mr={4} display={{ base: 'none', md: 'block' }}>
      <AspectRatio
        ratio={WIKI_IMAGE_ASPECT_RATIO}
        w={{
          base: isNotifSubCard ? '80px' : '100px',
          md: '140px',
          lg: '156px',
        }}
      >
        <ActivityImage
          boxSize="100%"
          cursor="pointer"
          flexShrink={0}
          src={getWikiImageUrl(wikiImgObj)}
          borderRadius="lg"
          overflow="hidden"
          alt={title}
          imgBoxSize={IMAGE_BOX_SIZE}
        />
      </AspectRatio>
    </Link>
  )
}

export default ActivityCardImage
