import { gql } from 'graphql-request'

export const GET_EVENTS = gql`
  query GetEvents($offset: Int, $limit: Int, $ids: [String!]) {
    events(offset: $offset, limit: $limit, ids: $ids) {
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
  query GetEvents($blockchain: String) {
    eventsByBlockchain(blockchain: $blockchain) {
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

export const GET_EVENT_BY_CATEGORY_ID = gql`
  query GetWikiByCategoryId($categoryId: String) {
    wikiEventsByCategory(categoryId: $categoryId) {
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
