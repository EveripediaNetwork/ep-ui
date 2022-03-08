import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Divider, Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
import CategoryCard from '@/components/Categories/CategoryCard'
import { sampleCategories } from '@/data/CategoriesData'
import { CategoryDataType } from '@/types/CategoryDataTypes'
import { request, gql } from 'graphql-request'

export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
    {
      categories {
        id
        title
        description
        cardImage
        heroImage
        icon
      }
    }
  `

  const res = request('http://api.dev.braindao.org/graphql', query)
  const { categories } = await res

  return {
    props: {
      categories,
    },
  }
}

interface CategoriesPageProps {
  categories: CategoryDataType
}

const Categories: NextPage<CategoriesPageProps> = ({
  categories,
}: CategoriesPageProps) => (
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
        {categories.map((category, i) => (
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

export default Categories
