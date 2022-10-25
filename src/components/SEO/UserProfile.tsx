import config from '@/config'
import { UserSocialLinksData as dt } from '@/data/UserSocialLinksData'
import { ProfileLinks } from '@/types/ProfileType'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import React from 'react'

interface UserProfileHeaderProps {
  username: string
  avatarIPFS?: string | null
  links?: ProfileLinks
  bio?: string | null
}

export const UserProfileHeader = ({
  username,
  avatarIPFS,
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
        url={`${process.env.NEXT_PUBLIC_DOMAIN}/account/${username}`}
        sameAs={
          socials.map(key =>
            dt[key].urlPrefix((links && links[key]) || ''),
          ) as Array<string>
        }
      />
      <NextSeo
        title={`${username} · IQ.Wiki`}
        description={`Blockchain wikis created by ${username}`}
        openGraph={{
          title: `${username} · IQ.Wiki`,
          description: bio || 'check out this user on IQ.Wiki',
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
