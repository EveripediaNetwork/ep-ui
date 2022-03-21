import React, { useEffect } from 'react'
import { LinkBox, LinkOverlay, Box, Text, SimpleGrid } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useGetCategoriesQuery } from '@/services/categories'
import { Category } from '@/types/CategoryDataTypes'
import { Image } from '../Elements/Image/Image'

const CategoriesList = () => {
  const { data: categoriesData } = useGetCategoriesQuery()
  const [categories, setCategories] = React.useState<Category[]>([])

  useEffect(
    () =>
      setCategories([
        {
          id: '#',
          title: 'All Categories',
          cardImage: `https://picsum.photos/seed/categories/400/580`,
          heroImage: '',
          icon: '',
        },
        ...(categoriesData || []),
      ]),
    [categoriesData],
  )
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
        {categories.map(category => (
          <LinkBox
            key={category.id}
            _hover={{ boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px' }}
            cursor="pointer"
            bgColor="homeCardBg"
            borderRadius="lg"
            overflow="hidden"
            shadow="base"
          >
            <Image
              bgColor="DimColor"
              src={category.cardImage || '/'}
              h="180px"
              w="100%"
            />
            <NextLink href={`/categories/${category.id}`} passHref>
              <LinkOverlay>
                <Text
                  w="100%"
                  textAlign="center"
                  py={4}
                  fontWeight="bold"
                  fontSize="lg"
                  size="md"
                >
                  {category.title}
                </Text>
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default CategoriesList
