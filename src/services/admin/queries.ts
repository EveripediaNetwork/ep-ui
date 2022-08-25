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

export const SEARCHED_EDITORS = gql`
  query Editors($username: String) {
    getProfileLikeUsername(username: $username) {
      id
    }
  }
`

export const CREATED_WIKIS_TABLE = gql`
  query Wikis($offset: Int!) {
    wikis(limit: 10, offset: $offset) {
      id
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
export const EDITORS_COUNT = gql`
  query EditorCount($startDate: Int, $endDate: Int, $interval: String) {
    editorCount(startDate: $startDate, endDate: $endDate, interval: $interval) {
      amount
    }
  }
`
export const HIDE_WIKI = gql`
  mutation HideWiki($Id: String!) {
    hideWiki(id: $Id) {
      id
      ipfs
      transactionHash
      created
      updated
      title
      summary
      content
      categories {
        id
        title
      }
      tags {
        id
      }
      images {
        id
        type
      }
      media {
        name
        id
        size
        source
      }
      metadata {
        id
        value
      }
      user {
        id
        profile {
          username
          avatar
        }
      }
      author {
        id
        profile {
          username
          avatar
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
