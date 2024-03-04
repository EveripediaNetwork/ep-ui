import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  RiArrowLeftSLine,
  RiArrowUpDownLine,
  RiFilter3Line,
} from 'react-icons/ri'
import { eventFilterData } from './event.data'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { TEvents } from '@/services/event'
import {
  fetchEventByBlockchain,
  fetchFilteredEventList,
} from '@/services/search/utils'
import { dateFormater } from '@/lib/utils'

interface Filters {
  date: string
  location: string
  eventType: string[]
  blockchain: string
}

const EventFilter = ({
  fetchedData,
  setEventData,
  setIsLoading,
}: {
  fetchedData: TEvents[]
  setEventData: Function
  setIsLoading: Function
}) => {
  const [selectedFilter, setSelectedFilter] = useState('Date')
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>({
    date: '',
    location: '',
    eventType: [],
    blockchain: '',
  })

  const aggregateResults = (filters: Filters) => {
    const filterKeys = Object.keys(filters) as (keyof Filters)[]
    const selectedFilters = filterKeys.filter((key) =>
      key === 'eventType' ? filters[key].length > 0 : filters[key] !== '',
    )
    const today = dateFormater(new Date())

    if (selectedFilters.length > 0) {
      setIsLoading(true)
      const requests = selectedFilters.map((key) => {
        if (key === 'eventType' && filters.eventType.length > 0) {
          return fetchFilteredEventList(filters.eventType)
        }
        if (key === 'blockchain') {
          return fetchEventByBlockchain(filters[key])
        }
        if (filters[key] === 'Next Week') {
          const nextWeek = new Date()
          nextWeek.setDate(nextWeek.getDate() + 7)
          return fetchFilteredEventList([], today, dateFormater(nextWeek))
        } else if (filters[key] === 'Next Month') {
          const nextMonth = new Date()
          nextMonth.setMonth(nextMonth.getMonth() + 1)
          return fetchFilteredEventList([], today, dateFormater(nextMonth))
        } else {
          // Custom Range
          const startDate = dateRange?.from || ''
          const endDate = dateRange?.to || ''

          // Handle undefined or invalid custom range dates
          if (!startDate || !endDate) {
            console.error('Invalid custom range: missing start or end date')
            return
          }

          // Convert strings to Date objects (if necessary)
          const parsedStartDate = new Date(startDate)
          const parsedEndDate = new Date(endDate)

          // Ensure start date is before end date
          if (parsedStartDate >= parsedEndDate) {
            console.error('Invalid custom range: start date after end date')
            return
          }

          return fetchFilteredEventList(
            [],
            dateFormater(parsedStartDate),
            dateFormater(parsedEndDate),
          )
        }
      })

      Promise.all(requests)
        .then((res) => {
          const [fetch1 = [], fetch2 = [], fetch3 = []] = res

          const result = [...fetch1, ...fetch2, ...fetch3]

          const uniqueArr = result.filter(
            (obj, index, self) =>
              index === self.findIndex((t) => t.id === obj.id),
          )
          setEventData(uniqueArr)
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false))
    } else {
      setEventData(fetchedData)
    }
  }

  const handleFilterChange = (filterCategory: keyof Filters, value: string) => {
    setFilters((prevFilters) => {
      if (filterCategory === 'eventType') {
        const isAlreadySelected = prevFilters.eventType.includes(value)
        const newEventTypeFilters = isAlreadySelected
          ? prevFilters.eventType.filter((f) => f !== value)
          : [...prevFilters.eventType, value]

        return { ...prevFilters, eventType: newEventTypeFilters }
      }

      const isRemovingFilter = prevFilters[filterCategory] === value
      const newFilterValue = isRemovingFilter ? '' : value
      const newFilters = { ...prevFilters, [filterCategory]: newFilterValue }

      const query = { ...router.query, [filterCategory]: newFilterValue }
      if (isRemovingFilter) {
        delete query[filterCategory]
      }
      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      })

      return newFilters
    })
  }

  useEffect(() => {
    aggregateResults(filters)
  }, [filters, dateRange, fetchedData])

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
                {eventFilter.filter.map((filter) => {
                  const category =
                    eventFilter.title === 'Event Type'
                      ? 'eventType'
                      : eventFilter.title.toLowerCase()
                  if (filter === 'Custom Range') {
                    return (
                      <div key={filter} className="grid grid-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              onClick={() =>
                                handleFilterChange(
                                  category as keyof Filters,
                                  filter,
                                )
                              }
                              className={`px-3 flex gap-2 items-center text-xs border bg-gray50 dark:bg-alpha-50 border-gray200 dark:border-alpha-300 hover:text-alpha-900 hover:bg-brand-500 dark:hover:bg-brand-800 active:bg-brand-500 cursor-pointer py-1 rounded-full ${
                                filters[category as keyof Filters].includes(
                                  filter,
                                )
                                  ? 'bg-brand-500 dark:bg-brand-800'
                                  : ''
                              }`}
                            >
                              <span>{filter}</span>
                              <RiArrowUpDownLine />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={dateRange?.from}
                              selected={dateRange}
                              onSelect={setDateRange}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )
                  }
                  return (
                    <button
                      onClick={() =>
                        handleFilterChange(category as keyof Filters, filter)
                      }
                      key={filter}
                      type="button"
                      className={`px-3 text-xs border bg-gray50 dark:bg-alpha-50 border-gray200 dark:border-alpha-300 hover:text-alpha-900 hover:bg-brand-500 dark:hover:bg-brand-800 active:bg-brand-500 cursor-pointer py-1 rounded-full ${
                        filters[category as keyof Filters].includes(filter)
                          ? 'bg-brand-500 dark:bg-brand-800'
                          : ''
                      }`}
                    >
                      {filter}
                    </button>
                  )
                })}
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
