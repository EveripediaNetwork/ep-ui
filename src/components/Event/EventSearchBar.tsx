import React from 'react'
import { DatePickerDemo } from '../ui/DatePicker'
import { RiSearchLine } from 'react-icons/ri'

const EventSearchBar = () => {
  return (
    <div className="flex max-w-[1100px] -mt-5 md:-mt-7 mx-auto">
      <div className="flex flex-1 divide-x rounded-l-lg divide-gray200 dark:divide-alpha-500 dark:bg-gray700 bg-white border-y border-l border-gray200 dark:border-alpha-300 px-3">
        <div className="flex gap-2 w-full items-center max-w-[523px] outline-none py-3 xl:py-4">
          <span className="cursor-pointer text-gray500 dark:text-alpha-700 text-[12px] md:text-lg xl:text-2xl shrink-0">
            <RiSearchLine />
          </span>
          <input
            placeholder="Search by events, name, location,  and more"
            className="w-full bg-transparent text-[10px] md:text-sm outline-none"
          />
        </div>
        <DatePickerDemo />
      </div>
      <button
        type="button"
        className="px-4 md:px-10 h-auto bg-[#FF5CAA] text-white text-[10px] font-medium md:text-base rounded-r-lg dark:bg-[#FF1A88]"
      >
        Search
      </button>
    </div>
  )
}

export default EventSearchBar
