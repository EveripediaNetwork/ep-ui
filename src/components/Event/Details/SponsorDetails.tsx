import Image from 'next/image'
import React from 'react'
import { sponsorData } from '../event.data'

const SponsorDetails = () => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-2xl xl:text-4xl">Sponsors</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sponsorData.map((sponsor, index) => (
          <div
            key={index}
            className="flex justify-center h-[88px] items-center border py-2 px-2 border-gray200 dark:border-alpha-300 rounded-md gap-3"
          >
            <Image
              src={sponsor.src}
              alt="speaker"
              width={sponsor.width}
              height={sponsor.height}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SponsorDetails
