import { gql } from 'graphql-request'

export const FETCH_PUBLICATION_INFO = gql`
  query PublicationInfo($publicationAddress: String!) {
    projectFeed(projectAddress: $publicationAddress) {
      displayName
      avatarURL
      domain
      headerImage {
        url
      }
      theme {
        colorMode
        accent
      }
      description
      mailingListURL
      members {
        address
        displayName
        avatarURL
      }
    }
  }
`

export const FETCH_TRANSACTIONS = gql`
  query FetchTransactions($addresses: [String!]!) {
    transactions(
      first: 100
      tags: [
        { name: "App-Name", values: ["MirrorXYZ"] }
        { name: "Contributor", values: $addresses }
      ]
    ) {
      edges {
        node {
          id
          block {
            timestamp
          }
          tags {
            name
            value
          }
        }
      }
    }
  }
`

export const FETCH_SINGLE_TRANSACTION = gql`
  query FetchTransaction($digest: String!) {
    transactions(
      tags: [
        { name: "Original-Content-Digest", values: [$digest] }
        { name: "App-Name", values: "MirrorXYZ" }
      ]
    ) {
      edges {
        node {
          id
          block {
            timestamp
          }
        }
      }
    }
  }
`
