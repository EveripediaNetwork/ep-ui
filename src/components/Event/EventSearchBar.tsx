import React, { useEffect } from 'react'
import { DatePickerDemo } from '../ui/DatePicker'
import { RiSearchLine } from 'react-icons/ri'
import { getEventByLocation, getEventByTitle } from '@/services/event'
import { store } from '@/store/store'
import { dateFormater } from '@/lib/utils'
import {
  ActiveModifiers,
  DateRange,
  SelectRangeEventHandler,
} from 'react-day-picker'
import { useRouter } from 'next/router'

type TQuerySearch = {
  arg: { title: string; startDate?: string; endDate?: string }
}

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
  const router = useRouter()

  const fetchEventSearch = async ({ arg }: TQuerySearch) => {
    const { data } = await store.dispatch(getEventByTitle.initiate(arg))
    const { data: locationData } = await store.dispatch(
      getEventByLocation.initiate({
        location: arg.title,
        startDate: arg.startDate,
        endDate: arg.endDate,
      }),
    )

    const mergedResults = [...(data || []), ...(locationData || [])]

    const uniqueResults = Array.from(
      new Set(mergedResults.map((event) => event.id)),
    ).map((id) => {
      return mergedResults.find((event) => event.id === id)!
    })

    return uniqueResults
  }

  useEffect(() => {
    const query = router.query
    if (query.title || query.startDate || query.endDate) {
      setSearchActive(true)
      const arg = {
        title: (query.title as string) || '',
        startDate: (query.startDate as string) || undefined,
        endDate: (query.endDate as string) || undefined,
      }

      const activeModifiers: ActiveModifiers = {} // assuming this is the correct type
      const mouseEvent = {} as React.MouseEvent<Element, MouseEvent> //
      if (query.title) setSearchQuery(query.title)
      if (query.startDate) {
        const startDate = new Date(query.startDate as string)
        setSearchDate(
          { from: startDate, to: undefined },
          startDate,
          activeModifiers,
          mouseEvent,
        )
      }
      if (query.endDate) {
        const startDate = new Date(query.startDate as string)
        const endDate = new Date(query.endDate as string)
        setSearchDate(
          { from: startDate, to: endDate },
          startDate,
          activeModifiers,
          mouseEvent,
        )
      }

      setIsLoading(true)
      fetchEventSearch({ arg })
        .then((response) => {
          setEventData(response)
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    }
  }, [router.query])

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearchActive(true)

    const queryParams: {
      title?: string
      startDate?: string
      endDate?: string
    } = {}

    if (searchQuery) queryParams.title = searchQuery
    if (searchDate?.from) queryParams.startDate = dateFormater(searchDate.from)
    if (searchDate?.to) queryParams.endDate = dateFormater(searchDate.to)

    // Update the URL query parameters.
    router.push(
      {
        pathname: router.pathname,
        query: queryParams,
      },
      undefined,
      { shallow: true },
    )
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div className="max-w-[1296px] mx-auto ">
      <form onSubmit={submitHandler} className="flex max-w-[1100px]">
        <div className="flex flex-1 divide-x rounded-l-lg divide-gray200 dark:divide-alpha-500 dark:bg-gray700 bg-white border-y border-l border-gray200 dark:border-alpha-300 px-3">
          <div className="flex gap-2 w-full items-center max-w-[523px] outline-none py-3 xl:py-4">
            <button
              type="submit"
              className="cursor-pointer text-gray500 dark:text-alpha-700 text-base md:text-lg xl:text-2xl shrink-0"
            >
              <RiSearchLine />
            </button>
            <input
              name="search-input"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Search by events, name, location,  and more"
              className="w-full bg-transparent text-xs md:text-sm outline-none"
            />
          </div>
          <DatePickerDemo date={searchDate} onDateSelect={setSearchDate} />
        </div>
        <button
          type="submit"
          className="px-4 md:px-10 h-auto bg-[#FF5CAA] text-white text-xs font-medium md:text-base rounded-r-lg dark:bg-[#FF1A88]"
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default EventSearchBar
