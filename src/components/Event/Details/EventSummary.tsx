import Image from 'next/image'
import React from 'react'
import {
  RiTwitterFill,
  RiFacebookBoxFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
} from 'react-icons/ri'

const EventSummary = () => {
  const eventType = ['Conference', 'Paid']
  const tags = ['Crypto', 'BTC', 'Ethereun', 'NTFs', 'Blockchain', 'Finance']
  return (
    <div className="flex flex-col gap-4 border text-gray600 dark:text-alpha-900 border-gray200 dark:border-alpha-300 rounded-lg py-4 px-[14px] md:px-5 md:py-9 lg:py-[9px] lg:px-[7px] xl:py-4 xl:px-3">
      <div className="relative w-full h-[220px] md:h-[377px] lg:h-[173px] xl:h-[305px]">
        <Image src={'/images/details-2.png'} fill alt="details" />
      </div>
      <button
        type="button"
        className="bg-brand-500 dark:bg-brand-800 font-semibold text-xs rounded-md text-white flex justify-center py-[14px] lg:py-2 xl:py-[10px] w-full"
      >
        Register/Get Tickets
      </button>
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[10px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Location</span>
        <span className="max-w-[163px] md:max-w-full lg:max-w-[119px] xl:max-w-full">
          Le Carrousel du Louvre (Paris, France)
        </span>
      </span>
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[10px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Date</span>
        <span>April 8-12, 2024</span>
      </span>
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[10px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Time</span>
        <span>12:00PM - 7:00PM GMT</span>
      </span>
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[10px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Social profiles</span>
        <span className="flex text-2xl md:text-xl xl:text-2xl items-center gap-1">
          <RiTwitterFill />
          <RiFacebookBoxFill />
          <RiInstagramFill />
          <RiLinkedinBoxFill />
        </span>
      </span>
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[8px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Event type</span>
        <span className="flex gap-2 md:col-span-2 lg:col-span-1 flex-wrap">
          {eventType.map((type) => (
            <span
              key={type}
              className="rounded-full px-2 py-1 border border-gray300 dark:border-alpha-300"
            >
              {type}
            </span>
          ))}
        </span>
      </span>
      <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-xs lg:text-[8px] xl:text-xs font-medium rounded-lg bg-gray100 dark:bg-gray700 items-center px-4 lg:px-2 xl:px-4 py-3">
        <span className="col-span-1">Tags</span>
        <span className="flex flex-1 max-w-[209px] md:col-span-2 lg:col-span-1 md:max-w-full lg:max-w-[150px] xl:max-w-[219px] gap-1 xl:gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-1 border border-gray300 dark:border-alpha-300"
            >
              {tag}
            </span>
          ))}
        </span>
      </span>
    </div>
  )
}

export default EventSummary
