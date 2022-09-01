import { gql } from 'graphql-request'

export const GET_TAGS = gql`
  query GetTags($startDate: Int!, $endDate: Int!) {
    tagsPopular(startDate: $startDate, endDate: $endDate) {
      id
    }
  }
`
