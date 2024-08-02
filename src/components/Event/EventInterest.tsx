import { EventInterestData } from '@/components/Event/event.data'
import { TEvents, getEventsByTags } from '@/services/event'
import { store } from '@/store/store'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const EventInterest = ({
  eventData,
  setEventData,
  setIsLoading,
}: {
  eventData: TEvents[]
  setEventData: Function
  setIsLoading: Function
}) => {
  const router = useRouter()
  const { t } = useTranslation('event')
  const { query, pathname } = router
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleTag = (tag: string) => {
    setSelectedTags((prevSelected) => {
      let updatedTags: string[] = [...prevSelected]
      if (prevSelected.includes(tag)) {
        updatedTags = prevSelected.filter((t) => t !== tag)
      } else {
        updatedTags = [...prevSelected, tag].slice(0, 4)
      }

      const currentQueryParams = { ...query }
      if (updatedTags.length > 0) {
        currentQueryParams.tags = updatedTags
        setIsLoading(true)
        filterEventsByTags(updatedTags)
          .then((res) => setEventData(res))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false))
      } else {
        delete currentQueryParams.tags
        setEventData(eventData)
      }
      router.replace(
        {
          pathname: pathname,
          query: currentQueryParams,
        },
        undefined,
        { shallow: true },
      )
      return updatedTags
    })
  }

  async function filterEventsByTags(filterTags: string[]) {
    const { data } = await store.dispatch(
      getEventsByTags.initiate({
        tagIds: filterTags,
      }),
    )
    return data
  }

  useEffect(() => {
    const tagsFromQuery = query.tags
    if (tagsFromQuery) {
      const tagsArray =
        typeof tagsFromQuery === 'string' ? [tagsFromQuery] : tagsFromQuery
      setSelectedTags(tagsArray)
    }
  }, [query.tags])

  return (
    <div className="flex flex-col xl:flex-row justify-between max-w-[1296px] mx-auto mt-6 md:mt-[30px] rounded-xl border dark:border-alpha-300 border-gray200 bg-white dark:bg-gray700 py-3 md:py-5 px-4 xl:px-[32px] xl:gap-32">
      <div className="xl:max-w-[200px] flex flex-col gap-2 xl:gap-3 w-full">
        <h3 className="text-xl font-semibold text-gray800 dark:text-alpha-900">
          {t('eventsInterestHeading')}
        </h3>
        <span className="text-sm">{t('eventsInterestDescription')}</span>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 xl:mt-0">
        {EventInterestData.map((interest) => {
          return (
            <button
              type="button"
              onClick={() => toggleTag(interest)}
              className={`cursor-pointer border border-gray200 dark:border-alpha-300 list-none rounded-full px-3 md:px-4 py-1 md:py-2 text-sm hover:bg-gray200 dark:hover:bg-alpha-300 ${
                selectedTags.includes(interest)
                  ? 'bg-gray200 dark:bg-alpha-300'
                  : ''
              }`}
              key={interest}
            >
              {t(`interests.${interest}`)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EventInterest
