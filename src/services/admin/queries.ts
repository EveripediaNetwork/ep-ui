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
export const PROMOTED_WIKIS_TABLE = gql`
  query PromotedWikis($offset: Int!) {
    promotedWikis(limit: 10, offset: $offset) {
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
export const HIDDEN_WIKIS_TABLE = gql`
  query HiddenWikis($offset: Int!) {
    wikisHidden(limit: 10, offset: $offset) {
      id
      title
      images {
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
      active
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

export const HIDDEN_EDITORS_TABLE = gql`
  query HiddenEditors($limit: Int!, $offset: Int!) {
    usersHidden(limit: $limit, offset: $offset) {
      id
      active
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

export const SEARCHED_EDITORS = gql`
  query Editors($id: String!) {
    usersById(id: $id) {
      id
      active
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
  query EditorCount($startDate: Int, $endDate: Int) {
    editorCount(startDate: $startDate, endDate: $endDate) {
      amount
    }
  }
`
export const HIDE_WIKI = gql`
  mutation HideWiki($id: String!) {
    hideWiki(id: $id) {
      id
      ipfs
    }
  }
`

export const UNHIDE_WIKI = gql`
  mutation UnHideWiki($id: String!) {
    unhideWiki(id: $id) {
      id
      ipfs
    }
  }
`
export const POST_PROMOTED_WIKI = gql`
  mutation postPromotedWiki($id: String!, $level: Int) {
    promoteWiki(id: $id, level: $level) {
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
 `

export const TOGGLE_USER = gql`
  mutation ToggleUser($id: String!, $active: Boolean) {
    toggleUserStateById(id: $id, active: $active) {
      id
    }
  }
`
