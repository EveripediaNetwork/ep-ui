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
        openGraph={{
          title: 'Wiki Category',
          description: CATEGORY_HEADER,
        }}
      />
      <Box mt="-12" pb={12}>
        <Box
          py={10}
          pt={20}
          width="full"
          objectFit="cover"
          bgColor="profileBannerBg"
          backgroundImage="/images/homepage-bg-white.png"
          _dark={{
            backgroundImage: '/images/homepage-bg-dark.png',
          }}
        >
          <Heading
            fontSize={{ base: 25, lg: 36 }}
            maxW="80%"
            mx="auto"
            textAlign="center"
            p={10}
            as="h1"
          >
            {`${t('wikiCategory')}`}
          </Heading>
          <Flex
            textAlign="center"
            justifyContent="center"
            fontWeight="400"
            mx="auto"
            maxW={{ base: '90%', md: '70%', lg: '60%' }}
            px={5}
          >
            <Text mb={7} mx={{ base: '5', md: '8', lg: '14' }}>
              {CATEGORY_HEADER}
            </Text>
          </Flex>
        </Box>
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
              category =>
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
