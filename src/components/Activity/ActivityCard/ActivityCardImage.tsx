import { WIKI_IMAGE_ASPECT_RATIO, IMAGE_BOX_SIZE } from '@/data/Constants'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { AspectRatio, Link } from '@chakra-ui/react'
import { Image as ActivityImage } from '@/components/Elements/Image/Image'
import { Image } from '@everipedia/iq-utils'

interface ActivityCardImageProps {
  title: string
  link: string
  isNotifSubCard: boolean
  wikiImgObj?: Image[]
}

const ActivityCardImage = ({
  title,
  link,
  isNotifSubCard,
  wikiImgObj,
}: ActivityCardImageProps) => {
  return (
    <Link href={link} mr={4} display={{ base: 'none', md: 'block' }}>
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
