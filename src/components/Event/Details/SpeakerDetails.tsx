import React from 'react'
import { speakerData } from '../event.data'
import Image from 'next/image'
import Link from 'next/link'

const SpeakerDetails = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-xl md:text-2xl xl:text-4xl">
        Speakers
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 mt-1 md:mt-2 xl:grid-cols-4 gap-4">
        {speakerData.map((details) => (
          <div key={details.name} className="flex flex-col gap-3">
            <Image
              src={'/images/speaker-1.png'}
              alt="speaker"
              width={80}
              height={80}
            />
            <div>
              <h4 className="text-sm hover:underline cursor-pointer xl:text-lg text-brand-500 dark:text-brand-800 font-semibold capitalize">
                {details.name}
              </h4>
              <p className="font-medium dark:text-alpha-800 text-xs xl:text-sm">
                {details.position}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link
          href={'/event/event-details'}
          className="flex items-center text-xs font-medium md:text-sm hover:underline text-brand-500 dark:text-brand-800 gap-2"
        >
          And more...
        </Link>
      </div>
    </div>
  )
}

export default SpeakerDetails
