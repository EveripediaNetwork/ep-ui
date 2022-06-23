import React, { useEffect } from 'react'
import {
  LinkBox,
  LinkOverlay,
  Text,
  SimpleGrid,
  Spinner,
  Center,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useGetCategoriesQuery } from '@/services/categories'
import { Category } from '@/types/CategoryDataTypes'
import { Image } from '@/components/Elements/Image/Image'
import { useTranslation } from 'react-i18next'

const CategoriesList = () => {
  const { data: categoriesData } = useGetCategoriesQuery()
  const [categories, setCategories] = React.useState<Category[]>([])

  useEffect(() => {
    setCategories(categoriesData || [])
  }, [categoriesData])

  const { t } = useTranslation()

  return (
    <>
      <Text
        align="center"
        mt={{ base: '10', lg: '20' }}
        fontWeight="semibold"
        fontSize="2xl"
        mb={0}
        px={{ base: 6, lg: 20 }}
      >
        {`${t('browseCategory')}`}
      </Text>
      <SimpleGrid
        maxW="1050px"
        w="100%"
        mx="auto"
        columns={[1, 2, 3]}
        spacingX={6}
        spacingY={12}
        py={{ base: 6, lg: 0 }}
        px={{ base: 6, lg: 0 }}
      >
        {categories.map(category => (
          <LinkBox
            key={category.id}
            _hover={{ boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px' }}
            cursor="pointer"
            bgColor="cardBg"
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

            <Text
              py="4"
              w="100%"
              textAlign="center"
              fontWeight="bold"
              fontSize="lg"
              size="md"
            >
              <NextLink href={`/categories/${category.id}`} passHref>
                <LinkOverlay>{category.title}</LinkOverlay>
              </NextLink>
            </Text>
          </LinkBox>
        ))}
      </SimpleGrid>
      {categories.length < 1 && (
        <Center w="full" h="16">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  )
}

export default CategoriesList
