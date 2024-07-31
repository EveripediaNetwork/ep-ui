import { gql } from 'graphql-request'

export const GET_PREVIEW_WIKI_BY_ID = gql`
  query GetPreviewWikiById($id: String!) {
    wiki(id: $id) {
      id
      title
      summary
      tags {
        id
      }
      images {
        id
      }
    }
  }
`

export const GET_WIKI_BY_ID = gql`
  query GetWiki($id: String!) {
    wiki(id: $id) {
      id
      hidden
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
        type
        source
      }
      linkedWikis {
        founders
        blockchains
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
      events {
        title
        description
        type
        date
        link
        multiDateStart
        multiDateEnd
      }
      views
    }
  }
`

export const GET_WIKI_CREATOR_AND_EDITOR = gql`
  query GetWiki($id: String!) {
    wiki(id: $id) {
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

export const GET_WIKIS = gql`
  query GetWikis {
    wikis {
      id
      title
      summary
      images {
        id
        type
      }
      user {
        id
        profile {
          username
          avatar
        }
      }
    }
  }
`

export const GET_PROMOTED_WIKIS = gql`
  query GetPromotedWikis {
    promotedWikis {
      id
      updated
      title
      summary
      promoted
      images {
        id
        type
      }
      user {
        id
        profile {
          username
          avatar
        }
      }
    }
  }
`

export const GET_USER_CREATED_WIKIS_BY_ID = gql`
  query GetUserWikis($id: String!, $limit: Int, $offset: Int) {
    userById(id: $id) {
      wikisCreated(offset: $offset, limit: $limit) {
        datetime
        content {
          id
          ipfs
          title
          created
          updated
          summary
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
        }
      }
    }
  }
`

export const GET_USER_EDITED_WIKIS_BY_ID = gql`
  query GetUserWikis($id: String!, $limit: Int, $offset: Int) {
    userById(id: $id) {
      wikisEdited(offset: $offset, limit: $limit) {
        datetime
        content {
          id
          ipfs
          title
          created
          updated
          summary
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
        }
      }
    }
  }
`

export const GET_WIKIS_BY_CATEGORY = gql`
  query GetUserWikisByCategory($category: String!, $offset: Int, $limit: Int) {
    wikisByCategory(category: $category, offset: $offset, limit: $limit) {
      id
      ipfs
      created
      title
      summary
      updated
      categories {
        id
        title
      }
      images {
        id
        type
      }
      user {
        id
        profile {
          username
          avatar
        }
      }
    }
  }
`
export const GET_WIKI_PREVIEWS_BY_CATEGORY = gql`
  query GetWikiPreviewsByCategory(
    $category: String!
    $offset: Int
    $limit: Int
  ) {
    wikisByCategory(category: $category, offset: $offset, limit: $limit) {
      id
      title
      summary
      images {
        id
        type
      }
    }
  }
`
export const GET_TAG_WIKIS_BY_ID = gql`
  query GetTagWikis($id: String!, $limit: Int, $offset: Int) {
    tagById(id: $id) {
      wikis(offset: $offset, limit: $limit) {
        id
        ipfs
        created
        updated
        title
        summary
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
        metadata {
          id
        }
        user {
          id
          profile {
            username
            avatar
          }
        }
      }
    }
  }
`

export const GET_WIKI_SLUG_VALID = gql`
  query GetWikiSlugValid($slug: String!) {
    validWikiSlug(id: $slug) {
      ... on Slug {
        id
      }
      ... on Valid {
        valid
      }
    }
  }
`

export const GET_TRENDING_WIKIS = gql`
  query GetTrendingWikis($amount: Int!, $startDay: String!, $endDay: String!) {
    wikisPerVisits(amount: $amount, startDay: $startDay, endDay: $endDay) {
      id
      title
      summary
      images {
        id
      }
    }
  }
`

export const GET_TRENDING_CATEGORY_WIKIS = gql`
  query GetTrendingWikis(
    $amount: Int!
    $startDay: String!
    $endDay: String!
    $category: String
  ) {
    wikisPerVisits(
      amount: $amount
      startDay: $startDay
      endDay: $endDay
      category: $category
    ) {
      id
      title
      summary
      updated
      images {
        id
      }
      user {
        id
        profile {
          username
          avatar
        }
      }
    }
  }
`

export const GET_WIKI_ACTIVITY_BY_CATEGORIES = gql`
  query GetWikiActivityByCategory(
    $offset: Int!
    $limit: Int!
    $type: ActivityType
    $category: String!
  ) {
    activitiesByCategory(
      offset: $offset
      limit: $limit
      type: $type
      category: $category
    ) {
      content {
        id
        title
        summary
        updated
        images {
          id
        }
        user {
          id
          profile {
            username
            avatar
          }
        }
      }
    }
  }
`
export const GET_WIKIS_AND_CATEGORIES = gql`
  query GetWikisAndCategories($limit: Int, $offset: Int) {
    wikis(limit: $limit, offset: $offset) {
      categories {
        title
        id
        wikis {
          id
          title
          summary
          user {
            id
            profile {
              avatar
              username
              id
            }
          }
          images {
            id
            type
          }
        }
      }
    }
  }
`
export const POST_WIKI = gql`
  mutation postWiki($data: String!) {
    pinJSON(data: $data) {
      IpfsHash
    }
  }
`

export const POST_WIKI_VIEW_COUNT = gql`
  mutation wikiViewCount($id: String!) {
    wikiViewCount(id: $id)
  }
`

export const POST_IMG =
  '{"query": "mutation pinImage($file: Upload!) { pinImage(fileUpload: $file){IpfsHash}} ", "variables": {"file": null}}'
