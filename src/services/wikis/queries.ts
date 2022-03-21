import { gql } from 'graphql-request'

export const GET_WIKI_BY_ID = gql`
  query GetWiki($id: String!) {
    wiki(id: $id) {
      id
      content {
        createdAt
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
  }
`

export const GET_WIKIS = gql`
  query GetWikis {
    wikis {
      id
      content {
        createdAt
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
  }
`

export const GET_USER_WIKIS_BY_ID = gql`
  query GetUserWikis($id: String!) {
    user(id: $id) {
      contents(first: 10, orderBy: createdAt, orderDirection: desc) {
        createdAt
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
  }
`

export const GET_WIKIS_BY_CATEGORY = gql`
  query wikisByCategory($category: String!) {
    wikisByCategory(category: $category) {
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
      updated
    }
  }
`
