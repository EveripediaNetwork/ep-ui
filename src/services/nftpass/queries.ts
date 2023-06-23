import { gql } from 'graphql-request'

export const GET_SUBSCRIPTION_HISTORY = gql`
  query GET_SUBSCRIPTION_HISTORY($address: String!, $limit: Int, $offset: Int) {
    retrieveBrainPass(address: $address, limit: $limit, offset: $offset) {
      id
      tokenId
      passId
      owner
      transactionHash
      passName
      price
      created
      transactionType
    }
  }
`
