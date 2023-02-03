import React from 'react'
import {
  Box,
  Heading,
  HStack,
  Image,
  SpaceProps,
  Tag,
  Text,
} from '@chakra-ui/react'
import { Wiki, BaseTag as TagType } from '@everipedia/iq-utils'
import Link from '@/components/Elements/LinkElements/Link'

import { shortenAccount } from '@/utils/textUtils'

interface WikiCardProps {
  wiki: Wiki
}

interface IBlogTags {
  tags: Array<TagType>
  marginTop?: SpaceProps['marginTop']
}

const BlogTags: React.FC<IBlogTags> = ({ tags, marginTop }) => (
  <HStack spacing={2} marginTop={marginTop}>
    {tags.map(tag => (
      <Tag size="md" variant="solid" colorScheme="orange" key={tag.id}>
        {tag.id}
      </Tag>
    ))}
  </HStack>
)

interface BlogAuthorProps {
  date: Date
  name: string
}

export const BlogAuthor: React.FC<BlogAuthorProps> = ({ date, name }) => (
  <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
    <Image
      borderRadius="full"
      boxSize="40px"
      src="https://miro.medium.com/fit/c/96/96/1*_DUvWJvqxJ7Ph-2-v6Gtpw.png"
      alt={`Avatar of ${name}`}
    />
    <Text fontWeight="medium">{name}</Text>
    <Text>—</Text>
    <Text>{date.toLocaleDateString()}</Text>
  </HStack>
)

const WikiCard = ({ wiki }: WikiCardProps) => (
  <Box
    marginTop={{ base: '1', sm: '5' }}
    display="flex"
    flexDirection={{ base: 'column', sm: 'row' }}
    justifyContent="space-between"
  >
    <Box
      display="flex"
      flex="1"
      marginRight="3"
      position="relative"
      alignItems="center"
    >
      <Box
        width={{ base: '100%', sm: '85%' }}
        zIndex="2"
        marginLeft={{ base: '0', sm: '5%' }}
        marginTop="5%"
      >
        <Link
          href={`/wiki/${wiki.id}`}
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
        >
          <Image
            borderRadius="lg"
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
            alt={wiki.title}
            objectFit="contain"
          />
        </Link>
      </Box>
      <Box zIndex="1" width="100%" position="absolute" height="100%">
        <Box
          bgGradient="radial(orange.600 1px, transparent 1px)"
          _dark={{
            bgGradient: 'radial(orange.300 1px, transparent 1px)',
          }}
          backgroundSize="20px 20px"
          opacity="0.4"
          height="100%"
        />
      </Box>
    </Box>
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      justifyContent="center"
      marginTop={{ base: '3', sm: '0' }}
    >
      <BlogTags tags={wiki.tags} />
      <Heading marginTop="1">
        <Link
          href={`/wiki/${wiki.id}`}
          textDecoration="none"
          _hover={{ textDecoration: 'none' }}
        >
          {wiki.title}
        </Link>
      </Heading>
      <Text
        as="p"
        marginTop="2"
        color="gray.700"
        _dark={{ color: 'gray.200' }}
        fontSize="lg"
      >
        {wiki.content}
      </Text>
      <BlogAuthor
        name={shortenAccount(wiki?.user?.id || '')}
        date={new Date('2021-04-06T19:01:27Z')}
      />
    </Box>
  </Box>
)

export default WikiCard
