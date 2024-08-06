import type { TrendingData } from '@/types/Home'
import { shortenText } from '@/utils/textUtils'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import { Icon } from '@chakra-ui/react'
import type { Wiki } from '@everipedia/iq-utils'
import React from 'react'
import type { IconType } from 'react-icons/lib'
import { TrendingSkeleton } from './LoadingFeaturedWikiCard'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const TrendingCard = ({
  wikis = [],
  title,
  icon,
  isTrending,
}: {
  wikis?: Wiki[] | TrendingData
  title: string
  icon: IconType
  isTrending?: boolean
}) => {
  const [wikiData, setWikiData] = React.useState<Wiki[] | undefined>(
    isTrending ? (wikis as TrendingData).todayTrending : (wikis as Wiki[]),
  )
  const { t } = useTranslation('home')

  return (
    <div className="bg-transparent backdrop-filter backdrop-blur-sm border dark:border-alpha-300 border-gray-200 rounded-xl h-full w-full">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-alpha-300 px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon
            cursor="pointer"
            fontSize="2xl"
            fontWeight={600}
            color="brandLinkColor"
            as={icon}
          />
          <div className="font-semibold">{title}</div>
        </div>
        <Select
          onValueChange={(e) => {
            setWikiData((wikis as TrendingData)[e as keyof TrendingData])
          }}
        >
          <SelectTrigger className="w-36 h-9 border border-gray-200 dark:border-gray-300">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todayTrending">{t('Today')}</SelectItem>
            <SelectItem value="weekTrending">{t('Last Week')}</SelectItem>
            <SelectItem value="monthTrending">{t('Last Month')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {wikis ? (
        <div className="flex flex-col">
          {wikiData?.map((wiki) => (
            <Link
              href={`/wiki/${wiki.id}`}
              className="border-b dark:border-gray-300 border-gray-200 hover:bg-gray100 dark:hover:bg-alpha-100 cursor-pointer px-4 py-3.5 transition-all duration-300 ease-in-out delay-200 last:border-b-0 last:rounded-b-xl flex flex-row gap-3 items-center"
              key={wiki.id}
            >
              <div className="w-[68px] h-[46px] aspect-square rounded-md">
                <Image
                  className="w-full h-full object-cover rounded-md"
                  src={getWikiImageUrl(wiki.images)}
                  alt={wiki.title}
                  width={450}
                  height={450}
                />
              </div>

              <div className="flex-1 flex flex-col gap-1.5">
                <h1 className="text-sm font-semibold">
                  {shortenText(wiki.title, 24)}
                </h1>
                <h3 className="text-xs font-medium line-clamp-2">
                  {wiki.summary}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <TrendingSkeleton />
      )}
    </div>
  )
}
export default TrendingCard
