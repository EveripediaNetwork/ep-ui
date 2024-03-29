import React from 'react'

const EventBanner = () => {
  return (
    <div className="w-full px-4 md:px-10 dark:bg-gray800">
      <div className="flex max-w-[1296px] mx-auto flex-col py-4 md:py-6">
        <h1 className="md:text-xl lg:text-2xl mb-1 font-semibold text-gray800 dark:text-alpha-900">
          Blockchain and cryptocurrency conferences around the world
        </h1>
        <p className="text-xs md:text-sm lg:text-base text-gray600 dark:text-alpha-800 max-w-[1126px]">
          Learn from the industry experts on crypto trends, explore investment
          opportunities, network with potential partners, connect with
          like-minded individuals, and cultivate relationships for future
          collaborations at global blockchain and crypto events and conferences.
        </p>
      </div>
    </div>
  )
}

export default EventBanner
