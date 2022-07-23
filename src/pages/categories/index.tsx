import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Divider, Box, Heading, SimpleGrid, Flex, Text } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import CategoryCard from '@/components/Categories/CategoryCard'

import {
  getCategories,
  getRunningOperationPromises,
  useGetCategoriesQuery,
} from '@/services/categories'
import { store } from '@/store/store'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const CATEGORY_HEADER =
  'Explore different wikis in different categories on Everipedia, Ranging from NFTs, to DAOs and so on.'
const Categories: NextPage = () => {
  const router = useRouter()
  const { data } = useGetCategoriesQuery(undefined, { skip: router.isFallback })
  const { t } = useTranslation()
  return (
    <>
      {data && (
        <NextSeo
          title="Wiki Category"
          openGraph={{
            title: 'Wiki Category',
            description: CATEGORY_HEADER,
          }}
        />
      )}
      <Box mt="-12" bgColor="pageBg" pb={12}>
        <Image src="/images/categories-backdrop.png" height="250px" />
        <Heading
          fontSize={{ base: 25, lg: 36 }}
          maxW="80%"
          mx="auto"
          textAlign="center"
          mt={8}
          p={10}
        >
          {`${t('wikiCategory')}`}
        </Heading>
        <Flex
          textAlign="center"
          justifyContent="center"
          fontWeight="400"
          mx="auto"
          maxW={{ base: "70%", md: "60%", lg: "40%" }}
          px={6}
        >
          <Text mt={3} mb={7} mx={14}>
            {CATEGORY_HEADER}
          </Text>
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
            {data?.map(
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

export const getServerSideProps: GetServerSideProps = async () => {
  store.dispatch(getCategories.initiate())
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Categories
