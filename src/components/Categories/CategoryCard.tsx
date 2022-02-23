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
import { IconType } from 'react-icons/lib'
import { Image } from '../Elements/Image/Image'

interface CategoryCardProps {
  imageCard: string
  coverIcon?: IconType
  title: string
  brief: string
  categoryUrl: string
}

const CategoryCard = ({
  imageCard,
  coverIcon,
  title,
  brief,
  categoryUrl,
}: CategoryCardProps) => (
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

      <Box p={8}>
        <NextLink href={categoryUrl} passHref>
          <LinkOverlay>
            <Heading textAlign="center" size="sm" my="10px">
              {title}
            </Heading>
          </LinkOverlay>
        </NextLink>
        <Text maxWidth="250px" fontSize="md" textAlign="center" opacity="0.6">
          {brief.length > 100 ? brief.slice(0, 100).concat('...') : brief}
        </Text>
      </Box>
    </VStack>
  </LinkBox>
)

export default CategoryCard
