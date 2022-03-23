import { gql } from 'graphql-request'

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      title
      description
      cardImage
      heroImage
      icon
    }
  }
`

export const GET_CATEGORIES_BY_ID = gql`
  query categoryById($id: String!) {
    categoryById(id: $id) {
      title
      description
      cardImage
      heroImage
      icon
    }
  }
`
export const GET_CATEGORIES_LINKS = gql`
  query GetTopCategoriesLinks {
    categories {
      id
      title
      icon
    }
  }
`
