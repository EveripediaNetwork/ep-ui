import React from 'react'
import { HStack } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import WikiCard from '../WikiCard/WikiCard'
import WikiActionBar from './WikiActionBar'

interface WikiPageProps {
  wiki: Wiki | undefined
}

const WikiPage = ({ wiki }: WikiPageProps) => (
  <HStack mt={-2}>
    <WikiActionBar />
    {wiki && <WikiCard wiki={wiki} />}
  </HStack>
)

export default WikiPage
