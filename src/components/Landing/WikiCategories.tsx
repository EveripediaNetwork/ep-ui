import { ArrowRightIcon } from 'lucide-react'
import { RiDatabaseFill } from 'react-icons/ri'
import React from 'react'
import { AllCategoriesData } from '@/data/AllCategoriesData'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

export default function WikiCategories() {
  const { t } = useTranslation('category')

  return (
    <div className="bg-transparent backdrop-filter backdrop-blur-sm border dark:border-gray-700 border-gray-200 rounded-xl h-full w-full">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-2">
          <RiDatabaseFill className="w-6 h-6 text-brand-800" />
          <div className="font-semibold">Wiki Categories</div>
        </div>
        <Link
          href="/categories"
          passHref
          className="flex items-center gap-2 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-2 text-xs group dark:bg-gray800 h-9"
        >
          View all
          <ArrowRightIcon className="w-3 h-3 transition-transform group-hover:translate-x-1 duration-300 ease-in-out delay-150" />
        </Link>
      </div>
      <div className="flex flex-col">
        {AllCategoriesData.slice(0, 5).map((category) => {
          return (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray100 dark:hover:bg-alpha-100 cursor-pointer px-4 py-3.5 transition-all duration-300 ease-in-out delay-200 last:border-b-0 last:rounded-b-xl flex flex-row gap-3 items-center"
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

              <div className="flex-1 flex flex-col">
                <div className="text-lg font-semibold">{t(category.title)}</div>
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
