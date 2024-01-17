import EventHeader from '@/components/SEO/Event'
import { Box, Flex, Heading, Text, chakra } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EventInterestData } from './event.data'

const EventPage = () => {
  return (
    <Box>
      <EventHeader />
      <Flex
        flexDirection={'column'}
        w={{ md: '80%', base: '95%' }}
        mx="auto"
        py={'24'}
        alignItems="center"
      >
        <Text
          fontSize={{ xl: 'md', base: 'sm' }}
          textAlign="center"
          color={'brand.500'}
        >
          Events
        </Text>
        <Heading
          fontSize={{ md: '4xl', base: '2xl', xl: '5xl' }}
          mb={4}
          fontWeight={'600'}
          color={'wikiFlagTextColor'}
          textAlign={'center'}
          maxW={'1050px'}
        >
          Blockchain and cryptocurrency conferences around the world
        </Heading>
        <Text
          fontSize={{ xl: 'lg', base: 'md' }}
          textAlign="center"
          maxW={'986px'}
          color={'homeDescriptionColor'}
        >
          Learn from the industry experts on crypto trends, explore investment
          opportunities, network with potential partners, connect with
          like-minded individuals, and cultivate relationships for future
          collaborations at global blockchain and crypto events and conferences.
        </Text>
      </Flex>
      <Box
        bgColor={'pageBg'}
        borderTop={'1px'}
        borderColor={'archivedTextColor'}
        mb={'120px'}
      >
        <Flex
          maxW={'1296px'}
          mx={'auto'}
          mt={'96px'}
          borderRadius={'12px'}
          border={'1px'}
          borderColor={'archivedTextColor'}
          bgColor={'#FFF'}
          _dark={{
            bgColor: '#2D3748',
          }}
          padding={'39px 31px'}
          justifyContent={'space-between'}
          gap={'127px'}
        >
          <Box maxW={'250px'} w={'full'}>
            <Heading fontSize={'20px'}>Interests</Heading>
            <Text fontSize={'14px'} mt={'12px'}>
              Get event suggestion based on your interests.
            </Text>
          </Box>
          <chakra.ul display={'flex'} flexWrap={'wrap'} gap={'12px'}>
            {EventInterestData.map(interest => {
              return (
                <chakra.li
                  key={interest}
                  borderRadius={'100000px'}
                  border={'1px'}
                  borderColor={'gray.200'}
                  padding={'12px 20px'}
                  fontSize={'14px'}
                  listStyleType={'none'}
                  cursor={'pointer'}
                  _active={{
                    bgColor: 'divider',
                  }}
                  _hover={{
                    bgColor: 'divider',
                  }}
                >
                  {interest}
                </chakra.li>
              )
            })}
          </chakra.ul>
        </Flex>
      </Box>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['blog', 'common'])),
    },
    revalidate: 60 * 5,
  }
}

export default EventPage
