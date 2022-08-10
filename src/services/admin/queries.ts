import { gql } from 'graphql-request'

export const WIKIS_EDITED = gql`
  query WikisEdited($startDate: Int, $endDate: Int, $interval: String) {
    wikisEdited(startDate: $startDate, endDate: $endDate, interval: $interval) {
      amount
      startOn
      endOn
    }
  }
`

export const WIKIS_CREATED = gql`
  query WikisCreated($startDate: Int, $endDate: Int, $interval: String) {
    wikisCreated(
      startDate: $startDate
      endDate: $endDate
      interval: $interval
    ) {
      amount
      startOn
      endOn
    }
  }
`

export const CREATED_WIKIS_TABLE = gql`
  query Wikis($offset: Int!) {
    wikis(offset: $offset) {
      title
      images {
        id
        type
      }
      author {
        id
        profile {
          username
        }
      }
      created
      tags {
        id
      }
      promoted
      hidden
    }
  }
`

export const EDITORS_TABLE = gql`
  query Editors($limit: Int!, $offset: Int!) {
    users(limit: $limit, offset: $offset) {
      id
      profile {
        username
        avatar
      }
      wikisEdited {
        id
        wikiId
        datetime
        ipfs
        content {
          title
          images {
            id
          }
        }
      }
      wikisCreated {
        id
        wikiId
        datetime
        ipfs
        content {
          title
          images {
            id
          }
        }
      }
    }
  }
`

// query {
//   users(limit: 10) {
//     id
//     profile {
//       username
//     }
//     wikis {id}
//     wikisEdited {
//       id
//       wikiId
//       datetime
//     }
//     wikisCreated {
//       id
//       datetime
//     }
//   }
// }
