import React from 'react'
import { RiArrowUpDownLine } from 'react-icons/ri'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'
import { cn } from '@lib/utils'
import { Filters } from './index.type'
import { useTranslation } from 'next-i18next'

interface FilterOptionProps {
  eventFilter: {
    title: string
    filter: string[]
  }
  category: keyof Filters
  filters: Filters
  handleFilterChange: (category: keyof Filters, filter: string) => void
  dateRange?: DateRange
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  className?: string
}

const FilterOptions: React.FC<FilterOptionProps> = React.memo(
  ({
    eventFilter,
    category,
    filters,
    handleFilterChange,
    dateRange,
    setDateRange,
    className,
  }) => {
    const { t } = useTranslation('event')
    return (
      <div className={cn('xl:flex gap-2 mt-3 flex-wrap hidden', className)}>
        {eventFilter.filter.map((filter) => {
          if (filter === 'Custom Range') {
            return (
              <div key={filter} className="grid grid-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handleFilterChange(category, filter)}
                      className={`px-3 flex gap-2 items-center text-xs border bg-gray50 dark:bg-alpha-50 border-gray200 dark:border-alpha-300 hover:text-alpha-900 hover:bg-brand-500 dark:hover:bg-brand-800 active:bg-brand-500 cursor-pointer py-1 rounded-full ${
                        filters[category]?.includes(filter)
                          ? 'bg-brand-500 dark:bg-brand-800'
                          : ''
                      }`}
                    >
                      <span>{t(`${filter}`)}</span>
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
              key={filter}
              type="button"
              onClick={() => handleFilterChange(category, filter)}
              className={`px-3 text-xs border border-gray200 dark:border-alpha-300 hover:text-alpha-900 xl:hover:bg-brand-500 xl:dark:hover:bg-brand-800 xl:active:bg-brand-500 cursor-pointer py-1 rounded-full ${
                filters[category]?.includes(filter)
                  ? 'bg-brand-500 dark:bg-brand-800'
                  : 'bg-gray50 dark:bg-alpha-50'
              }`}
            >
              {t(`${filter}`)}
            </button>
          )
        })}
      </div>
    )
  },
)

export default FilterOptions
