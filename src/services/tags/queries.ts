import { gql } from 'graphql-request'

export const GET_TAGS = gql`
  query GetTags($limit: Int!) {
    tags(limit: $limit) {
      id
    }
  }
`
