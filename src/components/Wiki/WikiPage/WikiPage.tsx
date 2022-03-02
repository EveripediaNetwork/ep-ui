import React from 'react'
import { Container } from '@chakra-ui/react'
import { Wiki } from '@/types/Wiki'
import WikiCard from '@/components/Wiki/WikiCard/WikiCard'

interface WikiPageProps {
  wiki: Wiki | undefined
}

const WikiPage = ({ wiki }: WikiPageProps) => (
  <Container maxW="7xl" p="12">
    {wiki && <WikiCard wiki={wiki} />}
  </Container>
)

export default WikiPage
