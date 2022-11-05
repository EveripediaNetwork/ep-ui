import { gql } from 'graphql-request'

export const GET_GLOSSARY_TAG_WIKIS = gql`
  query tagsById {
    tagsById(id: "glossary") {
      id
      wikis {
        id
        title
        summary
      }
    }
  }
`

export const GET_POPULAR_TAGS = gql`
  query TagsPopular($startDate: Int!, $endDate: Int!) {
    tagsPopular(startDate: $startDate, endDate: $endDate) {
      id
      wiki {
        id
        title
      }
    }
  }
`
