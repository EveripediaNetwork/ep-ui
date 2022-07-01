import { gql } from 'graphql-request'

export const GET_USER_PROFILE = gql`
  query getUserProfile($id: String!) {
    getProfile(id: $id) {
      id
      username
      bio
      email
      banner
      links {
        twitter
        website
        instagram
      }
      notifications {
        EVERIPEDIA_NOTIFICATIONS
        WIKI_OF_THE_DAY
        WIKI_OF_THE_MONTH
      }
      advancedSettings {
        SIGN_EDITS_WITH_RELAYER
      }
    }
  }
`
export const POST_USER_PROFILE = gql`
  query getUserProfile($id: String!) {
    getProfile(id: $id) {
      id
      username
      bio
      email
      banner
      links {
        twitter
        website
        instagram
      }
      notifications {
        EVERIPEDIA_NOTIFICATIONS
        WIKI_OF_THE_DAY
        WIKI_OF_THE_MONTH
      }
      advancedSettings {
        SIGN_EDITS_WITH_RELAYER
      }
    }
  }
`
