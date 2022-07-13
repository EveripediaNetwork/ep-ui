import React from 'react'
import { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import {
  getPromotedWikis,
  getRunningOperationPromises,
  useGetPromotedWikisQuery,
} from '@/services/wikis'
import { store } from '@/store/store'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/Landing/Hero'))
const NotableDrops = dynamic(() => import('@/components/Landing/NotableDrops'))

const CategoriesList = dynamic(
  () => import('@/components/Landing/CategoriesList'),
)

export const Index: NextPage = () => {
  const result = useGetPromotedWikisQuery()
  const { data } = result
  const wiki = data && data.length > 0 ? data[0] : undefined // TODO: remove from array
  return (
    <Flex
      direction="column"
      mx="auto"
      w="full"
      py={{ base: 6, lg: 20 }}
      gap={10}
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

export default Index
