// import {
//   BlogPost as BlogPostType,
// } from '@/components/Blog/data'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import arweave from '@/config/arweave'
import {
  Button,
  chakra,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
// import { BlogPost } from '@/components/Blog/BlogPost'
import { Image } from '@/components/Elements/Image/Image'
import { useAppSelector } from '@/store/hook'
import { Blog } from '@/store/slices/blog-slice'
import { store } from '@/store/store'
import { getSingleBlogEntry } from '@/services/blog'
import { formatEntry } from '@/utils/formatEntry'

// type BlogPostProps = NextPage & {
//   post: BlogPostType
//   postSuggestions: BlogPostType[]
// }

export const BlogPostPage = ({ slug }: any) => {
  // const { post, postSuggestions } = props

  const blogResult = useAppSelector(state =>
    state.blog && slug
      ? Object.values(state.blog).find(b => b.slug === slug)
      : null,
  )
  const [blog, setBlog] = useState<Blog | undefined | null>(blogResult)

  useEffect(() => {
    if (!blog && slug) {
      const getBlogEntry = async () => {
        const {
          data: {
            transactions: {
              edges: {
                0: {
                  node: {
                    id: transactionId,
                    block: { timestamp },
                  },
                },
              },
            },
          },
        } = await store.dispatch(getSingleBlogEntry.initiate(slug))

        const formatted = await formatEntry(
          JSON.parse(
            String(
              await arweave.transactions.getData(transactionId, {
                decode: true,
                string: true,
              }),
            ),
          ),
          transactionId,
          timestamp,
        )

        console.log(formatted)

        setBlog(formatted)
      }

      getBlogEntry()
    }
  }, [blog, slug])

  return (
    <chakra.div bgColor="pageBg" my={-8} py={8}>
      <chakra.div
        w="min(90%, 1100px)"
        px={{ lg: '44' }}
        mx="auto"
        my={{ base: '10', lg: '16' }}
      >
        {blog ? (
          <>
            <Heading
              mt={8}
              mb={4}
              as="h1"
              fontSize={{ base: '3xl', lg: '5xl' }}
              letterSpacing="wide"
            >
              {blog.title}
            </Heading>
            <Text color="gray.600" _dark={{ color: 'gray.400' }}>
              {blog.timestamp.toString()}
            </Text>

            <Image
              h={{ base: '300px', md: '393px' }}
              src={blog.cover_image}
              mt="14"
            />
          </>
        ) : null}
        <Stack
          spacing="15"
          mt="12"
          sx={{
            p: {
              lineHeight: '26px',
            },
          }}
        >
          {/* Post Content Start */}
          <Stack>
            <Text as="span" fontSize="4xl" fontWeight="bold" noOfLines={3}>
              Stats
            </Text>
            <p>
              With our new BrainDAO proposal and the teaser for Brainies, IQ
              holders have staked a record of more than 1 billion HiIQ by
              locking more than 340 million IQ tokens. The APR is currently over
              140% as of writing. IQ stakers earn both IQ token rewards and the
              chance to win NFTs in NFT raffles. The majority of the stakers
              have locked their IQ up for over 3.5 years to earn maximum APR.
              This guide explains how to start staking IQ with HiIQ. HiIQ was
              created to incentivize IQ holders to become long-term holders who
              stake and lock up their IQ tokens with IQ token rewards and NFT
              raffles. The HiIQ staking system allows IQ holders to choose how
              long they want to lock up their IQ for, the more IQ and the longer
              they lock up their IQ for the greater the amount of rewards and
              the greater chance they will have to gain limited edition NFTs.
            </p>
          </Stack>
          <Stack>
            <Text as="span" fontSize="4xl" fontWeight="bold" noOfLines={3}>
              BrainDAO Blue Chip NFT Proposal
            </Text>
            <p>
              Our new BrainDAO Blue Chip NFTs proposal passed with over 685m
              HiIQ votes which was more than half of the total HiIQ supply. With
              this proposal passing governance,we are allocating 200 ETH worth
              of funds from the BrainDAO treasury to go towards the purchase of
              Blue Chip NFTs from major NFT projects such as Bored Ape Yacht
              Club, CryptoPunks, Art Blocks, Cool Cats, Doodles, Azuki, Zipcy’s
              SuperNormal, The Sandbox, Decentraland, World of Women, Invisible
              Friends, Boss Beauties, Cyberkongz, and Wolf Game among others.
              The funds will also be used to mint derivative NFTs and
              whitelisted NFTs related to Blue Chip NFT projects such as the
              Gucci 10KTF NFTs which were reserved for the holders of Bored Apes
              and several other Blue Chip NFT collections. Once the Blue Chip
              NFTs are acquired, BrainDAO will then start receiving/minting
              derivatives from its NFT portfolio on a regular basis as these
              Blue Chip NFT projects expand. This will allow BrianDAO to
              regularly raffle off NFT derivatives from leading projects to IQ
              holders. Regularly giving away NFTs from Blue Chip projects. Over
              the last year, Bored Ape holders received over $145,000 in
              airdrops if BrainDAO acquires a Bored Ape and that trend continues
              BrainDAO could potentially distribute NFTs and tokens worth
              $145,000 to IQ stakers! This will greatly incentivize anyone
              interested in NFTs to get and stake IQ increasing demand for IQ
              and reducing the supply of IQ. BrainDAO will also hold the IP
              rights from its portfolio of Blue Chip NFTs bringing valuable IP
              to the IQ ecosystem. BrainDAO will grant IQ stakers the right to
              create derivative NFTs based on the NFTs in the portfolio.
              BrainDAO will also be able to use the intellectual property rights
              from this portfolio to create new NFT derivatives for IQ stakers.
            </p>
          </Stack>
          <Stack>
            <Text as="span" fontSize="4xl" fontWeight="bold" noOfLines={3}>
              Brainies
            </Text>
            <p>
              We’re very excited to introduce Brainies to everyone. They are
              just around the corner for HiIQ stakers to win. Brainies are
              coming soon IQ stakers can catch’em all! Brainies will change the
              NFT game #DeFi. We’ll be dropping more info soon. If you haven’t
              already make sure to join our discord.
            </p>
          </Stack>
          {/* Post Content End */}

          <Stack
            alignItems="center"
            spacing={{ base: 2, md: 4, lg: 8 }}
            px={{ base: 4, md: 14, lg: '24' }}
            py="8"
            bg="gray.300"
            _dark={{ bg: 'whiteAlpha.200' }}
            rounded="lg"
          >
            <Text
              fontWeight="bold"
              fontSize={{ base: 'sm', md: 'md', lg: '3xl' }}
              textAlign="center"
            >
              Join thousands of others in receiving the most interesting wikis
              on Everipedia every week
            </Text>
            <Button
              as="a"
              fontSize={{ base: 'xs', md: 'md', lg: 'inherit' }}
              px={{ base: '8', lg: 10 }}
              href="https://www.getdrip.com/forms/505929689/submissions/new"
              target="_blank"
              w="fit-content"
              maxW="fit-content"
            >
              Sign me up
            </Button>
          </Stack>

          <Stack spacing="8">
            <Text as="span" fontSize="4xl" fontWeight="bold" noOfLines={3}>
              You might like
            </Text>
            <SimpleGrid
              alignSelf="center"
              w="fit-content"
              mt={{ base: '15', md: '16' }}
              columns={{ base: 1, md: 2 }}
              spacingX="5"
              spacingY="14"
            >
              {/* {postSuggestions.slice(-2).map((blogPost, i) => (
                <BlogPost maxW="420px" post={blogPost} key={i} />
              ))} */}
            </SimpleGrid>
          </Stack>
        </Stack>
      </chakra.div>
    </chakra.div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const slug: string = context.params?.digest as string
  return {
    props: {
      slug,
    },
  }
}

export default BlogPostPage
