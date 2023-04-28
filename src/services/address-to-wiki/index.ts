import { request } from 'graphql-request'
import { GET_ADDRESS_TO_WIKI } from './queries'
import { env } from '@/env.mjs'

const link = env.NEXT_PUBLIC_EP_API || ''

export const addressToWiki = async (arg: string) =>
  request(link, GET_ADDRESS_TO_WIKI, { address: arg })
