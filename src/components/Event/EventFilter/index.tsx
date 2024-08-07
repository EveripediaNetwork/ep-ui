import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiArrowLeftSLine, RiFilter3Line } from 'react-icons/ri'
import { eventFilterData } from '../event.data'
import type { DateRange } from 'react-day-picker'
import type { TEvents } from '@/services/event'
import {
  fetchEventByBlockchain,
  fetchEventByLocation,
  fetchFilteredEventList,
} from '@/services/search/utils'
import { dateFormater } from '@/lib/utils'
import FilterOptions from './FilterOptions'
import type { Filters } from './index.type'
import { useTranslation } from 'next-i18next'

const defaultFilters: Filters = {
  date: '',
  location: '',
  eventType: [],
  blockchain: '',
}

const handleFilter = (filter: Filters, dateRange?: DateRange | undefined) => {
  const today = new Date()
  let startDate: string | undefined
  let endDate: string | undefined

  switch (filter.date) {
    case 'Next Week':
      const dayOfWeek = today.getDay()
      const currentDay = today.getDate()

      // Calculate the next Monday (start of the next week)
      const daysUntilNextMonday = 8 - dayOfWeek
      const nextMonday = new Date(today)
      nextMonday.setDate(currentDay + daysUntilNextMonday)

      // Calculate the Sunday at the end of that next week
      const nextSunday = new Date(nextMonday)
      nextSunday.setDate(nextMonday.getDate() + 6)

      startDate = dateFormater(nextMonday)
      endDate = dateFormater(nextSunday)
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
    case 'Custom Range':
      if (dateRange?.from && dateRange?.to) {
        startDate = dateFormater(dateRange.from)
        endDate = dateFormater(dateRange.to)
      } else {
        endDate = undefined
      }
      break
    default:
  }

  if (filter.eventType.length > 0) {
    return fetchFilteredEventList(filter.eventType, startDate, endDate)
  }
  if (filter.blockchain) {
    return fetchEventByBlockchain(filter.blockchain, startDate, endDate)
  }
  if (filter.location) {
    return fetchEventByLocation(filter.location, startDate, endDate)
  }
  return fetchFilteredEventList([], startDate, endDate)
}

const EventFilter = ({
  fetchedData,
  setEventData,
  setIsLoading,
}: {
  fetchedData: TEvents[]
  setEventData: (data: TEvents[]) => void
  setIsLoading: (isLoading: boolean) => void
}) => {
  const [selectedFilter, setSelectedFilter] = useState('Date')
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const router = useRouter()
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const { t } = useTranslation('event')

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
              case 'location':
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
    for (const key of Object.keys(defaultFilters)) {
      const queryParam = router.query[key]
      if (queryParam) {
        if (key === 'eventType') {
          updatedFilters[key] =
            typeof queryParam === 'string' ? queryParam.split(',') : queryParam
        } else if (typeof queryParam === 'string') {
          if (key === 'date' || key === 'blockchain' || key === 'location') {
            updatedFilters[key] = queryParam
          }
        }
      }
    }

    setFilters(updatedFilters)
  }, [router.query])

  const clearFilters = () => {
    setFilters(defaultFilters)
    setDateRange(undefined)
    setEventData(fetchedData)
    const newQuery = { ...router.query }
    for (const key of Object.keys(defaultFilters)) {
      delete newQuery[key]
    }
    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    })
  }

  const isFilterActive = Object.keys(filters).some((key) => {
    const value = filters[key as keyof Filters]
    if (typeof value === 'string') {
      return value.trim() !== ''
    }
    if (Array.isArray(value)) {
      return value.length > 0
    }
    return false
  })

  return (
    <div>
      <div className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="text-xl">
            <RiFilter3Line />
          </span>
          <h2 className="font-semibold text-xl">{t('filtersTitle')}</h2>
        </span>
        <div className="flex justify-between">
          <span className="text-xs">{t('filtersDescription')}</span>
          <button
            onClick={clearFilters}
            type="button"
            className={`underline cursor-pointer text-xs ${
              !isFilterActive ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isFilterActive}
          >
            {t('clearAll')}
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
                  <h3 className="text-sm font-semibold">
                    {t(`${eventFilter.title}`)}
                  </h3>
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
