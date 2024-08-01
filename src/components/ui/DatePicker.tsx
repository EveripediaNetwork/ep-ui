'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'
import { useTranslation } from 'next-i18next'

export function DatePickerDemo({
  date,
  onDateSelect,
  containerClassName,
  hideIcon,
}: {
  date: DateRange | undefined
  onDateSelect: SelectRangeEventHandler
  containerClassName?: string
  hideIcon?: boolean
}) {
  const { t } = useTranslation('event')
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'max-w-[183px] hidden md:flex xl:max-w-[523px] w-full justify-start text-left font-normal h-auto hover:bg-transparent rounded-none',
            !date && 'text-muted-foreground',
            containerClassName,
          )}
        >
          {hideIcon ? (
            ''
          ) : (
            <CalendarIcon className="mr-2 h-6 w-6 text-gray500 dark:text-alpha-700" />
          )}

          <span className="text-gray500 dark:text-alpha-700">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              t('searchDatePlaceholder')
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          onSelect={onDateSelect}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
