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
      title
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

export const GET_EVENT_BY_TITLE = gql`
  query GetWikiByTitle($title: String!) {
    wikiEventsByTitle(title: $title) {
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
