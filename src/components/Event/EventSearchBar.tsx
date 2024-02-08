import React from 'react'
import { DatePickerDemo } from '../ui/DatePicker'
import { RiSearchLine } from 'react-icons/ri'

const EventSearchBar = () => {
  return (
    <div className="flex max-w-[1100px] -mt-7 mx-auto">
      <div className="flex flex-1 divide-x rounded-l-lg divide-alpha-500 bg-gray700 border-y border-l border-alpha-300 px-3">
        <div className="flex gap-2 w-full items-center max-w-[523px] outline-none py-3 xl:py-4">
          <span className="cursor-pointer text-alpha-700 text-2xl shrink-0">
            <RiSearchLine />
          </span>
          <input
            placeholder="Search by events, name, location,  and more"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <DatePickerDemo />
      </div>
      <button
        type="button"
        className="px-10 h-auto bg-[#FF5CAA] rounded-r-lg dark:bg-[#FF1A88]"
      >
        Search
      </button>
    </div>
  )
}

export default EventSearchBar
