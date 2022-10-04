import {
  chakra,
  Flex,
  GridItem,
  Heading,
  Icon,
  Select,
  SimpleGrid,
  Link,
  Text,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BlogPost } from '@/components/Blog/BlogPost'
import { useAppDispatch } from '@/store/hook'
import { setBlogs } from '@/store/slices/blog-slice'
import { GetServerSideProps } from 'next'
import { getRunningOperationPromises } from '@/services/blog'
import { getBlogsFromAllAccounts } from '@/utils/blog.utils'
import { Blog as BlogType } from '@/types/Blog'
import config from '@/config'
import shortenAccount from '@/utils/shortenAccount'
import China from 'public/images/cn.svg'
import Korea from 'public/images/kr.svg'

export const Blog = ({ blogEntries }: { blogEntries: BlogType[] }) => {
  const [mounted, setMounted] = useState(false)
  const [entries, setEntries] = useState(blogEntries)
  const dispatch = useAppDispatch()

  const handleOnFilter = (val: string) => {
    if (val === 'all') setEntries(blogEntries)
    else setEntries(blogEntries.filter(b => b.contributor === val))
  }

  useEffect(() => {
    if (mounted === false) {
      dispatch(setBlogs(blogEntries))
      setMounted(true)
    }
  }, [mounted, blogEntries, dispatch])

  return (
    <chakra.div bgColor="pageBg" my={-8} py={4}>
      <chakra.div w="min(90%, 1100px)" mx="auto" my={{ base: '10', lg: '16' }}>
        <Heading my={12} as="h1" size="2xl" letterSpacing="wide">
          IQ.Wiki Blog
        </Heading>
        <Flex justifyContent="space-between" mb={8} minWidth={100}>
          <Select
            width="150px"
            onChange={evt => handleOnFilter(evt.target.value)}
          >
            <option value="all">All entries</option>
            <option value={config.blogAccount2}>
              {shortenAccount(config.blogAccount2)}
            </option>
            <option value={config.blogAccount3}>
              {shortenAccount(config.blogAccount3)}
            </option>
          </Select>
          <Flex alignItems="center">
            <Text mr={5}>More from us</Text>
            <Link
              href="https://mirror.xyz/0xD92e7079F29481cd8e6b7382E8A47Cd3C36956Ee"
              target="_blank"
            >
              <Icon as={Korea} id="flag-icons-kr" boxSize={8} />
            </Link>
            <Link
              href="https://mirror.xyz/0xcd5Cc4F54C20C80aED2db81CBaf82153Fb95C1b1"
              target="_blank"
            >
              <Icon as={China} ml={5} id="flag-icons-cn" boxSize={8} />
            </Link>
          </Flex>
        </Flex>
        <hr />
        <SimpleGrid
          mt={{ base: '15', md: '16' }}
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX="5"
          spacingY="14"
        >
          {entries && entries.length > 0 ? (
            entries.map((b, i: number) => <BlogPost post={b} key={i} />)
          ) : (
            <GridItem colSpan={3}>
              <Text fontSize="md" textAlign="center">
                No entries so far...
              </Text>
            </GridItem>
          )}
        </SimpleGrid>
      </chakra.div>
    </chakra.div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const blogEntries = await getBlogsFromAllAccounts()

  await Promise.all(getRunningOperationPromises())

  return {
    props: {
      blogEntries,
    },
  }
}

export default Blog
