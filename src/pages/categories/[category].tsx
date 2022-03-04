import React from 'react'
import { NextPage } from 'next'
import { Divider, Box, Heading, SimpleGrid, Icon, Flex } from '@chakra-ui/react'
import { Image } from '@/components/Elements/Image/Image'
import ToggleText from '@/components/Elements/ToggleText/ToggleText'
import { sampleCategories } from '@/data/CategoriesData'
import { useRouter } from 'next/router'

const Category: NextPage = () => {
  const router = useRouter()
  const category = router.query.category as string
  const categoryData = sampleCategories.find(
    c => c.slug === `/categories/${category}`,
  )
  return (
    <Box mt="-12" bgColor="pageBg" pb={12}>
      <Image
        priority="true"
        src={categoryData?.imageHero || '/images/categories-backdrop.png'}
        height="250px"
      />
      <Flex mx="auto" justifyContent="center" mt={12}>
        <Icon
          as={categoryData?.icon}
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
          {[...Array(6).keys()].map(i => (
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

export default Category
