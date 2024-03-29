import React from 'react'
import { DatePickerDemo } from '../ui/DatePicker'
import { RiSearchLine } from 'react-icons/ri'
import { getEventByTitle } from '@/services/event'
import { store } from '@/store/store'
import { dateFormater } from '@/lib/utils'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'

const EventSearchBar = ({
  setEventData,
  setSearchActive,
  setIsLoading,
  searchDate,
  setSearchDate,
  searchQuery,
  setSearchQuery,
}: {
  setEventData: Function
  setSearchActive: Function
  setIsLoading: Function
  searchDate: DateRange | undefined
  setSearchDate: SelectRangeEventHandler
  searchQuery: string
  setSearchQuery: Function
}) => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchActive(true)

    const arg: { title: string; startDate?: string; endDate?: string } = {
      title: searchQuery,
    }
    if (searchDate?.from || searchDate?.to) {
      arg.startDate = searchDate?.from && dateFormater(searchDate.from)
      arg.endDate = searchDate?.to && dateFormater(searchDate.to)
    }
    setIsLoading(true)
    store
      .dispatch(getEventByTitle.initiate(arg))
      .then((response) => {
        if (response.data) {
          setEventData(response.data)
        } else if (response.error) console.error(response.error)
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    // Your logic here, e.g., logging the input's new value
    setSearchQuery(event.target.value)
  }

  return (
    <div className="max-w-[1296px] mx-auto ">
      <form onSubmit={submitHandler} className="flex max-w-[1100px]">
        <div className="flex flex-1 divide-x rounded-l-lg divide-gray200 dark:divide-alpha-500 dark:bg-gray700 bg-white border-y border-l border-gray200 dark:border-alpha-300 px-3">
          <div className="flex gap-2 w-full items-center max-w-[523px] outline-none py-3 xl:py-4">
            <button
              type="submit"
              className="cursor-pointer text-gray500 dark:text-alpha-700 text-[12px] md:text-lg xl:text-2xl shrink-0"
            >
              <RiSearchLine />
            </button>
            <input
              name="search-input"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search by events, name, location,  and more"
              className="w-full bg-transparent text-[10px] md:text-sm outline-none"
            />
          </div>
          <DatePickerDemo date={searchDate} onDateSelect={setSearchDate} />
        </div>
        <button
          type="submit"
          className="px-4 md:px-10 h-auto bg-[#FF5CAA] text-white text-[10px] font-medium md:text-base rounded-r-lg dark:bg-[#FF1A88]"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default EventSearchBar
