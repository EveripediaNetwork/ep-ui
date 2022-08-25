import React from 'react'
import {
  LinkBox,
  LinkOverlay,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  Heading,
  VStack,
} from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { useTranslation } from 'react-i18next'
import { Category } from '@/types/CategoryDataTypes'

interface CategoriesListProps {
  categories: Category[]
}
const CategoriesList = ({ categories }: CategoriesListProps) => {
  const { t } = useTranslation()

  return (
    <VStack mb={12} spacing={2}>
      <Heading
        textAlign="center"
        fontWeight="700"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('browseCategory')}`}
      </Heading>
      <Text
        color="gray.500"
        fontSize={{ base: 'lg', lg: 22 }}
        pb={9}
        textAlign="center"
        maxW="750"
      >{`${t('trendingWikisDescription')}`}</Text>
      <SimpleGrid
        maxW="1050px"
        w="100%"
        mx="auto"
        columns={[1, 2, 3]}
        spacingX={6}
        spacingY={12}
        px={6}
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
              h="200px"
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
              <LinkOverlay href={`/categories/${category.id}`}>
                {category.title}
              </LinkOverlay>
            </Text>
          </LinkBox>
        ))}
      </SimpleGrid>
      {categories.length < 1 && (
        <Center w="full" h="16">
          <Spinner size="xl" />
        </Center>
      )}
    </VStack>
  )
}

export default CategoriesList
