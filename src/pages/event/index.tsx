import EventHeader from '@/components/SEO/Event'
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Search2Icon } from '@chakra-ui/icons'
import { DatePickerDemo } from '@/components/ui/DatePicker'
import TrendingEvent from '@/components/Event/TrendingEvent'
import EventBanner from '@/components/Event/EventBanner'
import EventInterest from '@/components/Event/EventInterest'
import { RiArrowRightUpLine } from 'react-icons/ri'

const EventPage = () => {
  return (
    <Box>
      <EventHeader />
      <EventBanner />
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
        <TrendingEvent />
        <EventInterest />
        <div className="flex gap-x-8 max-w-[1296px] mx-auto mt-24">
          <div className="flex-1 h-[800px]">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <h1 className="font-semibold text-xl">January</h1>
                <span className="text-xs">Tuesday, 10 January 2024</span>
              </div>
              <span className="text-xs">
                know any events not listed?{' '}
                <span className="text-brand-800">Suggest events</span>
              </span>
            </div>
            <div className="grid gap-5 mt-6 h-fit relative">
              <div className="w-[2px] top-2 left-[10px] absolute h-full bg-brand-500 dark:bg-brand-800" />
              <div className="flex gap-6">
                <span className="rounded-full z-10 w-6 h-6 bg-brand-500 dark:bg-brand-800 flex justify-center items-center">
                  <RiArrowRightUpLine />
                </span>
                <div className="border bg-[#2D3748] rounded-xl px-3 h-fit py-[14px] w-full flex gap-9">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm text-alpha-900">
                        Crypto Finance Conference
                      </h3>
                      <p className="text-xs text-alpha-800 mt-1">
                        CFC St. Moritz is a curated, application-only event
                        designed for NFT investors and decision-makers. It
                        admits only 250 international UHNWI, institutional
                        investors, funds, and family offices.
                      </p>
                      <div className="flex items-center">
                        <span>10th-13th, January 2024</span>
                        <span>St. Moritz, Switzerland</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-3 border border-gray300 rounded-[100px]">
                        Crypto
                      </div>
                      <div className="p-3 border border-gray300 rounded-[100px]">
                        Crypto
                      </div>
                      <div className="p-3 border border-gray300 rounded-[100px]">
                        Crypto
                      </div>
                      <div className="p-3 border border-gray300 rounded-[100px]">
                        Crypto
                      </div>
                    </div>
                  </div>
                  <div className="w-[140px] h-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-[419px] bg-alpha-500 h-[800px]" />
        </div>
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
