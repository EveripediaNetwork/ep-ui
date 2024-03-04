import { gql } from 'graphql-request'

export const GET_EVENTS = gql`
  query GetEvents($offset: Int, $limit: Int) {
    events(offset: $offset, limit: $limit) {
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

export const GET_EVENTS_BY_TAGS = gql`
  query GetEvents($tagIds: [String!], $startDate: String, $endDate: String) {
    events(tagIds: $tagIds, startDate: $startDate, endDate: $endDate) {
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

export const GET_EVENTS_BY_BLOCKCHAIN = gql`
  query GetEventsByBlockchain($blockchain: String) {
    eventsByBlockchain(blockchain: $blockchain) {
      id
      title
      summary
      events {
        type
        date
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
  query GetWikiByTitle($title: String!, $startDate: String) {
    wikiEventsByTitle(title: $title, startDate: $startDate) {
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
