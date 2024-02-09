import EventHeader from '@/components/SEO/Event'
import TrendingEvent from '@/components/Event/TrendingEvent'
import EventBanner from '@/components/Event/EventBanner'
import EventInterest from '@/components/Event/EventInterest'
import EventCard from '@/components/Event/EventCard'
import EventSearchBar from '@/components/Event/EventSearchBar'
import EventFilter from '@/components/Event/EventFilter'
import NearbyEventFilter from '@/components/Event/NearbyEventFilter'
import PopularEventFilter from '@/components/Event/PopularEventFilter'

const EventPage = () => {
  return (
    <div>
      <EventHeader />
      <EventBanner />
      <div className="mb-[120px] px-4 md:px-10 dark:bg-gray800 border-t border-gray200 dark:border-alpha-300">
        <EventSearchBar />
        <TrendingEvent />
        <EventInterest />
        <div className="flex flex-col-reverse lg:flex-row gap-10 xl:gap-8 max-w-[1296px] mx-auto mt-10 md:mt-24">
          <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col gap-10">
              <div className="">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <h1 className="font-semibold md:text-xl">January</h1>
                    <span className="text-[10px] md:text-xs">
                      Tuesday, 10 January 2024
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs max-w-[149px] md:max-w-full">
                    know any events not listed?{' '}
                    <span className="text-brand-800">Suggest events</span>
                  </span>
                </div>
                <div className="grid gap-5 mt-3 md:mt-6 h-fit relative">
                  <div className="w-[2px] top-2 left-[10px] absolute h-full bg-brand-500 dark:bg-brand-800" />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                </div>
              </div>
              <div className="">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <h1 className="font-semibold md:text-xl">February</h1>
                  </div>
                </div>
                <div className="grid gap-5 mt-3 md:mt-6 h-fit relative">
                  <div className="w-[2px] top-2 left-[10px] absolute h-full bg-brand-500 dark:bg-brand-800" />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                  <EventCard />
                </div>
              </div>
            </div>
            <button
              className="px-10 py-2 mt-10 rounded-md border cursor-pointer border-gray200 dark:border-alpha-400"
              type="button"
            >
              View more
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-10 xl:max-w-[419px]">
            <EventFilter />
            <NearbyEventFilter />
            <PopularEventFilter />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage
