import Image from 'next/image'
import React from 'react'
import {
  RiArrowRightUpLine,
  RiCalendar2Line,
  RiMapPinRangeLine,
} from 'react-icons/ri'

const EventCard = () => {
  return (
    <div className="flex gap-2 md:gap-6">
      <span className="rounded-full z-10 w-6 h-6 text-white bg-brand-500 dark:bg-brand-800 flex justify-center items-center">
        <RiArrowRightUpLine />
      </span>
      <div className="border border-gray200 dark:border-alpha-300 bg-white dark:bg-gray700 rounded-xl px-4 h-fit py-[14px] w-full flex flex-col-reverse md:flex-row gap-2 md:gap-9">
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
            <div className="flex text-[10px] md:text-xs my-2 divide-x items-center">
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
            <div className="flex">
              <div className="relative w-5 h-5 shrink-0 rounded-full border border-white dark:border-gray700">
                <Image
                  src={'/images/svg-images/user-2.png'}
                  alt="user-icon"
                  fill
                />
              </div>
              <div className="relative w-5 h-5 rounded-full -mx-1 border border-white dark:border-gray700">
                <Image
                  src={'/images/svg-images/user-1.png'}
                  alt="user-icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-5 h-5 rounded-full border border-white dark:border-gray700">
                <Image
                  src={'/images/svg-images/user-3.png'}
                  alt="user-icon"
                  fill
                />
              </div>
              <div className="relative w-5 h-5 rounded-full -mx-1 border border-white dark:border-gray700">
                <Image
                  src={'/images/svg-images/user-4.png'}
                  alt="user-icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-brand-800 text-[10px] md:text-xs">
              Jaynti Kanani, Anurag Arjun, Sandeep Nailwal, Mihailo Bjelic
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="px-2 md:px-3 text-[8px] md:text-xs py-1 border border-gray300 rounded-[100px]">
              Crypto
            </div>
            <div className="px-2 md:px-3 text-[8px] md:text-xs py-1 border border-gray300 rounded-[100px]">
              BTC
            </div>
            <div className="px-2 md:px-3 text-[8px] md:text-xs py-1 border border-gray300 rounded-[100px]">
              NFTs
            </div>
            <div className="px-2 md:px-3 text-[8px] md:text-xs py-1 border border-gray300 rounded-[100px]">
              Blockchain
            </div>
            <div className="px-2 md:px-3 text-[8px] md:text-xs py-1 border border-gray300 rounded-[100px]">
              Ethereum
            </div>
            <div className="px-2 md:px-3 text-[8px] md:text-xs py-1 border border-gray300 rounded-[100px]">
              Finance
            </div>
          </div>
        </div>
        <div className="w-full md:w-[140px] h-full">
          <div className="relative rounded-md w-full md:w-[140px] h-[153px] md:h-[117px]">
            <Image src={'/images/crypto-new.png'} alt="" fill />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
