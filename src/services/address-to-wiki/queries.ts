import { gql } from 'graphql-request'

export const GET_ADDRESS_TO_WIKI = gql`
  query addressToWiki($address: String!) {
    addressToWiki(address: $address) {
      wiki
    }
  }
`
