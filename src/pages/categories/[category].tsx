import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { Divider, Box, Heading, SimpleGrid, Icon, Flex } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
import {
  getCategoriesById,
  getRunningOperationPromises,
} from '@/services/categories'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import { getBootStrapIcon } from '@/utils/getBootStrapIcon'

interface CategoryPageProps {
  categoryData: Category
}
const CategoryPage: NextPage<CategoryPageProps> = ({
  categoryData,
}: CategoryPageProps) => {
  const categoryIcon = getBootStrapIcon(categoryData.icon)
  return (
    <Box mt="-12" bgColor="pageBg" pb={12}>
      <Image
        priority
        src={categoryData?.heroImage || '/images/categories-backdrop.png'}
        height="250px"
      />
      <Flex mx="auto" justifyContent="center" mt={12}>
        <Icon
          as={categoryIcon}
          borderRadius="100px"
          overflow="hidden"
          borderWidth="5px"
          bgColor={`hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`}
          color="#0000002f"
          width="60px"
          height="60px"
          padding={2}
        />
      </Flex>
      <Heading fontSize={40} textAlign="center" mt={4}>
        {categoryData?.title}
      </Heading>

      <ToggleText my={8} text={categoryData?.description || ''} />
      <Divider />
      <Box mt={16}>
        <Heading fontSize={25} textAlign="center">
          Wikis in this category
        </Heading>
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          width="min(90%, 1200px)"
          mx="auto"
          my={12}
          gap={8}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Box
              key={i}
              h="250px"
              w="100%"
              bgColor={`hsl(${Math.floor(Math.random() * 360)}, 10%, 80%)`}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const categoryId: string = context.params?.category as string
  const result = await store.dispatch(getCategoriesById.initiate(categoryId))
  await Promise.all(getRunningOperationPromises())

  return {
    props: {
      categoryData: result.data,
    },
  }
}
export default CategoryPage
