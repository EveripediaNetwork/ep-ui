import { gql } from 'graphql-request'

export const GET_WIKIS_BY_TITLE = gql`
  query wikisByTitle($title: String!) {
    wikisByTitle(title: $title) {
      id
      title
      content
      summary
      created
      updated
      tags {
        id
      }
      images {
        id
      }
      categories {
        id
        title
      }
      user {
        id
      }
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
