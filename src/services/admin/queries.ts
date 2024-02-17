import { gql } from 'graphql-request'

export const GET_PAGE_COUNT = gql`
  query PageViewCount($startDate: Int) {
    pageViewsCount(startDate: $startDate) {
      amount
    }
  }
`

export const WIKIS_EDITED = gql`
  query WikisEdited($startDate: Int, $endDate: Int, $interval: String) {
    wikisEdited(startDate: $startDate, endDate: $endDate, interval: $interval) {
      amount
      startOn
      endOn
    }
  }
`

export const WIKIS_VIEWS = gql`
  query WikiViews($offset: Int!) {
    wikiViews(limit: 50, offset: $offset) {
      day
      visits
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

export const WIKIS_PER_VISIT = gql`
  query WikisPerVisits(
    $amount: Int!
    $startDay: String
    $endDay: String
    $interval: IntervalByDays
    $category: String
  ) {
    wikisPerVisits(
      amount: $amount
      interval: $interval
      startDay: $startDay
      endDay: $endDay
      category: $category
    ) {
      id
      title
      views
      visits(interval: $interval)
      categories {
        id
      }
      tags {
        id
      }
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
    users(limit: $limit, offset: $offset, edits: true) {
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
  query HiddenEditors($offset: Int!) {
    usersHidden(limit: 10, offset: $offset) {
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
  query Editors($username: String) {
    getProfileLikeUsername(username: $username) {
      id
      active
      username
      avatar
      bio
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
  query EditorCount($startDate: Int) {
    editorCount(startDate: $startDate) {
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

export const REVALIDATE_URL = gql`
  mutation RevalidateURL($route: String!) {
    revalidatePage(route: $route)
  }
`

export const CONTENT_FEEDBACK = gql`
  mutation contentFeedback(
    $contentId: String!
    $rating: Int!
  ) {
    contentFeedback(
      site: IQWIKI
      contentId: $contentId
      rating: $rating
    )
  }
`
export const AVERAGE_RATING = gql`
query averageRating($contendId: String!) {
  averageRating(contendId: $contendId) {  
    contentId
    average
    votes
  }
}
`

export const CHECK_ADMIN = gql`
  query isAdmin {
    isAdmin
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
  mutation PromotedWiki($id: String!, $level: Int) {
    promoteWiki(id: $id, level: $level) {
      id
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
