import { gql } from 'graphql-request'

export const GET_ACTIVITIES = gql`
  query GetActivities($offset: Int, $limit: Int) {
    activities(offset: $offset, limit: $limit) {
      id
      wikiId
      type
      content {
        id
        title
        block
        tags {
          id
        }
        summary
        user {
          id
        }
        categories {
          id
          title
        }
        images{
          id
        }
      }
      datetime
      ipfs
    }
  }
`
