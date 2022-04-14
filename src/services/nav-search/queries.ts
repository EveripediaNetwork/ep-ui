import { gql } from 'graphql-request'

export const GET_WIKIS_BY_TITLE = gql`
  query wikisByTitle($title: String!) {
    wikisByTitle(title: $title) {
      id
      title
      content
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
