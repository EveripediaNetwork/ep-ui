import { gql } from 'graphql-request'

export const GET_PREVIEW_WIKI_BY_ID = gql`
  query GetPreviewWikiById($id: String!) {
    wiki(id: $id) {
      id
      title
      content
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
      ipfs
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
  query GetUserWikis($id: String!, $limit: Int, $offset: Int) {
    userById(id: $id) {
      wikis(offset: $offset, limit: $limit) {
        id
        ipfs
        title
        summary
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
  query GetUserWikisByCategory($category: String!, $offset: Int, $limit: Int) {
    wikisByCategory(category: $category, offset: $offset, limit: $limit) {
      id
      ipfs
      created
      title
      summary
      content
      updated
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

export const GET_TAG_WIKIS_BY_ID = gql`
  query GetTagWikis($id: String!) {
    tagById(id: $id) {
      wikis {
        id
        ipfs
        content
        created
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
        metadata {
          id
        }
        user {
          id
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

export const POST_IMG =
  '{"query": "mutation pinImage($file: Upload!) { pinImage(fileUpload: $file){IpfsHash}} ", "variables": {"file": null}}'
