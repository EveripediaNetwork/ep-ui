import { useColorMode } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import SuggestEventModal from './SuggestEventModal'

const EventEmptyState = () => {
  const { colorMode } = useColorMode()
  return (
    <div className="text-center mt-10">
      <div className="relative w-[420px] h-[240px] mx-auto">
        <Image
          src={
            colorMode === 'dark'
              ? '/images/svg-images/event-empty-dark.svg'
              : '/images/svg-images/event-empty.svg'
          }
          alt="event empty state illustration"
          fill
          className="object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray900 dark:text-alpha-900">
        Opps! It looks like there's nothing scheduled just yet!
      </h2>
      <span className="text-gray600 dark:text-alpha-800">
        Stay tuned for exciting updates and upcoming events.
      </span>
      <div className="mt-10">
        <SuggestEventModal showBtn={true} />
      </div>
    </div>
  )
}

export default EventEmptyState
