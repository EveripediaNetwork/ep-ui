import React from 'react'
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import EventCard from '@/components/Wiki/Event/EventCard'
import { RiCheckLine } from 'react-icons/ri'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Wiki } from '@everipedia/iq-utils'
import { getWiki, wikiApi } from '@/services/wikis'
import { store } from '@/store/store'
import NoEventView from '@/components/Wiki/Event/NoEventView'
import NotFound from '@/pages/NotFound'
import { Link } from '@/components/Elements'
import Head from 'next/head'

const Events = ({ wiki }: { wiki: Wiki }) => {
  let eventContent

  if (wiki) {
    if (!wiki.events || wiki.events.length === 0) {
      eventContent = <NoEventView />
    } else if (wiki.events && wiki.events.length >= 1) {
      eventContent = (
        <SimpleGrid
          gap={{ base: '6', md: '10' }}
          pos="relative"
          pb={{ base: '10', lg: '24' }}
        >
          <Box
            transform="translateY(11px)"
            pos="absolute"
            h="100%"
            w="2px"
            bgColor="brandLinkColor"
            left={{ base: '9px', md: '11px' }}
            top="0px"
            zIndex="1"
          />
          <Flex alignItems="center" gap="6" pos="relative" zIndex="2">
            <Flex
              w={{ base: '20px', md: '24px' }}
              h={{ base: '20px', md: '24px' }}
              borderRadius="50%"
              bgColor="brandLinkColor"
              alignItems="center"
              justifyContent="center"
            >
              <Icon color="white" as={RiCheckLine} />
            </Flex>
            <Heading
              color="brandLinkColor"
              fontSize={{ base: '24px', md: '30px', xl: '36px' }}
            >
              <Link noOfLines={1} maxW="full" href={`/wiki/${wiki.id}`}>
                {wiki?.title}
              </Link>
            </Heading>
          </Flex>
          {wiki.events && (
            <SimpleGrid gap={{ base: '8', xl: '16' }}>
              {wiki.events?.map((event, i) => (
                <EventCard
                  key={i}
                  link={event.link}
                  title={event.title}
                  eventDate={event.date}
                  description={event.description}
                />
              ))}
            </SimpleGrid>
          )}
        </SimpleGrid>
      )
    } else {
      eventContent = <NoEventView />
    }
  } else {
    eventContent = <NotFound />
  }

  return (
    <Box bgColor="pageBg" mt={-3} pt={8}>
      <Head>
        <title>{wiki?.title} timeline of events - IQ Wiki</title>
        <meta
          name="description"
          content={`Discover a comprehensive timeline of ${wiki?.title} events, milestones, and significant moments on IQ Wiki. Our meticulously curated timeline offers a chronological overview, providing valuable insights into the history and evolution of ${wiki?.title}. Explore key dates, noteworthy achievements, and impactful developments that have shaped ${wiki?.title}, allowing you to delve into its rich past and gain a deeper understanding of its significance.`}
        />
      </Head>
      <Box
        w={{ base: 'full', md: 'min(90%, 1100px)' }}
        mx="auto"
        mt={{ base: '10', lg: '16' }}
        px={{ base: '3', md: 0 }}
      >
        <Heading textAlign="center">Timeline of Events</Heading>
        <Text textAlign="center" pt={4} pb={8} color="linkColor">
          A timeline of events for this wiki
        </Text>
        {eventContent}
      </Box>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug

  if (typeof slug !== 'string') return { notFound: true }

  const { data: wiki, error: wikiError } = await store.dispatch(
    getWiki.initiate(slug),
  )

  await Promise.all([store.dispatch(wikiApi.util.getRunningQueriesThunk())])

  if (wikiError) throw new Error(`Error fetching latest events: ${wikiError}`)

  return {
    props: {
      wiki,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export default Events
