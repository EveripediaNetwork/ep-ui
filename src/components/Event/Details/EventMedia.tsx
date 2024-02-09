import Image from 'next/image'
import React, { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

const EventMedia = () => {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex flex-col gap-4 border text-gray600 border-gray200 dark:border-alpha-300 rounded-xl py-4 px-3">
      <button
        type="button"
        onClick={() => setOpen((prevState) => !prevState)}
        className="flex items-center text-gray600 dark:text-alpha-900  gap-2 text-xl"
      >
        <RiArrowDownSLine />
        <span className="font-semibold text-xs uppercase">Media</span>
      </button>
      {open && (
        <div className="grid transition-all grid-cols-3 gap-2">
          <div className="rounded-mg relative w-full h-[100px]">
            <Image src={'/images/media-1.png'} alt="media" fill />
          </div>
          <div className="rounded-mg relative w-full h-[100px]">
            <Image src={'/images/media-1.png'} alt="media" fill />
          </div>
          <div className="rounded-mg relative w-full h-[100px]">
            <Image src={'/images/media-1.png'} alt="media" fill />
          </div>
        </div>
      )}
    </div>
  )
}

export default EventMedia
