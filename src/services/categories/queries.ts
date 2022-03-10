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
  query categories($id: String!) {
    categories(id: $id) {
      id
      title
      description
      cardImage
      heroImage
      icon
    }
  }
`
export const GET_TOP_CATEGORIES_LINKS = gql`
  query GetTopCategoriesLinks {
    categories {
      id
      title
      icon
    }
  }
`
