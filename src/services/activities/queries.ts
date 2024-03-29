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
          profile {
            username
            avatar
          }
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

export const GET_LATEST_ACTIVITY_BY_WIKI = gql`
  query GetLatestActivityByWiki($wikiId: String!) {
    activitiesByWikId(wikiId: $wikiId, limit: 1) {
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
          profile {
            username
            avatar
          }
        }
        categories {
          id
          title
        }
        images {
          id
        }
        metadata {
          id
          value
        }
      }
      datetime
      ipfs
    }
  }
`
export const GET_ACTIVITIES_BY_ID = gql`
  query GetActivitiesById($id: String!) {
    activityById(id: $id) {
      id
      wikiId
      type
      content {
        id
        title
        content
        transactionHash
        block
        tags {
          id
        }
        summary
        created
        updated
        user {
          id
          profile {
            username
            avatar
          }
        }
        categories {
          id
          title
        }
        images {
          id
        }
        metadata {
          id
          value
        }
        author {
          id
          profile {
            username
            avatar
          }
        }
      }
      datetime
      ipfs
    }
  }
`
export const GET_WIKI_BY_ACTIVITY_ID = gql`
  query GetWikiByActivityId($id: String!) {
    activityById(id: $id) {
      content {
        id
        ipfs
        transactionHash
        created
        updated
        title
        summary
        content
        categories {
          id
          title
        }
        tags {
          id
        }
        images {
          id
          type
        }
        media {
          name
          id
          size
          source
        }
        metadata {
          id
          value
        }
        user {
          id
          profile {
            username
            avatar
          }
        }
        author {
          id
          profile {
            username
            avatar
          }
        }
      }
    }
  }
`

export const GET_WIKI_CREATOR_AND_EDITOR_BY_ACTIVITY_ID = gql`
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
          profile {
            username
            avatar
          }
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
