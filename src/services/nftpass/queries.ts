import { gql } from 'graphql-request'

export const GET_SUBSCRIPTION_HISTORY = gql`
  query GET_SUBSCRIPTION_HISTORY($address: String!) {
    subscriptionHistory(address: $address) {
      address
      name
      date
      price
      hash
    }
  }
`
