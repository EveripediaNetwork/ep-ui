import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiArrowLeftSLine, RiFilter3Line } from 'react-icons/ri'
import { eventFilterData } from '../event.data'
import { DateRange } from 'react-day-picker'
import { TEvents } from '@/services/event'
import {
  fetchEventByBlockchain,
  fetchFilteredEventList,
} from '@/services/search/utils'
import { dateFormater } from '@/lib/utils'
import FilterOptions from './FilterOptions'
import { Filters } from './index.type'

const defaultFilters: Filters = {
  date: '',
  location: '',
  eventType: [],
  blockchain: '',
}

const handleFilter = (filter: Filters, dateRange?: DateRange | undefined) => {
  const today = new Date()
  let startDate
  let endDate

  switch (filter.date) {
    case 'Next Week':
      startDate = dateFormater(today)
      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7)
      endDate = dateFormater(nextWeek)
      break
    case 'Next Month':
      const firstDayNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1,
      )
      startDate = dateFormater(firstDayNextMonth)

      const lastDayNextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 2,
        0,
      )
      endDate = dateFormater(lastDayNextMonth)
      break
    default:
      if (dateRange?.from && dateRange?.to) {
        startDate = dateFormater(dateRange.from)
        endDate = dateFormater(dateRange.to)
      } else {
        endDate = undefined
      }
      break
  }

  if (filter.eventType.length > 0) {
    return fetchFilteredEventList(filter.eventType, startDate, endDate)
  } else if (filter.blockchain) {
    return fetchEventByBlockchain(filter.blockchain, startDate, endDate)
  } else {
    return fetchFilteredEventList([], startDate, endDate)
  }
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
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const aggregateResults = async (filters: Filters) => {
    const filterKeys = Object.keys(filters) as (keyof Filters)[]
    const activeFilters = filterKeys.filter((key) =>
      key === 'eventType' ? filters[key].length > 0 : filters[key],
    )
    if (activeFilters.length > 0) {
      setIsLoading(true)
      try {
        const fetchResults = await Promise.all(
          activeFilters.map((key) => {
            switch (key) {
              case 'eventType':
                return handleFilter(filters, dateRange)
              case 'blockchain':
                return handleFilter(filters, dateRange)
              case 'date':
                return handleFilter(filters, dateRange)
              default:
                return Promise.resolve([])
            }
          }),
        )
        const [fetch1 = [], fetch2 = [], fetch3 = []] = fetchResults
        const mergedResults = [...fetch1, ...fetch2, ...fetch3]
        const uniqueResults = Array.from(
          new Set(mergedResults.map((event) => event.id)),
        ).map((id) => {
          return mergedResults.find((event) => event.id === id)!
        })
        setEventData(uniqueResults)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      const interestQuery = { ...router.query }
      if (!interestQuery.tags) {
        setEventData(fetchedData)
      }
    }
  }

  const handleFilterChange = (filterCategory: keyof Filters, value: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }

      if (filterCategory === 'eventType') {
        const isAlreadySelected = prevFilters.eventType.includes(value)
        updatedFilters.eventType = isAlreadySelected
          ? prevFilters.eventType.filter((f) => f !== value)
          : [...prevFilters.eventType, value]
      } else {
        const isRemovingFilter = prevFilters[filterCategory] === value
        updatedFilters[filterCategory] = isRemovingFilter ? '' : value
      }

      const updatedQuery = { ...router.query }

      if (filterCategory === 'eventType') {
        if (updatedFilters.eventType.length > 0) {
          updatedQuery[filterCategory] = updatedFilters.eventType.join(',')
        } else {
          delete updatedQuery[filterCategory]
        }
      } else {
        if (updatedFilters[filterCategory]) {
          updatedQuery[filterCategory] = updatedFilters[filterCategory]
        } else {
          delete updatedQuery[filterCategory]
        }
      }
      router.push(
        { pathname: router.pathname, query: updatedQuery },
        undefined,
        {
          shallow: true,
        },
      )

      return updatedFilters
    })
  }

  useEffect(() => {
    aggregateResults(filters)
  }, [filters, dateRange])

  useEffect(() => {
    const updatedFilters: Filters = { ...defaultFilters }

    // Iterate over each filter key and update the state if a corresponding query parameter exists
    Object.keys(defaultFilters).forEach((key) => {
      const queryParam = router.query[key]
      if (queryParam) {
        if (key === 'eventType') {
          updatedFilters[key] =
            typeof queryParam === 'string' ? queryParam.split(',') : queryParam
        } else if (typeof queryParam === 'string') {
          if (key === 'date' || key === 'blockchain') {
            updatedFilters[key] = queryParam
          }
        }
      }
    })

    setFilters(updatedFilters)
  }, [router.query])

  const clearFilters = () => {
    setFilters(defaultFilters)
    setDateRange(undefined)
    setEventData(fetchedData)
    const newQuery = { ...router.query }
    Object.keys(defaultFilters).forEach((key) => {
      delete newQuery[key]
    })
    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    })
  }

  return (
    <div>
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="text-xl">
            <RiFilter3Line />
          </span>
          <h2 className="font-semibold text-xl">Filters</h2>
        </span>
        <div className="flex justify-between">
          <span className="text-xs">Filter according to preference</span>
          <button
            onClick={clearFilters}
            type="button"
            className="underline cursor-pointer text-xs"
          >
            clear all
          </button>
        </div>
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
              <FilterOptions
                eventFilter={eventFilter}
                category={
                  eventFilter.title === 'Event Type'
                    ? 'eventType'
                    : (eventFilter.title.toLowerCase() as keyof Filters)
                }
                filters={filters}
                handleFilterChange={handleFilterChange}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>
          ))}
        </div>
        <div className="xl:hidden">
          {eventFilterData
            .filter((item) => item.title === selectedFilter)
            .map((eventFilter) => (
              <FilterOptions
                key={eventFilter.title}
                eventFilter={eventFilter}
                category={
                  eventFilter.title === 'Event Type'
                    ? 'eventType'
                    : (eventFilter.title.toLowerCase() as keyof Filters)
                }
                filters={filters}
                handleFilterChange={handleFilterChange}
                dateRange={dateRange}
                setDateRange={setDateRange}
                className="flex xl:hidden"
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default EventFilter
