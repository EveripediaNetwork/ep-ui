import { shortenText } from '@/utils/textUtils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DisplayAvatar from '../Elements/Avatar/DisplayAvatar'
import { getWikiImageUrl } from '@/utils/WikiUtils/getWikiImageUrl'

type CategoriesCardProps = {
  wiki: {
    id: string
    title: string
    summary: string
    user: {
      id: string
      profile: {
        avatar: string
        username: string
        id: string
      }
    }
    images: {
      id: string
      type: string
    }[]
  }
}

export default function CategoriesCard({ wiki }: CategoriesCardProps) {
  return (
    <Link
      href={`/wiki/${wiki.id}`}
      className="flex flex-col gap-2 border dark:border-gray-700 border-gray-200 rounded-xl pb-2"
    >
      <div className="h-80">
        <Image
          src={getWikiImageUrl(wiki.images)}
          alt={wiki.title}
          width={450}
          height={450}
          className="rounded-t-lg w-full h-full"
        />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold">{wiki.title}</h1>
        <p className="text-alpha-800 text-sm">
          {shortenText(wiki.summary, 80)}
        </p>

        <div className="flex flex-row justify-between mt-6">
          <div className="flex flex-row gap-2 items-center">
            <DisplayAvatar
              address={wiki.user?.id}
              avatarIPFS={wiki.user.profile?.avatar}
              alt={wiki.user.profile?.username}
            />
            <span className="text-brand-500 dark:text-brand-800 text-sm">
              {wiki.user?.profile?.username}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
