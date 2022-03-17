import { gql } from 'graphql-request'

export const GET_WIKIS_BY_TITLE = gql`
  query wikisByTitle($title: String!) {
    wikisByTitle(title: $title) {
      id
      title
      content
      tags {
        id
      }
      images {
        id
      }
    }
  }
`
