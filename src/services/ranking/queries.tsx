import { gql } from 'graphql-request'

export const GET_NFT_RANKINGS = gql`
  query getNFTRanking($kind: RankType, $limit: Int, $offset: Int) {
    rankList(kind: $kind, limit: $limit, offset: $offset) {
      ... on NftRankListData {
        id
        title
        ipfs
        created
        media {
          thumbnail
        }
        images {
          id
        }
        linkedWikis {
          founders
          blockchains
        }
        events {
          date
          type
        }
        nftMarketData {
          hasWiki
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
  query getTokenRanking($kind: RankType, $limit: Int, $offset: Int) {
    rankList(kind: $kind, limit: $limit, offset: $offset) {
      ... on TokenRankListData {
        id
        title
        ipfs
        tags {
          id
        }
        created
        media {
          thumbnail
        }
        images {
          id
        }
        linkedWikis {
          founders
          blockchains
        }
        events {
          date
          type
        }
        tokenMarketData {
          hasWiki
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
export const GET_AI_TOKEN_RANKINGS = gql`
  query getTokenRanking($kind: RankType, $limit: Int, $offset: Int, $category: TokenCategory ) {
    rankList(kind: $kind, limit: $limit, offset: $offset, category: $category) {
      ... on TokenRankListData {
        id
        title
        ipfs
        tags {
          id
        }
        created
        media {
          thumbnail
        }
        images {
          id
        }
        linkedWikis {
          founders
          blockchains
        }
        events {
          date
          type
        }
        tokenMarketData {
          hasWiki
          image
          name
          alias
          current_price
          market_cap
          market_cap_rank
          price_change_24h
          market_cap_change_24h
        }-
      }
    }
  }
`
export const GET_STABLECOIN_RANKINGS = gql`
  query getTokenRanking($kind: RankType, $limit: Int, $offset: Int, $category: TokenCategory ) {
    rankList(kind: $kind, limit: $limit, offset: $offset, category: $category) {
      ... on TokenRankListData {
        id
        title
        ipfs
        tags {
          id
        }
        created
        media {
          thumbnail
        }
        images {
          id
        }
        linkedWikis {
          founders
          blockchains
        }
        events {
          date
          type
        }
        tokenMarketData {
          hasWiki
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

export const GET_RANK_COUNT = gql`
  query getRankingTotal($category: String!) {
    categoryTotal(category: $category) {
      amount
    }
  }
`
