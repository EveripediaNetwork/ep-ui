import React from 'react'

const EventBanner = () => {
  return (
    <div className="bg-alpha-50">
      <div className="flex flex-col w-[95%] xl:w-4/5 mx-auto py-10 md:py-24 items-center">
        <h5 className="text-center text-brand-500 dark:text-brand-800 xl:text-base">
          Events
        </h5>
        <h1 className="text-2xl md:text-4xl xl:text-5xl mb-4 font-semibold text-center max-w-[1050px] text-gray800 dark:text-alpha-900">
          Blockchain and cryptocurrency conferences around the world
        </h1>
        <p className="xl:text-lg text-center max-w-[986px] text-gray600 dark:text-alpha-800">
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
