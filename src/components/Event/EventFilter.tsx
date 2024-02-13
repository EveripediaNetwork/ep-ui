import React, { useState } from 'react'
import {
  RiArrowLeftSLine,
  RiBankFill,
  RiCalendarEventFill,
  RiFilter3Line,
  RiMapPinRangeFill,
  RiScan2Fill,
} from 'react-icons/ri'

export const eventFilterData = [
  {
    icon: <RiCalendarEventFill />,
    title: 'Date',
    filter: ['Next Week', 'Next Month', 'Custom Range'],
  },
  {
    icon: <RiMapPinRangeFill />,
    title: 'Location',
    filter: [
      'Asia',
      'Africa',
      'Europe',
      'North America',
      'South America',
      'Austria/Ocenia',
    ],
  },
  {
    icon: <RiScan2Fill />,
    title: 'Event Type',
    filter: ['Conference', 'Hackathon', 'Forum', 'Festival', 'Online'],
  },
  {
    icon: <RiBankFill />,
    title: 'Blockchain',
    filter: ['Bitcoin', 'Ethereum', 'Polygon', 'Solana', 'Cardano'],
  },
]

const EventFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState('Date')
  return (
    <div>
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="text-xl">
            <RiFilter3Line />
          </span>
          <h2 className="font-semibold text-xl">Filters</h2>
        </span>
        <span className="text-xs">Filter according to preference</span>
      </div>
      <div className="border flex flex-col border-gray200 dark:border-alpha-300 bg-white dark:bg-gray700 px-3 md:px-6 xl:px-3 py-6 xl:pt-5 xl:pb-20 mt-3 md:mt-6 rounded-xl">
        <div className="flex md:justify-between flex-wrap xl:flex-col gap-x-8 gap-y-6 md:gap-8">
          {eventFilterData.map((eventFilter) => (
            <div key={eventFilter.title}>
              <button
                type="button"
                onClick={() => setSelectedFilter(eventFilter.title)}
                className={`flex gap-2 md:gap-5 items-center ${
                  selectedFilter === eventFilter.title &&
                  'text-brand-500 hover:text-brand-500 xl:dark:text-alpha-900 xl:text-gray800 xl:hover:text-alpha-900'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xl">{eventFilter.icon}</span>
                  <h3 className="text-sm font-semibold">{eventFilter.title}</h3>
                </div>
                <span
                  className={`text-2xl xl:hidden transition-all ${
                    selectedFilter === eventFilter.title
                      ? 'rotate-90'
                      : '-rotate-90'
                  }`}
                >
                  <RiArrowLeftSLine />
                </span>
              </button>
              <div className="xl:flex gap-2 mt-3 flex-wrap hidden">
                {eventFilter.filter.map((filter) => (
                  <span
                    key={filter}
                    className={
                      'px-3 text-xs border bg-gray50 dark:bg-alpha-50 border-gray200 dark:border-alpha-300 hover:text-alpha-900 hover:bg-brand-500 dark:hover:bg-brand-800 active:bg-brand-500 cursor-pointer py-1 rounded-full'
                    }
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="xl:hidden">
          {eventFilterData
            .filter((item) => item.title === selectedFilter)
            .map((eventFilter) => (
              <div
                key={eventFilter.title}
                className="flex gap-2 mt-5 md:mt-3 flex-wrap"
              >
                {eventFilter.filter.map((filter) => {
                  return (
                    <span
                      key={filter}
                      className={
                        'px-3 text-xs border bg-gray50 dark:bg-transparent border-gray200 dark:border-alpha-300 hover:text-alpha-900 hover:bg-brand-500 dark:hover:bg-brand-800 active:bg-brand-500 cursor-pointer py-1 rounded-full'
                      }
                    >
                      {filter}
                    </span>
                  )
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default EventFilter
