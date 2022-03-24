import { gql } from 'graphql-request'

export const GET_WIKI_BY_ID = gql`
  query GetWiki($id: String!) {
    wiki(id: $id) {
      id
      created
      title
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
      metadata {
        id
        value
      }
      user {
        id
      }
    }
  }
`

export const GET_WIKIS = gql`
  query GetWikis {
    wikis {
      id
      content
      created
      title
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
      metadata {
        id
      }
      user {
        id
      }
    }
  }
`

export const GET_PROMOTED_WIKIS = gql`
  query GetPromotedWikis {
    wikis {
      id
      content
      created
      title
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
      metadata {
        id
      }
      user {
        id
      }
    }
  }
`

export const GET_USER_WIKIS_BY_ID = gql`
  query GetUserWikis($id: String!) {
    userById(id: $id) {
      wikis {
        id
        title
        created
        updated
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
        metadata {
          id
          value
        }
        user {
          id
        }
      }
    }
  }
`

export const GET_WIKIS_BY_CATEGORY = gql`
  query GetUserWikisByCategory($category: String!) {
    wikisByCategory(category: $category) {
      id
      content
      created
      title
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
      metadata {
        id
      }
      user {
        id
      }
    }
  }
`

