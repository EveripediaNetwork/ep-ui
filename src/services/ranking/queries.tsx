import { gql } from 'graphql-request'

export const GET_NFT_RANKINGS = gql`
  query getNFTRanking($kind: RankType, $limit: Int, $offset: Int) {
    rankList(kind: $kind, limit: $limit, offset: $offset) {
      ... on NftRankListData {
        id
        title
        ipfs
        media {
          thumbnail
        }
        images {
          id
        }
        nftMarketData {
          floor_price_eth
          floor_price_usd
          market_cap_usd
          floor_price_in_usd_24h_percentage_change
          alias
          image
        }
      }
    }
  }
`

export const GET_TOKEN_RANKINGS = gql`
  query getNFTRanking($kind: RankType, $limit: Int, $offset: Int) {
    rankList(kind: $kind, limit: $limit, offset: $offset) {
      ... on TokenRankListData {
        id
        title
        ipfs
        media {
          thumbnail
        }
        images {
          id
        }
        tokenMarketData {
          image
          name
          alias
          current_price
          market_cap
          market_cap_rank
          price_change_24h
          market_cap_change_24h
        }
      }
    }
  }
`
