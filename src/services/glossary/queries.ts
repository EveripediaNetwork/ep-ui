import { gql } from 'graphql-request'

export const GET_TAGS_BY_ID = gql`
  query TagsById($id: String!) {
    tagsById(id: $id) {
      id
      wikis {
        id
        title
        summary
      }
    }
  }
`

export const GET_POPULAR_TAGS = gql`
  query TagsPopular($startDate: Int!, $endDate: Int!) {
    tagsPopular(startDate: $startDate, endDate: $endDate) {
      id
      wiki {
        id
        title
      }
    }
  }
`
