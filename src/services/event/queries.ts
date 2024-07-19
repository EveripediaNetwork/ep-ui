import { gql } from 'graphql-request'

export const GET_EVENTS = gql`
  query GetEvents($offset: Int, $limit: Int, $startDate: String) {
    events(
      offset: $offset
      limit: $limit
      startDate: $startDate
      order: DATE
      direction: DESC
    ) {
      id
      title
      summary
      events {
        type
        date
        multiDateStart
        multiDateEnd
      }
      tags {
        id
      }
      linkedWikis {
        speakers
      }
      metadata {
        id
        value
      }
      speakerWikis {
        id
        images {
          id
        }
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
    events(
      tagIds: $tagIds
      startDate: $startDate
      endDate: $endDate
      order: DATE
      direction: DESC
    ) {
      id
      title
      summary
      events {
        type
        date
        multiDateStart
        multiDateEnd
      }
      metadata {
        id
        value
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
  query GetEventsByBlockchain(
    $blockchain: String
    $startDate: String
    $endDate: String
  ) {
    eventsByBlockchain(
      blockchain: $blockchain
      startDate: $startDate
      endDate: $endDate
      order: DATE
      direction: DESC
    ) {
      id
      title
      summary
      events {
        type
        date
        multiDateStart
        multiDateEnd
      }
      linkedWikis {
        speakers
      }
      metadata {
        id
        value
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

export const GET_EVENTS_BY_LOCATION = gql`
  query GetEventsByLocation(
    $country: String
    $continent: String
    $startDate: String
    $endDate: String
  ) {
    eventsByLocation(
      country: $country
      continent: $continent
      startDate: $startDate
      endDate: $endDate
      order: DATE
      direction: DESC
    ) {
      id
      title
      summary
      events {
        type
        date
        multiDateStart
        multiDateEnd
      }
      linkedWikis {
        speakers
      }
      metadata {
        id
        value
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

export const GET_POPULAR_EVENTS = gql`
  query GetPopularEvents($startDate: String) {
    popularEvents(startDate: $startDate, order: DATE, direction: DESC) {
      id
      title
      events {
        type
        date
        multiDateStart
        multiDateEnd
      }
      tags {
        id
      }
      metadata {
        id
        value
      }
      images {
        id
        type
      }
    }
  }
`

export const GET_EVENT_BY_TITLE = gql`
  query GetWikiByTitle($title: String!, $startDate: String, $endDate: String) {
    wikiEventsByTitle(
      title: $title
      startDate: $startDate
      endDate: $endDate
      order: DATE
      direction: DESC
    ) {
      id
      title
      summary
      events {
        type
        date
        multiDateStart
        multiDateEnd
      }
      tags {
        id
      }
      metadata {
        id
        value
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
