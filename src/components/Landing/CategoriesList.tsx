import React, { useEffect } from 'react'
import {
  Heading,
  LinkBox,
  LinkOverlay,
  Box,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
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
          description: '',
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
            borderWidth="1px"
            borderColor="DimColor"
            bgColor="homeCardBg"
            borderRadius={3}
            overflow="hidden"
          >
            <Image
              bgColor="DimColor"
              src={category.cardImage}
              h="180px"
              w="100%"
            />
            <NextLink href={`/categories/${category.id}`} passHref>
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
