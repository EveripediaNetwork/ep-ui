import { useENSData } from '@/hooks/useENSData'
import { getUsername } from '@/utils/DataTransform/getUsername'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'
import {
  WikiSummarySize,
  getWikiSummary,
} from '@/utils/WikiUtils/getWikiSummary'
import type { Wiki } from '@everipedia/iq-utils'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { useTranslatedTimestamps } from '@/hooks/useTranslatedTimestamps'
import type { RootState } from '@/store/store'
import { shortenText } from '@/utils/textUtils'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'

export const FeaturedWikiCard = ({ wiki }: { wiki: Wiki }) => {
  const [, ensName] = useENSData(wiki.user.id)
  const { t } = useTranslation('wiki')
  const lang = useSelector((state: RootState) => state?.app?.language)

  const getLatestEdited = () => {
    let lastEditedTime = null

    if (wiki.updated) {
      lastEditedTime = useTranslatedTimestamps(
        'Edited',
        lang,
        wiki.updated ?? '',
      )?.replace(/ ago/g, '')
    } else if (wiki.created) {
      lastEditedTime = useTranslatedTimestamps(
        'New',
        lang,
        wiki.created ?? '',
      )?.replace(/ ago/g, '')
    }
    return lastEditedTime
  }

  return (
    <section className="flex-col self-center text-left rounded-lg cursor-pointer border dark:border-alpha-300 border-gray-200 shadow-lg h-96 m-1">
      <div className="aspect-[4/5] w-full h-[250px] md:aspect-auto">
        <Image
          src={getWikiImageUrl(wiki.images)}
          alt={wiki.title}
          className="w-full h-full object-cover rounded-t-md"
          width={150}
          height={150}
        />
      </div>
      <div className="flex flex-col justify-between p-4 font-semibold gap-3">
        <Link href={`/wiki/${wiki?.id}`}>
          <h1 className="text-sm lg:text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {shortenText(wiki?.title, 30)}
          </h1>
        </Link>
        <h3 className="text-xs font-medium text-gray-600 dark:text-alpha-800">
          {wiki && getWikiSummary(wiki, WikiSummarySize.Small)}
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href={`/account/${wiki?.user?.id}`}>
              <DisplayAvatar
                alt={getUsername(wiki?.user, ensName)}
                size={20}
                address={wiki?.user.id}
                avatarIPFS={wiki?.user.profile?.avatar}
              />
            </Link>
            <Link
              className="text-brand-500 dark:text-brand-800 text-sm"
              href={`/account/${wiki?.user?.id}`}
            >
              {getUsername(wiki?.user, ensName)}
            </Link>
          </div>
          <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-gray400 dark:text-alpha-600 text-xs text-right">
            {t('Last')} {getLatestEdited()}
          </h2>
        </div>
      </div>
    </section>
  )
}
