import Image from 'next/image'
import React from 'react'

const EventDetailsBanner = () => {
  return (
    <div className="">
      <div className="relative w-full h-[400px] rounded-lg">
        <Image src={'/images/event-details.png'} alt="" fill />
      </div>
      <div className="mt-5">
        <p>
          The 5th edition of the Paris Blockchain Week will feature five program
          tracks covering various topics in the following subjects: Open
          Finance, Tech Builders, Corporate Web3, Public Policy, and Enterprise
          Blockchain. Some of the key discussion points covered by the five
          program tracks include macro trends and investments in open finance,
          artificial intelligence, data management, NFT gaming and the
          Metaverse, regulatory trends, and more. Speakers for the 2024 event
          include Algorand Founder Silvio Micali, Stellar Development Foundation
          CEO and Executive Director Denelle Dixon, and Polygon Co-Founder
          Mihailo Bjelic.
        </p>
        <p className="mt-5">
          2023 highlights include discussions focused on digital finance,
          digital finance strategies, tokenization, and infrastructure.
          Prominent individuals and companies, such as Messari Founder and CEO
          Ryan Selkis, UNICEF, and the World Economic Forum also attended the
          2023 summit.
        </p>
      </div>
    </div>
  )
}

export default EventDetailsBanner
