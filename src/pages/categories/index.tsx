import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { Divider, Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
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
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non lobortis nisi. Etiam hendrerit eros vel mollis rutrum. Mauris eleifend et nunc eget placerat. Aenean quam dolor, faucibus sed dolor sed, sodales tempor dui. Quisque pulvinar diam eget tempor convallis. Phasellus ipsum tortor, sagittis nec rhoncus eu, cursus nec diam. Pellentesque condimentum, nulla at egestas egestas, lorem sem pellentesque mi, nec imperdiet enim metus eget felis.'
const Categories: NextPage = () => {
  const router = useRouter()
  const { data } = useGetCategoriesQuery(undefined, { skip: router.isFallback })
  const { t } = useTranslation();
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
        <Heading fontSize={40} textAlign="center" mt={12}>
          {`${t('wikiCategory')}`}
        </Heading>
        <ToggleText my={8} text={CATEGORY_HEADER} />
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
