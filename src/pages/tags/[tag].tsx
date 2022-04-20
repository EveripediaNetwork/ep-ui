import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import {
  Divider,
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
} from '@chakra-ui/react'
import { getRunningOperationPromises } from '@/services/categories'
import { store } from '@/store/store'
import WikiPreviewCard from '@/components/Wiki/WikiPreviewCard/WikiPreviewCard'
import { getTagWikis } from '@/services/wikis'
import { Wiki } from '@/types/Wiki'
import { useRouter } from 'next/router'
import { ITEM_PER_PAGE } from '@/data/Constants'

interface TagPageProps {
  tagId: string
  wikis: Wiki[]
}
const TagPage: NextPage<TagPageProps> = ({ tagId, wikis }: TagPageProps) => {
  const router = useRouter()
  return (
    <Box bgColor="pageBg" border="solid 1px transparent" pb={12}>
      <Heading fontSize={40} textAlign="center" mt={4}>
        {tagId}
      </Heading>

      <Divider />
      <Box mt={16}>
        <Heading fontSize={25} textAlign="center">
          Wikis with this tag
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
                <WikiPreviewCard wiki={wiki} />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={10} px={6}>
            <Text fontSize="lg" mt={3} mb={3}>
              Oops, No Wiki Found with this Tag
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
  const tagId: string = context.params?.tag as string
  const tagWikis = await store.dispatch(getTagWikis.initiate({id:tagId, offset: 0, limit: ITEM_PER_PAGE}))

  await Promise.all(getRunningOperationPromises())
  return {
    props: {
      tagId,
      wikis: tagWikis.data || [],
    },
  }
}
export default TagPage
