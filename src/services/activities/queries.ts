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
        images {
          id
        }
      }
      datetime
      ipfs
    }
  }
`
export const GET_ACTIVITIES_BY_WIKI = gql`
  query GetActivitiesByWiki($id: String!) {
    activitiesByWikId(wikiId: $id) {
      id
      wikiId
      type
      content {
        id
        title
        transactionHash
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
        images {
          id
        }
      }
      datetime
      ipfs
    }
  }
`
