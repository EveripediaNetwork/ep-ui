import { UserSocialLinksData as dt } from '@/data/UserSocialLinksData'
import { env } from '@/env.mjs'
import { ProfileLinks } from '@/types/ProfileType'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import React from 'react'

interface UserProfileHeaderProps {
  username: string
  avatarURL: string
  links?: ProfileLinks
  bio?: string | null
}

export const UserProfileHeader = ({
  username,
  avatarURL,
  links,
  bio,
}: UserProfileHeaderProps) => {
  let socials = [] as Array<keyof ProfileLinks>

  if (links) socials = Object.keys(links) as Array<keyof ProfileLinks>
  return (
    <>
      <SocialProfileJsonLd
        type="Person"
        name={username}
        url={`${env.NEXT_PUBLIC_DOMAIN}/account/${username}`}
        sameAs={
          socials.map((key) =>
            dt[key].urlPrefix(links?.[key] || ''),
          ) as string[]
        }
      />
      <NextSeo
        title={`${username} · IQ.wiki`}
        description={`Blockchain wikis created by ${username}`}
        openGraph={{
          title: `${username} · IQ.wiki`,
          description: bio || 'check out this user on IQ.wiki',
          url: `${env.NEXT_PUBLIC_DOMAIN}/account/${username}`,
          type: 'profile',
          profile: {
            username,
          },
          images: [
            {
              url: avatarURL,
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
