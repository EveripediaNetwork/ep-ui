import React from 'react'
import { Flex } from '@chakra-ui/react'
import { getPromotedWikis, getRunningOperationPromises } from '@/services/wikis'
import { store } from '@/store/store'
import dynamic from 'next/dynamic'
import { Wiki } from '@/types/Wiki'

const Hero = dynamic(() => import('@/components/Landing/Hero'))
const NotableDrops = dynamic(() => import('@/components/Landing/NotableDrops'))

const CategoriesList = dynamic(
  () => import('@/components/Landing/CategoriesList'),
)

interface HomePageProps {
  promotedWikis: Wiki[]
}

export const Index = ({ promotedWikis }: HomePageProps) => {
  return (
    <Flex
      direction="column"
      mx="auto"
      w="full"
      py={{ base: 6, lg: 20 }}
      gap={10}
    >
      <Hero wiki={promotedWikis && promotedWikis[0]} />
      <NotableDrops drops={promotedWikis} />
      <CategoriesList />
    </Flex>
  )
}

export async function getServerSideProps() {
  const { data: promotedWikis } = await store.dispatch(
    getPromotedWikis.initiate(),
  )
  await Promise.all(getRunningOperationPromises())
  return {
    props: {
      promotedWikis,
    },
  }
}

export default Index
