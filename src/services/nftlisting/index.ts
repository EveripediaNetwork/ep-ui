import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export type NFTStats = {
  media: {
    bytes: number
    format: 'png'
    gateway: string
    raw: string
    thumbnail: string
  }[]
  error: string
}

export const nftLisitngAPI = createApi({
  reducerPath: 'nftLisitngAPI',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
    return null
  },
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/`,
  }),
  endpoints: builder => ({
    nftListing: builder.query<
      NFTStats,
      { nftContractID: string; nftHash: number }
    >({
      query: ({ nftContractID, nftHash }) =>
        `getNFTMetadata?contractAddress=${nftContractID}&tokenId=${nftHash}`,
    }),
  }),
})

export const { useNftListingQuery } = nftLisitngAPI

export const { nftListing } = nftLisitngAPI.endpoints
