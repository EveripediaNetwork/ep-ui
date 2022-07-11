import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Divider, Box, Heading, SimpleGrid } from '@chakra-ui/react'
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
        <Divider />
        <Box mt={16}>
          <Heading fontSize={25} textAlign="center">
            {`${t('trendingCategory')}`}
          </Heading>
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
