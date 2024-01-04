import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Divider, Box, Heading, SimpleGrid, Flex, Text } from '@chakra-ui/react'
import CategoryCard from '@/components/Categories/CategoryCard'
import { useTranslation } from 'next-i18next'
import { AllCategoriesData } from '@/data/AllCategoriesData'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Categories: NextPage = () => {
  const { t } = useTranslation('category')
  return (
    <>
      <NextSeo
        title={t('wikiCategory')}
        description={t('categoryHeader')}
        openGraph={{
          title: t('wikiCategory'),
          description: t('categoryHeader'),
        }}
      />
      <Box>
        <Flex
          h={325}
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
              fontSize={{ base: 25, md: 36, xl: 42 }}
              color={'careersHeadingColor'}
              maxW="80%"
              mx="auto"
              textAlign="center"
              pb={2}
              as="h1"
            >
              {t('wikiCategory')}
            </Heading>
            <Flex
              textAlign="center"
              justifyContent="center"
              fontWeight="400"
              mx="auto"
              maxW={{ base: '90%', md: '70%', lg: '730px' }}
            >
              <Text
                fontSize={{ base: '12px', md: '14px', lg: '16px' }}
                mx={{ base: '5', md: '8', lg: '14' }}
                color={'heroHeaderDescription'}
              >
                {t('categoryHeader')}
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['category', 'common'])),
    },
  }
}

export default Categories
