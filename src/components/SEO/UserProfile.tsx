import config from '@/config'
import { UserSocialLinksData as dt } from '@/data/UserSocialLinksData'
import { ProfileLinks } from '@/types/ProfileType'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import React from 'react'

interface UserProfileHeaderProps {
  username: string
  bio?: string | null
  avatarIPFS?: string | null
  links?: ProfileLinks
}

export const UserProfileHeader = ({
  username,
  bio,
  avatarIPFS,
  links,
}: UserProfileHeaderProps) => {
  let socials = [] as Array<keyof ProfileLinks>

  if (links) socials = Object.keys(links) as Array<keyof ProfileLinks>
  return (
    <>
      <SocialProfileJsonLd
        type="Person"
        name={username}
        url={`${process.env.NEXT_PUBLIC_DOMAIN}/account/${username}`}
        sameAs={
          socials.map(key =>
            dt[key].urlPrefix((links && links[key]) || ''),
          ) as Array<string>
        }
      />
      <NextSeo
        openGraph={{
          title: `${username} · Everipedia`,
          description: bio || 'check out this user on Everipedia',
          url: `${process.env.NEXT_PUBLIC_DOMAIN}/account/${username}`,
          type: 'profile',
          profile: {
            username,
          },
          images: [
            {
              url: `${config.pinataBaseUrl}${avatarIPFS}`,
              width: 650,
              height: 650,
              alt: 'Profile Photo',
            },
          ],
        }}
      />
    </>
  )
}
