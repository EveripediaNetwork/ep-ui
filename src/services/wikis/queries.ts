import { gql } from 'graphql-request'

export const GET_WIKI_BY_ID = gql`
  query GetWiki($id: String!) {
    wiki(id: $id) {
      id
      ipfs
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
      ipfs
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
    promotedWikis {
      id
      ipfs
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
        ipfs
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
      ipfs
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

export const POST_WIKI = gql`
  mutation postWiki($data: String!) {
    pinJSON(data: $data) {
      IpfsHash
    }
  }
`

export const POST_IMG = gql`
  mutation postImage($file: Upload!) {
    pinImage(fileUpload: $file) {
      IpfsHash
    }
  }
`
