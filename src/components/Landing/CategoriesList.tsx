import React from 'react'
import {
  LinkBox,
  Text,
  SimpleGrid,
  Heading,
  VStack,
  Flex,
  Box,
} from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import { useTranslation } from 'react-i18next'
import { CategoryDataType } from '@/types/CategoryDataTypes'
import { WIKI_IMAGE_ASPECT_RATIO } from '@/data/Constants'
import LinkOverlay from '../Elements/LinkElements/LinkOverlay'
import { LinkButton } from '../Elements'
import { AllCategoriesData } from '@/data/AllCategoriesData'

const CATEGORY_IMAGE_BOX_SIZE = 300
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
    <VStack pt={{ base: '15', md: '90' }} mb={20} spacing={2}>
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
        maxW="1208px"
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
              _hover={{
                boxShadow: '3xl',
                transform: 'scale(1.02)',
                _dark: {
                  boxShadow: '0px 25px 50px -12px rgba(16, 16, 17, 0.25)',
                },
              }}
              transition="all 0.3s"
              cursor="pointer"
              bgColor="cardBg"
              border={'1px'}
              borderColor={'gray.100'}
              borderRadius="lg"
              overflow="hidden"
              _dark={{
                borderColor: 'whiteAlpha.300',
              }}
            >
              <LinkOverlay href={`/categories/${category.id}`}>
                <Image
                  bgColor="DimColor"
                  src={category.cardImage}
                  h={{ base: '200px', md: '225px', xl: '300px' }}
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
    </VStack>
  )
}

export default CategoriesList
