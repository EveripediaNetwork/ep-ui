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
import { SelectSingleEventHandler } from 'react-day-picker'

export function DatePickerDemo({
  date,
  onDateSelect,
}: {
  date: Date | undefined
  onDateSelect: SelectSingleEventHandler
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'max-w-[183px] hidden md:flex xl:max-w-[428px] w-full justify-start text-left font-normal h-auto hover:bg-transparent rounded-none',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-6 w-6 text-gray500 dark:text-alpha-700" />
          {date ? (
            format(date, 'PPP')
          ) : (
            <span className="text-gray500 dark:text-alpha-700">
              Select date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}