import React from 'react'
import { Text, SimpleGrid, Heading, VStack, Flex, Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { CategoryDataType } from '@/types/CategoryDataTypes'
import { LinkButton } from '../Elements'
import { AllCategoriesData } from '@/data/AllCategoriesData'
import CategoryCard from '../Categories/CategoryCard'

const NUM_OF_CATEGORIES = 6

const CategoriesList = () => {
  const { t } = useTranslation()
  const newCategoryList: CategoryDataType[] = []

  while (newCategoryList.length < NUM_OF_CATEGORIES) {
    const randIndex = Math.floor(Math.random() * AllCategoriesData.length)
    const randCategory = AllCategoriesData[randIndex]

    if (!newCategoryList.includes(randCategory)) {
      newCategoryList.push(randCategory)
    }

    if (
      randIndex === AllCategoriesData.length - 1 &&
      !newCategoryList.includes(AllCategoriesData[randIndex])
    ) {
      newCategoryList.push(AllCategoriesData[randIndex])
    }
  }

  return (
    <VStack py={{ base: 16, md: 20, lg: 24 }} spacing={2}>
      <Heading
        textAlign="center"
        fontWeight="600"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('browseCategory')}`}
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: '20px' }}
        pb={9}
        px={4}
        textAlign="center"
        maxW="800"
      >{`${t('browseCategoryDescription')}`}</Text>
      <SimpleGrid
        maxW="1290px"
        w="100%"
        mx="auto"
        gridTemplateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        spacingX={6}
        spacingY={12}
        px={6}
      >
        {newCategoryList?.map(
          (category) =>
            category.cardImage && (
              <CategoryCard
                key={category.id}
                imageCard={category.cardImage}
                title={category.title}
                brief={category.description}
                categoryId={category.id}
                coverIcon={category.icon}
              />
            ),
        )}
      </SimpleGrid>
      <Box mt="10 !important">
        <Flex justifyContent="center">
          <LinkButton
            href="/categories"
            h="50px"
            w={{ base: 32, lg: 40 }}
            variant="outline"
            bgColor="btnBgColor"
            prefetch={false}
          >
            View More
          </LinkButton>
        </Flex>
      </Box>
    </VStack>
  )
}

export default CategoriesList
