import EventHeader from '@/components/SEO/Event'
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  chakra,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EventInterestData } from './event.data'
import { Search2Icon } from '@chakra-ui/icons'
import { DatePickerDemo } from '@/components/ui/DatePicker'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
interface IEventData {
  id: number
  location: string
  title: string
  date: string
}
const eventMockData: IEventData[] = [
  {
    id: 1,
    location: 'Le Carrousel du Louvre (Paris, France)',
    title: '5th Edition Paris Blockchain Week',
    date: 'April 8-12, 2024',
  },
  {
    id: 2,
    location: 'Rai, Amsterdam.',
    title: 'Blockchain Expo Europe',
    date: 'October 1-02, 2024',
  },
  {
    id: 3,
    location: 'AsiaWorld Expo, Airport Expo Blvd...',
    title: 'Wow summit in Hong Kong',
    date: 'march, 26-27,2024',
  },
  {
    id: 4,
    location: 'Dubai, Festival Arena',
    title: 'Blockchain Life 2024',
    date: 'April 15-16, 2024',
  },
  {
    id: 5,
    location: 'Le Carrousel du Louvre (Paris, France)',
    title: '5th Edition Paris Blockchain Week',
    date: 'April 8-12, 2024',
  },
  {
    id: 6,
    location: 'Rai, Amsterdam.',
    title: 'Blockchain Expo Europe',
    date: 'October 1-02, 2024',
  },
  {
    id: 7,
    location: 'AsiaWorld Expo, Airport Expo Blvd...',
    title: 'Wow summit in Hong Kong',
    date: 'march, 26-27,2024',
  },
  {
    id: 8,
    location: 'Dubai, Festival Arena',
    title: 'Blockchain Life 2024',
    date: 'April 15-16, 2024',
  },
]
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
          maxW={'1100px'}
          mt={'-20px'}
          rounded={'8px'}
          overflow={'hidden'}
          mx={'auto'}
        >
          <Flex flex={1}>
            <InputGroup
              size="lg"
              maxW="523px"
              display={{ base: 'none', md: 'block' }}
              borderRight={'2px'}
              borderColor={'archivedTextColor'}
              bgColor={'rankingListTableBg'}
              outline={'0'}
            >
              <InputLeftElement
                ml={{ base: '15px', xl: 'unset' }}
                pointerEvents="none"
                h="full"
              >
                <Search2Icon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Enter amount"
                rounded={'none'}
                border={'none'}
              />
            </InputGroup>
            <DatePickerDemo />
          </Flex>
          <button
            type="button"
            className="w-[150px] h-auto bg-[#FF5CAA] dark:bg-[#FF1A88]"
          >
            Search
          </button>
        </Flex>
        <div className="mt-20 max-w-[1296px] mx-auto">
          <h4 className="font-semibold text-xl">Trending Events</h4>
          <div>
            <Carousel>
              <CarouselContent className="">
                {eventMockData.map((event) => (
                  <CarouselItem
                    className="h-[350px] basis-1/3 xl:basis-1/4 rounded-xl relative w-full ml-4"
                    key={event.id}
                  >
                    <Image
                      src={'/images/blockchain-expo.png'}
                      alt="blockchain-expo"
                      fill
                    />
                    <div className="absolute left-0 h-full w-full flex flex-col justify-end px-2 py-5">
                      <div>
                        <h5 className="text-sm">{event.location}</h5>
                        <h5 className="text-xl font-semibold">{event.title}</h5>
                        <h5 className="">{event.date}</h5>
                      </div>
                      <button
                        type="button"
                        className="px-2 py-[10px] rounded-[6px] font-semibold backdrop-blur-[30px] bg-alpha-300 w-fit"
                      >
                        View event details
                      </button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
              <CarouselDots />
            </Carousel>
          </div>
        </div>
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
            {EventInterestData.map((interest) => {
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
