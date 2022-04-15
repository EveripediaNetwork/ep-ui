import { WikiImage } from '@/components/WikiImage'
import { useGetWikiPreviewQuery } from '@/services/wikis'
import { getWikiImageUrl } from '@/utils/getWikiImageUrl'
import { getWikiSummary } from '@/utils/getWikiSummary'
import {
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  Text,
} from '@chakra-ui/react'
import React from 'react'

interface WikiPreviewHoverProps {
  href: string
  text: string
  slug: string
}

const WikiPreviewHover = ({ href, text, slug }: WikiPreviewHoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const linkRef = React.useRef<HTMLAnchorElement>(null)
  const { data: wiki } = useGetWikiPreviewQuery(slug)

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      returnFocusOnClose={false}
      aria-label="Wiki preview"
    >
      <PopoverTrigger>
        <a
          ref={linkRef}
          onMouseOver={() => {
            setIsOpen(true)
          }}
          onMouseOut={() => setIsOpen(false)}
          onFocus={() => {}}
          onBlur={() => {}}
          href={href}
        >
          {text}
        </a>
      </PopoverTrigger>
      <PopoverContent
        boxShadow="rgb(4 17 29 / 25%) 0px 0px 8px 0px"
        _focus={{ outline: 'none' }}
        mx={4}
      >
        <PopoverArrow />
        <PopoverHeader>{wiki?.title}</PopoverHeader>
        <PopoverBody>
          <HStack align="start" spacing={3}>
            <WikiImage
              mt={1}
              borderRadius={2}
              overflow="hidden"
              flexShrink={0}
              w="100px"
              h="100px"
              imageURL={getWikiImageUrl(wiki)}
            />
            <Text fontSize="14px">{wiki && getWikiSummary(wiki)}</Text>
          </HStack>
        </PopoverBody>
        {wiki?.tags?.length !== 0 && (
          <PopoverFooter>
            <HStack spacing={2} align="center" flexWrap="wrap">
              <Tag variant="outline" fontWeight="bold">
                Tags:{' '}
              </Tag>
              {wiki?.tags?.map(tag => (
                <Tag
                  bgColor={`hsl(${Math.floor(Math.random() * 360)}, 40%, 80%)`}
                  color="black"
                >
                  {tag.id}
                </Tag>
              ))}
            </HStack>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default WikiPreviewHover
