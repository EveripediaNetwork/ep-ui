import React from 'react'
import {
  LinkBox,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  Heading,
  VStack,
  Flex,
  Box,
} from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { useTranslation } from 'react-i18next'
import { Category } from '@/types/CategoryDataTypes'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'
import { LinkButton } from '../Elements'

const CATEGORY_IMAGE_BOX_SIZE = 300
const NUM_OF_CATEGORIES = 6

interface CategoriesListProps {
  categories: Category[]
}
const CategoriesList = ({ categories }: CategoriesListProps) => {
  const { t } = useTranslation()
  const newCategoryList: Category[] = []

  while (newCategoryList.length < NUM_OF_CATEGORIES) {
    const randIndex = Math.floor(Math.random() * categories.length)
    const randCategory = categories[randIndex]

    if (!newCategoryList.includes(randCategory)) {
      newCategoryList.push(randCategory)
    }

    if (
      randIndex === categories.length - 1 &&
      !newCategoryList.includes(categories[randIndex])
    ) {
      newCategoryList.push(categories[randIndex])
    }
  }

  return (
    <VStack mt={10} mb={20} spacing={2}>
      <Heading
        textAlign="center"
        fontWeight="700"
        fontSize={{ base: '3xl', lg: 46 }}
      >
        {`${t('browseCategory')}`}
      </Heading>
      <Text
        color="homeDescriptionColor"
        fontSize={{ base: 'lg', lg: 22 }}
        pb={9}
        px={4}
        textAlign="center"
        maxW="800"
      >{`${t('browseCategoryDescription')}`}</Text>
      <SimpleGrid
        maxW="1050px"
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
        {newCategoryList.map((category) => (
          <div key={category.id}>
            <LinkBox
              _hover={{ boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px' }}
              cursor="pointer"
              bgColor="cardBg"
              borderRadius="lg"
              overflow="hidden"
              shadow="base"
            >
              <LinkOverlay href={`/categories/${category.id}`}>
                <Image
                  bgColor="DimColor"
                  src={new URL(category.cardImage).pathname}
                  h="200px"
                  w="100%"
                  alt={category.title}
                  imgW={CATEGORY_IMAGE_BOX_SIZE * WIKI_IMAGE_ASPECT_RATIO}
                  imgH={CATEGORY_IMAGE_BOX_SIZE}
                />
                <Text
                  py="4"
                  w="100%"
                  textAlign="center"
                  fontWeight="bold"
                  fontSize="lg"
                  size="md"
                >
                  {category.title}
                </Text>
              </LinkOverlay>
            </LinkBox>
          </div>
        ))}
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
      {categories.length < 1 && (
        <Center w="full" h="16">
          <Spinner size="xl" />
        </Center>
      )}
    </VStack>
  )
}

export default CategoriesList
