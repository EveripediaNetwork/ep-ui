import { gql } from 'graphql-request'

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      summary
      events {
        type
        date
      }
      tags {
        id
      }
      linkedWikis {
        speakers
      }
      images {
        id
        type
      }
    }
  }
`

export const GET_POPULAR_EVENTS = gql`
  query GetPopularEvents {
    popularEvents {
      id
      events {
        type
        date
      }
      tags {
        id
      }
      images {
        id
        type
      }
    }
  }
`
