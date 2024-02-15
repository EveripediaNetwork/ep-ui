import Image from 'next/image'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

const EventMedia = () => {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex flex-col gap-2 xl:gap-4 border bg-white dark:bg-gray700 text-gray600 border-gray200 dark:border-alpha-300 rounded p-3 md:p-5 lg:py-2 xl:py-4 lg:px-2 xl:px-3">
      <button
        type="button"
        onClick={() => setOpen((prevState) => !prevState)}
        className="flex items-center text-gray600 dark:text-alpha-900  gap-2 text-xl"
      >
        <RiArrowDownSLine />
        <span className="font-semibold text-xs uppercase">Media</span>
      </button>
      {open && (
        <div className="grid transition-all grid-cols-3 gap-2 md:gap-4 lg:gap-1 xl:gap-2">
          <div className="rounded-mg relative w-full h-[90px] md:h-[141px] lg:h-[56px] xl:h-[100px]">
            <Image src={'/images/media-1.png'} alt="media" fill />
          </div>
          <div className="rounded-mg relative w-full h-[90px] md:h-[141px] lg:h-[56px] xl:h-[100px]">
            <Image src={'/images/media-1.png'} alt="media" fill />
          </div>
          <div className="rounded-mg relative w-full h-[90px] md:h-[141px] lg:h-[56px] xl:h-[100px]">
            <Image src={'/images/media-1.png'} alt="media" fill />
          </div>
        </div>
      )}
    </div>
  )
}

export default EventMedia
