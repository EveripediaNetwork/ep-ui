import React from 'react'
import { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import {
  getPromotedWikis,
  getRunningOperationPromises,
  useGetPromotedWikisQuery,
} from '@/services/wikis'
import { Hero } from '@/components/Landing/Hero'
import { NotableDrops } from '@/components/Landing/NotableDrops'
import CategoriesList from '@/components/Landing/CategoriesList'
import { store } from '@/store/store'

export const Home: NextPage = () => {
  const result = useGetPromotedWikisQuery()
  const { data } = result
  const wiki = data && data.length > 0 ? data[0] : undefined // TODO: remove from array
  return (
    <Flex
      direction="column"
      mx="auto"
      w="full"
      px={{ base: 6, lg: 20 }}
      py={{ lg: 20 }}
      gap={10}
      _dark={{
        bgImage: '/images/homepage-bg-dark.png',
      }}
      bgImage="/images/homepage-bg-white.png"
    >
      <Hero wiki={wiki} />
      <NotableDrops drops={data} />
      <CategoriesList />
    </Flex>
  )
}

export async function getServerSideProps() {
  store.dispatch(getPromotedWikis.initiate())
  await Promise.all(getRunningOperationPromises())
  return {
    props: {},
  }
}

export default Home
