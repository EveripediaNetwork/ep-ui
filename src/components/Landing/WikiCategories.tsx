import { ArrowRightIcon } from 'lucide-react'
import { RiDatabaseFill } from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import { AllCategoriesData } from '@/data/AllCategoriesData'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import type { CategoryDataType } from '@/types/CategoryDataTypes'

const NUMBER_OF_ITEMS_TO_SHOW = 5

const shuffleArray = (array: CategoryDataType[]) => {
  const shuffledArray = array.slice()
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

export default function WikiCategories() {
  const { t } = useTranslation('category')

  const [randomCategories, setRandomCategories] = useState<CategoryDataType[]>(
    [],
  )

  useEffect(() => {
    if (AllCategoriesData && AllCategoriesData.length > 0) {
      const shuffledCategories = shuffleArray(AllCategoriesData)
      setRandomCategories(shuffledCategories.slice(0, NUMBER_OF_ITEMS_TO_SHOW))
    }
  }, [])

  return (
    <div className="bg-transparent backdrop-filter backdrop-blur-sm border dark:border-alpha-300 border-gray-200 rounded-xl h-full w-full">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-alpha-300 px-4 py-3">
        <div className="flex items-center gap-2">
          <RiDatabaseFill className="w-6 h-6 text-brand-800" />
          <div className="font-semibold">Wiki Categories</div>
        </div>
        <Link
          href="/categories"
          passHref
          className="flex items-center gap-2 border border-gray-200 dark:border-alpha-300 rounded-lg px-4 py-2 text-xs group dark:bg-gray800 h-9"
        >
          View all
          <ArrowRightIcon className="w-3 h-3 transition-transform group-hover:translate-x-1 duration-300 ease-in-out delay-150" />
        </Link>
      </div>
      <div className="flex flex-col">
        {randomCategories.map((category) => {
          return (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray100 dark:hover:bg-alpha-100 cursor-pointer px-4 py-3.5 transition-all duration-300 ease-in-out delay-200 last:border-b-0 last:rounded-b-xl flex flex-row gap-3 items-center"
            >
              <div className="w-[68px] h-[46px] aspect-square rounded-md">
                <Image
                  className="w-full h-full object-cover rounded-md"
                  src={category.cardImage}
                  alt={category.title}
                  width={450}
                  height={450}
                />
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <div className="text-sm font-semibold">{t(category.title)}</div>
                <h3 className="text-xs font-medium line-clamp-2">
                  {t(category.description)}
                </h3>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
