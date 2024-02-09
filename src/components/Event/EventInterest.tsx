import { EventInterestData } from '@/components/Event/event.data'

import React from 'react'

const EventInterest = () => {
  return (
    <div className="flex flex-col xl:flex-row justify-between max-w-[1296px] mx-auto mt-10 md:mt-24 rounded-xl border dark:border-alpha-300 border-gray200 bg-white dark:bg-gray700 py-5 xl:py-[40px] px-4 xl:px-[32px] xl:gap-32">
      <div className="xl:max-w-[250px] w-full">
        <h3 className="text-xl font-semibold text-gray800 dark:text-alpha-900">
          Interests
        </h3>
        <span className="text-sm mt-3">
          Get event suggestion based on your interests.
        </span>
      </div>
      <ul className="flex flex-wrap gap-3 mt-5">
        {EventInterestData.map(interest => {
          return (
            <li
              className="cursor-pointer border border-gray200 list-none rounded-full px-3 md:px-5 py-1 md:py-2 text-sm hover:bg-gray200 dark:hover:bg-alpha-300"
              key={interest}
            >
              {interest}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default EventInterest
