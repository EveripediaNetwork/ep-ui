import Image from 'next/image'
import React from 'react'
import {
  RiArrowRightUpLine,
  RiCalendar2Line,
  RiMapPinRangeLine,
} from 'react-icons/ri'

const EventCard = () => {
  return (
    <div className="flex gap-6">
      <span className="rounded-full z-10 w-6 h-6 text-white bg-brand-500 dark:bg-brand-800 flex justify-center items-center">
        <RiArrowRightUpLine />
      </span>
      <div className="border border-gray200 dark:border-alpha-300 bg-white dark:bg-gray700 rounded-xl px-3 h-fit py-[14px] w-full flex gap-9">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm dark:text-alpha-900 text-gray800">
              Crypto Finance Conference
            </h3>
            <p className="text-xs text-gray600 dark:text-alpha-800 mt-1">
              CFC St. Moritz is a curated, application-only event designed for
              NFT investors and decision-makers. It admits only 250
              international UHNWI, institutional investors, funds, and family
              offices.
            </p>
            <div className="flex text-xs my-2 divide-x items-center">
              <span className="pr-2 flex gap-1 items-center">
                <span className="text-brand-800 ">
                  <RiCalendar2Line />
                </span>
                <span>10th-13th, January 2024</span>
              </span>
              <span className="pl-2 flex gap-1 items-center">
                <span className="text-brand-800 ">
                  <RiMapPinRangeLine />
                </span>
                <span>St. Moritz, Switzerland</span>
              </span>
            </div>
          </div>
          <div className="flex gap-3 mb-2 leading-none">
            <span className="flex">
              <Image
                src={'/images/svg-images/user-2.png'}
                alt="user-icon"
                width={20}
                height={20}
                style={{
                  border: '1px solid #2D3748',
                  borderRadius: '100px',
                }}
              />
              <Image
                src={'/images/svg-images/user-1.png'}
                alt="user-icon"
                width={20}
                height={20}
                className="-mx-1 object-contain border border-gray-600"
                style={{
                  border: '1px solid #2D3748',
                  borderRadius: '100px',
                }}
              />
              <Image
                src={'/images/svg-images/user-3.png'}
                alt="user-icon"
                width={20}
                height={20}
                style={{
                  border: '1px solid #2D3748',
                  borderRadius: '100px',
                }}
              />
              <Image
                src={'/images/svg-images/user-4.png'}
                alt="user-icon"
                width={20}
                height={20}
                className="-mx-1 object-contain"
                style={{
                  border: '1px solid #2D3748',
                  borderRadius: '100px',
                }}
              />
            </span>
            <span className="text-brand-800 text-xs">
              Jaynti Kanani, Anurag Arjun, Sandeep Nailwal, Mihailo Bjelic
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 text-xs py-1 border border-gray300 rounded-[100px]">
              Crypto
            </div>
            <div className="px-3 text-xs py-1 border border-gray300 rounded-[100px]">
              BTC
            </div>
            <div className="px-3 text-xs py-1 border border-gray300 rounded-[100px]">
              NFTs
            </div>
            <div className="px-3 text-xs py-1 border border-gray300 rounded-[100px]">
              Blockchain
            </div>
            <div className="px-3 text-xs py-1 border border-gray300 rounded-[100px]">
              Ethereum
            </div>
            <div className="px-3 text-xs py-1 border border-gray300 rounded-[100px]">
              Finance
            </div>
          </div>
        </div>
        <div className="w-[140px] h-full">
          <div className="relative w-[140px] h-[117px]">
            <Image src={'/images/crypto-1.png'} alt="" fill />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
