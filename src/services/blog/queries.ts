import { gql } from 'graphql-request'

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
        { name: "Content-Digest", values: [$digest] }
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

export const FETCH_BLOG = gql`
  query EntryWritingNFT($digest: String!) {
    entry(digest: $digest) {
      ...entryDetails
    }
  }

  fragment entryDetails on entry {
    _id
    body
    digest
    timestamp
    title
    arweaveTransactionRequest {
      transactionId
    }
    publisher {
      ...publisherDetails
    }
  }

  fragment publisherDetails on PublisherType {
    project {
      ...projectDetails
    }
  }

  fragment projectDetails on ProjectType {
    _id
    address
  }
`

export const FETCH_BLOGS = gql`
  query Entries($projectAddress: String!) {
    entries(projectAddress: $projectAddress) {
      ...entryDetails
    }
  }

  fragment entryDetails on entry {
    _id
    body
    digest
    timestamp
    title
    arweaveTransactionRequest {
      transactionId
    }
    publisher {
      ...publisherDetails
    }
  }

  fragment publisherDetails on PublisherType {
    project {
      ...projectDetails
    }
  }

  fragment projectDetails on ProjectType {
    _id
    address
  }
`
