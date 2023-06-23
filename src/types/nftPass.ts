export type NftPassType = {
  id: string
  tokenId: string
  passId: string
  owner: string
  transactionHash: string
  passName: string
  price: number
  created: string
  transactionType: string
}

export type PassParamsType = {
  address: `0x${string}` | undefined
  limit: number
  offset: number
}
