import { gql } from 'graphql-request'

export const GET_TOKEN_STATS = gql`
  query tokenStats($tokenName: String!, $cmcTokenName: String) {
    tokenStats(tokenName: $tokenName, cmcTokenName: $cmcTokenName) {
      id
      symbol
      name
      market_cap
      market_cap_percentage_change
      diluted_market_cap
      diluted_market_cap_percentage_change
      token_price_in_usd
      volume
      volume_percentage_change
    }
  }
`
