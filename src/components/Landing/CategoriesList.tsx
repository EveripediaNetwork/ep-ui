import React from 'react'
import {
  Heading,
  LinkBox,
  LinkOverlay,
  Box,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { sampleCategories } from '@/data/CategoriesData'
import { Image } from '../Elements/Image/Image'

const CategoriesList = () => {
  const categoriesData = [
    {
      slug: 'categories',
      title: 'All Categories',
      imageCard: `https://picsum.photos/seed/categories/400/580`,
    },
    ...sampleCategories,
  ]
  return (
    <Box>
      <Text align="center" fontWeight="semibold" fontSize="2xl" mb={8}>
        Browse by category
      </Text>
      <SimpleGrid
        maxW="1050px"
        mx="auto"
        columns={[1, 2, 3]}
        spacingX={6}
        spacingY={12}
      >
        {categoriesData.map(category => (
          <LinkBox
            key={category.slug}
            _hover={{ boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px' }}
            cursor="pointer"
            borderWidth="1px"
            borderColor="#2222222a"
            bgColor="homeCardBg"
            borderRadius="12px"
            overflow="hidden"
          >
            <Image
              bgColor="#0000002a"
              src={category.imageCard}
              h="180px"
              w="100%"
            />
            <NextLink href={category.slug} passHref>
              <LinkOverlay>
                <Heading w="100%" textAlign="center" py={4} size="md">
                  {category.title}
                </Heading>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default CategoriesList
