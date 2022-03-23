import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import {
  Divider,
  Box,
  Heading,
  SimpleGrid,
  Icon,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
import {
  getCategoriesById,
  getRunningOperationPromises,
} from '@/services/categories'
import { store } from '@/store/store'
import { Category } from '@/types/CategoryDataTypes'
import { getBootStrapIcon } from '@/utils/getBootStrapIcon'
import SubCategoryCard from '@/components/Categories/SubCategoryCard'
import { getWikisByCategory } from '@/services/wikis'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'

interface CategoryPageProps {
  categoryData: Category
  wikis: Wiki[]
}
const CategoryPage: NextPage<CategoryPageProps> = ({
  categoryData,
  wikis,
}: CategoryPageProps) => {
  const categoryIcon = getBootStrapIcon(categoryData.icon)
  const router = useRouter()
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
        {wikis.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            width="min(90%, 1200px)"
            mx="auto"
            my={12}
            gap={8}
          >
            {wikis.map((wiki, i) => (
              <Box key={i} w="100%">
                <SubCategoryCard wiki={wiki} />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={10} px={6}>
            <Text fontSize="lg" mt={3} mb={3}>
              Oops, No Wiki Found in This Category
            </Text>
            <Button
              colorScheme="primary"
              color="white"
              variant="solid"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const categoryId: string = context.params?.category as string
  const result = await store.dispatch(getCategoriesById.initiate(categoryId))
  const wikisByCategory = await store.dispatch(
    getWikisByCategory.initiate(categoryId),
  )
  await Promise.all(getRunningOperationPromises())
  return {
    props: {
      categoryData: result.data || [],
      wikis: wikisByCategory.data || [],
    },
  }
}
export default CategoryPage
