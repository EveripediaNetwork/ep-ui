import { gql } from 'graphql-request'

export const GET_SUBSCRIPTION_HISTORY = gql`
  query GET_SUBSCRIPTION_HISTORY($address: String!) {
    retrieveBrainPass(address: $address) {
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
