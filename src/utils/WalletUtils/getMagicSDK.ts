import { env } from '@/env.mjs'
import { Magic } from 'magic-sdk'

const createMagic = () => {
  return (
    typeof window !== 'undefined' &&
    (new Magic(env.NEXT_PUBLIC_MAGIC_LINK_API_KEY) as Magic)
  )
}

export const magic = createMagic()
