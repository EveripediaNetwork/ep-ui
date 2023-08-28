import React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Divider, Box, Heading, SimpleGrid, Flex, Text } from '@chakra-ui/react'
import CategoryCard from '@/components/Categories/CategoryCard'
import { useTranslation } from 'react-i18next'
import { AllCategoriesData } from '@/data/AllCategoriesData'

const CATEGORY_HEADER =
  'Explore your endless curiosities in different categories on IQ.Wiki, Ranging from NFTs, to DeFi, Cryptocurrencies and more.'
const Categories: NextPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <NextSeo
        title="Wiki Category"
        description={CATEGORY_HEADER}
        openGraph={{
          title: 'Wiki Category',
          description: CATEGORY_HEADER,
        }}
      />
      <Box mt="0" pb={12}>
        <Flex
          h={{ base: '223px', md: '270px', lg: '338px' }}
          justify={'center'}
          align={'center'}
          objectFit="cover"
          bgColor="careersBackground"
          backgroundImage="/images/backgrounds/homepage-bg-white.png"
          _dark={{
            backgroundImage: '/images/backgrounds/careers-background-dark.png',
          }}
        >
          <Box width="full">
            <Heading
              fontSize={{ base: 25, lg: 36 }}
              maxW="80%"
              mx="auto"
              textAlign="center"
              pb={{ base: 2, md: 4, lg: 5 }}
              as="h1"
            >
              {`${t('wikiCategory')}`}
            </Heading>
            <Flex
              textAlign="center"
              justifyContent="center"
              fontWeight="400"
              mx="auto"
              maxW={{ base: '90%', md: '70%', lg: '730px' }}
            >
              <Text
                mb={7}
                fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                mx={{ base: '5', md: '8', lg: '14' }}
              >
                {CATEGORY_HEADER}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Divider />
        <Box mt={16}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            width="min(90%, 1200px)"
            mx="auto"
            my={12}
            gap={8}
          >
            {AllCategoriesData?.map(
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
        </Box>
      </Box>
    </>
  )
}

export default Categories
