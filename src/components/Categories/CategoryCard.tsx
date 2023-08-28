import React from 'react'
import { VStack, Heading, Text, Box, LinkBox, Icon } from '@chakra-ui/react'
import {
  CATEGORY_DESCRIPTION_WORD_LIMIT,
  IMAGE_BOX_SIZE,
  WIKI_IMAGE_ASPECT_RATIO,
} from '@/data/Constants'
import { Image } from '../Elements/Image/Image'
import LinkOverlay from '@/components/Elements/LinkElements/LinkOverlay'
import { CategoryCardProps } from '@/types/CategoryDataTypes'

const CategoryCard = (props: CategoryCardProps) => {
  const { imageCard, coverIcon, title, brief, categoryId } = props
  return (
    <LinkBox
      bgColor="cardBg"
      borderWidth="1px"
      borderColor="wikiCardBorderColor"
      transition="all 0.3s"
      _hover={{
        boxShadow: '3xl',
        transform: 'scale(1.02)',
        _dark: {
          boxShadow: '0px 25px 50px -12px rgba(16, 16, 17, 0.25)',
        },
      }}
      overflow="hidden"
      borderRadius="12px"
      key={categoryId}
    >
      <VStack cursor="pointer">
        <Box w="100%" position="relative">
          <Image
            src={imageCard}
            width="full"
            height="150px"
            objectPosition={'top'}
            alt={title}
            loading="lazy"
            imgW={IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
            imgH={IMAGE_BOX_SIZE}
          />
          <Box position="absolute" bottom="0" left="50%">
            <Icon
              transform="translateX(-50%) translateY(50%)"
              as={coverIcon}
              borderRadius="100px"
              overflow="hidden"
              borderWidth="5px"
              bgColor={`hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`}
              color="#0000002f"
              borderColor="cardBg"
              width="60px"
              height="60px"
              padding={2}
            />
          </Box>
        </Box>

        <Box p={5}>
          <Heading
            textAlign="center"
            fontSize={{ base: 14, xl: '20px' }}
            fontWeight={'600'}
            color={'careersHeadingColor'}
            my="10px"
          >
            {title}
          </Heading>
          <LinkOverlay href={`/categories/${categoryId}`}>
            <Text
              maxWidth="300px"
              fontSize={'xs'}
              textAlign="center"
              color={'homeDescriptionColor'}
            >
              {brief.length > CATEGORY_DESCRIPTION_WORD_LIMIT
                ? brief.slice(0, CATEGORY_DESCRIPTION_WORD_LIMIT).concat('...')
                : brief}
            </Text>
          </LinkOverlay>
        </Box>
      </VStack>
    </LinkBox>
  )
}

export default CategoryCard
