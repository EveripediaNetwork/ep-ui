import { gql } from 'graphql-request'

export const GET_LATEST_ACTIVITIES = gql`
  query GetLatestActivities {
    wikis {
      id
      title
      content
    }
  }
`
