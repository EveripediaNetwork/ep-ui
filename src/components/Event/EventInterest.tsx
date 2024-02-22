import { EventInterestData } from '@/components/Event/event.data'
import { TEvents, useGetEventsQuery } from '@/services/event'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'

const EventInterest = ({
  eventData,
  setEventData,
}: {
  eventData: TEvents[]
  setEventData: Function
}) => {
  const { data } = useGetEventsQuery()
  const router = useRouter()
  const { query, pathname } = router
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelected) => {
      if (prevSelected.includes(tag)) {
        return prevSelected.filter((t) => t !== tag)
      } else {
        return [...prevSelected, tag].slice(0, 4) // Limit to 4 tags
      }
    })
  }

  function filterEventsByTags(
    events: TEvents[],
    filterTags: string[],
  ): TEvents[] {
    return events.filter((event) =>
      event.tags?.some((tag) =>
        filterTags.map((t) => t.toLowerCase()).includes(tag.id.toLowerCase()),
      ),
    )
  }

  useEffect(() => {
    const currentQueryParams = { ...query }
    if (selectedTags.length > 0) {
      currentQueryParams.tags = selectedTags
    } else {
      delete currentQueryParams.tags
    }
    router.replace(
      {
        pathname: pathname,
        query: currentQueryParams,
      },
      undefined,
      { shallow: true },
    )
    if (selectedTags.length > 0) {
      const filteredEvents = filterEventsByTags(eventData, selectedTags)
      setEventData(filteredEvents)
    } else {
      setEventData(data)
    }
  }, [selectedTags])

  return (
    <div className="flex flex-col xl:flex-row justify-between max-w-[1296px] mx-auto mt-10 md:mt-24 rounded-xl border dark:border-alpha-300 border-gray200 bg-white dark:bg-gray700 py-5 xl:py-[40px] px-4 xl:px-[32px] xl:gap-32">
      <div className="xl:max-w-[250px] flex flex-col gap-3 w-full">
        <h3 className="text-xl font-semibold text-gray800 dark:text-alpha-900">
          Interests
        </h3>
        <span className="text-sm">
          Get event suggestion based on your interests.
        </span>
      </div>
      <div className="flex flex-wrap gap-3 mt-5">
        {EventInterestData.map((interest) => {
          return (
            <button
              type="button"
              onClick={() => toggleTag(interest)}
              className={`cursor-pointer border border-gray200 dark:border-alpha-300 list-none rounded-full px-3 md:px-5 py-1 md:py-2 text-sm hover:bg-gray200 dark:hover:bg-alpha-300 ${
                selectedTags.includes(interest)
                  ? 'bg-gray200 dark:bg-alpha-300'
                  : ''
              }`}
              key={interest}
            >
              {interest}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EventInterest
