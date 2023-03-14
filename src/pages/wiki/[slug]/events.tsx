import React from 'react'
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import EventCard from '@/components/Wiki/Event/EventCard'
import { RiCheckLine } from 'react-icons/ri'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Wiki } from '@everipedia/iq-utils'
import { getWiki, wikiApi } from '@/services/wikis'
import { store } from '@/store/store'
import NoEventView from '@/components/Wiki/Event/NoEventView'
import WikiNotFound from '@/components/Wiki/WIkiNotFound/WikiNotFound'
import { Link } from '@/components/Elements'

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
              <Link href={`/wiki/${wiki.id}`}>{wiki.title}</Link>
            </Heading>
          </Flex>
          {wiki.events && (
            <SimpleGrid gap={{ md: '10', xl: '16' }}>
              {wiki.events &&
                wiki.events.map((event, i) => (
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
    eventContent = <WikiNotFound />
  }

  return (
    <Box bgColor="pageBg" mt={-3} pt={8}>
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

export const getStaticProps: GetStaticProps = async context => {
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
