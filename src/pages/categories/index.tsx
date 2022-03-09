import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Divider, Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
import CategoryCard from '@/components/Categories/CategoryCard'
import { sampleCategories } from '@/data/CategoriesData'
import {
  getCategories,
  getRunningOperationPromises,
  useGetCategoriesQuery,
} from '@/services/categories'
import { store } from '@/store/store'
import { useRouter } from 'next/router'

const Categories: NextPage = () => {
  const router = useRouter()
  const { data } = useGetCategoriesQuery(undefined, { skip: router.isFallback })

  return (
    <Box mt="-12" bgColor="pageBg" pb={12}>
      <Image src="/images/categories-backdrop.png" height="250px" />
      <Heading fontSize={40} textAlign="center" mt={12}>
        Wiki Categories
      </Heading>
      <ToggleText
        my={8}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non lobortis nisi. Etiam hendrerit eros vel mollis rutrum. Mauris eleifend et nunc eget placerat. Aenean quam dolor, faucibus sed dolor sed, sodales tempor dui. Quisque pulvinar diam eget tempor convallis. Phasellus ipsum tortor, sagittis nec rhoncus eu, cursus nec diam. Pellentesque condimentum, nulla at egestas egestas, lorem sem pellentesque mi, nec imperdiet enim metus eget felis."
      />
      <Divider />
      <Box mt={16}>
        <Heading fontSize={25} textAlign="center">
          Trending Wiki Categories
        </Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          width="min(90%, 1200px)"
          mx="auto"
          my={12}
          gap={8}
        >
          {data?.map((category, i) => (
            <CategoryCard
              key={category.slug || sampleCategories[i].slug}
              imageCard={category.imageCard || sampleCategories[i].imageCard}
              title={category.title || sampleCategories[i].title}
              brief={category.description || sampleCategories[i].description}
              categoryUrl={category.slug || sampleCategories[i].slug}
              coverIcon={category.icon || sampleCategories[i].icon}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
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
