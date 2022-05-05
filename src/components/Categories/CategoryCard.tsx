import React from 'react'
import {
  VStack,
  Heading,
  Text,
  Box,
  LinkBox,
  LinkOverlay,
  Icon,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { getBootStrapIcon } from '@/utils/getBootStrapIcon'
import { CATEGORY_DESCRIPTION_WORD_LIMIT } from '@/data/Constants'
import { Image } from '../Elements/Image/Image'

interface CategoryCardProps {
  imageCard: string
  coverIcon: string
  title: string
  brief: string
  categoryId: string
}

const CategoryCard = ({
  imageCard,
  coverIcon,
  title,
  brief,
  categoryId,
}: CategoryCardProps) => {
  const CategoryIcon = getBootStrapIcon(coverIcon)
  return (
    <LinkBox
      as="article"
      bgColor="cardBg"
      borderWidth="1px"
      borderColor="dimColor"
      _hover={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}
      overflow="hidden"
      borderRadius="12px"
    >
      <VStack
        cursor="pointer"
        boxShadow="box-shadow:
  6.7px 6.7px 5.3px rgba(0, 0, 0, 0.008),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.012),
  100px 100px 80px rgba(0, 0, 0, 0.02)
;"
      >
        <Box w="100%" position="relative">
          <Image src={imageCard} width="100%" height="150px" alt={title} />
          <Box position="absolute" bottom="0" left="50%">
            <Icon
              transform="translateX(-50%) translateY(50%)"
              as={CategoryIcon}
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

        <Box p={8}>
          <NextLink href={`/categories/${categoryId}`} passHref>
            <LinkOverlay>
              <Heading textAlign="center" size="sm" my="10px">
                {title}
              </Heading>
            </LinkOverlay>
          </NextLink>
          <Text maxWidth="300px" fontSize="xs" textAlign="center" opacity="0.6">
            {brief.length > CATEGORY_DESCRIPTION_WORD_LIMIT
              ? brief.slice(0, CATEGORY_DESCRIPTION_WORD_LIMIT).concat('...')
              : brief}
          </Text>
        </Box>
      </VStack>
    </LinkBox>
  )
}

export default CategoryCard
