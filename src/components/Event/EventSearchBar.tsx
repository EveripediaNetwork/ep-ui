import React, { useState } from 'react'
import { DatePickerDemo } from '../ui/DatePicker'
import { RiSearchLine } from 'react-icons/ri'
import { getEventByTitle } from '@/services/event'
import { store } from '@/store/store'
import { dateFormater } from '@/lib/utils'

const EventSearchBar = ({
  setEventData,
  setSearchActive,
  setIsLoading,
}: {
  setEventData: Function
  setSearchActive: Function
  setIsLoading: Function
}) => {
  const [searchDate, setSearchDate] = useState<Date>()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchActive(true)

    const form = e.currentTarget
    const messageInput = form.elements.namedItem(
      'search-input',
    ) as HTMLInputElement

    const searchInput = messageInput.value.trim()

    const searchKey = searchInput.toLowerCase().trim()
    const arg: { title: string; startDate?: string } = { title: searchKey }
    if (searchDate) {
      arg.startDate = dateFormater(searchDate)
    }
    // const dateSearchResult = filterEvents(searchKey, searchDate, eventData)
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

  // useEffect(() => {
  //   if (searchDate) console.log(dateFormater(searchDate))
  // }, [searchDate])

  return (
    <form
      onSubmit={submitHandler}
      className="flex max-w-[1100px] -mt-5 md:-mt-7 mx-auto"
    >
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
  )
}

export default EventSearchBar
