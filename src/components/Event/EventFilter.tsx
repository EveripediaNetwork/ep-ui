import React from 'react'
import {
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
      <div className="border flex flex-col gap-8 border-alpha-300 bg-gray-700 px-3 pt-5 pb-20 mt-6 rounded-xl">
        {eventFilterData.map((eventFilter) => (
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl">{eventFilter.icon}</span>
              <h3 className="text-sm font-semibold">{eventFilter.title}</h3>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {eventFilter.filter.map((filter) => (
                <span className="px-3 text-xs border hover:bg-brand-800 active:bg-brand-800 cursor-pointer border-alpha-300 py-1 rounded-full">
                  {filter}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventFilter
