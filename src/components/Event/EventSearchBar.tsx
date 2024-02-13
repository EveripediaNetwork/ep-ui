import React, { useState } from 'react'
import { DatePickerDemo } from '../ui/DatePicker'
import { RiSearchLine } from 'react-icons/ri'
import { IEventData } from './event.data'

const filterEvents = (
  searchKey: string,
  date: Date | undefined,
  eventData: IEventData[],
): IEventData[] => {
  const filteredEvents = eventData.filter((event) => {
    const { title, location, speakers, tags, date: eventDateStr } = event

    // Filter by search key
    const matchesSearchKey =
      searchKey !== '' &&
      (title.toLowerCase().includes(searchKey.toLowerCase()) ||
        location.toLowerCase().includes(searchKey.toLowerCase()) ||
        speakers?.some((speaker) =>
          speaker.name.toLowerCase().includes(searchKey.toLowerCase()),
        ) ||
        tags?.some((tag) =>
          tag.toLowerCase().includes(searchKey.toLowerCase()),
        ))

    // If date is undefined, consider it as not applying date filtering
    if (date === undefined) {
      return matchesSearchKey
    }

    // Filter by date
    const [startDateStr, endDateStr] = eventDateStr.split('/')
    const startDate = new Date(startDateStr)
    const endDate = endDateStr ? new Date(endDateStr) : new Date(startDateStr)

    const compareDate = new Date(date)
    compareDate.setDate(compareDate.getDate() + 1)
    compareDate.setUTCHours(0, 0, 0, 0)

    const isDateInRange = compareDate >= startDate && compareDate <= endDate

    console.log({ matchesSearchKey })
    console.log({ isDateInRange })
    // Return true if the event matches search key and (optionally) date criteria
    return matchesSearchKey || isDateInRange
  })

  return filteredEvents
}

const EventSearchBar = ({
  eventData,
  setEventData,
}: {
  eventData: IEventData[]
  setEventData: Function
}) => {
  const [searchDate, setSearchDate] = useState<Date>()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const messageInput = form.elements.namedItem(
      'search-input',
    ) as HTMLInputElement

    const searchInput = messageInput.value.trim()

    const searchKey = searchInput.toLowerCase().trim()

    const dateSearchResult = filterEvents(searchKey, searchDate, eventData)

    const results = dateSearchResult
    console.log(results)

    setEventData(results)
    setSearchDate(undefined)
    form.reset()
  }
  return (
    <form
      onSubmit={submitHandler}
      className="flex max-w-[1100px] -mt-5 md:-mt-7 mx-auto"
    >
      <div className="flex flex-1 divide-x rounded-l-lg divide-gray200 dark:divide-alpha-500 dark:bg-gray700 bg-white border-y border-l border-gray200 dark:border-alpha-300 px-3">
        <div className="flex gap-2 w-full items-center max-w-[523px] outline-none py-3 xl:py-4">
          <span className="cursor-pointer text-gray500 dark:text-alpha-700 text-[12px] md:text-lg xl:text-2xl shrink-0">
            <RiSearchLine />
          </span>
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
