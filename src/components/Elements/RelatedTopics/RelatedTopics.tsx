import React from 'react'
import { VStack, Heading, Divider, List, ListItem } from '@chakra-ui/react'
import Link from '../Link/Link'

interface RelatedTopicsProp {
  topics: Array<{ name: string; url: string; isSectionLink?: boolean }>
}
const RelatedTopics = ({ topics }: RelatedTopicsProp) => (
  <VStack
    position="sticky"
    top="100px"
    display="inline-block"
    bgColor="blackAlpha.50"
    _dark={{ bgColor: 'whiteAlpha.50' }}
    p={10}
    borderRadius={12}
  >
    <Heading as="h2" size="md">
      Related Topics
    </Heading>
    <Divider filter="brightness(0.9)" />
    <List spacing={2}>
      {topics.map(topic => (
        <ListItem mt="20px">
          <Link href={topic.url} scroll={!!topic.isSectionLink}>
            {topic.name}
          </Link>
        </ListItem>
      ))}
    </List>
  </VStack>
)

export default RelatedTopics
