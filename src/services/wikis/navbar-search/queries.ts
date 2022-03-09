import { gql } from 'graphql-request'

export const GET_ARTICLES_BY_ID = gql`
  query articles($id: String!) {
    articles(id: $id) {
      id
      title
      description
    }
  }
`
