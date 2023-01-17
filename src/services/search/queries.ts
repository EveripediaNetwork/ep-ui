import { gql } from 'graphql-request'

export const GET_WIKIS_BY_TITLE = gql`
  query wikisByTitle($title: String!) {
    wikisByTitle(title: $title) {
      id
      title
      content
      summary
      updated
      created
      tags {
        id
      }
      images {
        id
      }
      linkedWikis {
        founders
        blockchains
      }
      metadata {
        id
        value
      }
      categories {
        id
        title
      }
      user {
        id
      }
      promoted
      author {
        id
        profile {
          username
        }
      }
    }
  }
`

export const GET_CATEGORIES_BY_TITLE = gql`
  query categoryByTitle($title: String!) {
    categoryByTitle(title: $title) {
      id
      title
      cardImage
      heroImage
      icon
    }
  }
`

export const GET_USERNAME_BY_TITLE = gql`
  query getProfileLikeUsername($id: String, $username: String) {
    getProfileLikeUsername(id: $id, username: $username) {
      id
      username
      bio
      avatar
    }
  }
`
