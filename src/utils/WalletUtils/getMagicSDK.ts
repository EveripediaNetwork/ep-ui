import { env } from '@/env.mjs'
import { OAuthExtension } from '@magic-ext/oauth'
import { Magic } from 'magic-sdk'

export const getMagicSDK = () => {
  return typeof window === 'undefined'
    ? null
    : new Magic(env.NEXT_PUBLIC_MAGIC_LINK_API_KEY, {
        extensions: [new OAuthExtension()],
      })
}
