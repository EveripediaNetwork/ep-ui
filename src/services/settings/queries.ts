import { gql } from 'graphql-request'

export const GET_USER_PROFILE = gql`
  query getUserProfile($id: String!) {
    getProfile(id: $id) {
      id
      username
      bio
      email
      banner
      avatar
      links {
        twitter
        website
        instagram
      }
      notifications {
        EVERIPEDIA_NOTIFICATIONS
        WIKI_OF_THE_DAY
        WIKI_OF_THE_MONTH
        EDIT_NOTIFICATIONS
      }
      advancedSettings {
        SIGN_EDITS_WITH_RELAYER
      }
    }
  }
`
export const POST_USER_PROFILE = gql`
  mutation getUserProfile($profileInfo: String!) {
    createProfile(profileInfo: $profileInfo) {
      id
      username
      bio
      email
      banner
      avatar
      links {
        twitter
        website
        instagram
      }
      notifications {
        EVERIPEDIA_NOTIFICATIONS
        WIKI_OF_THE_DAY
        WIKI_OF_THE_MONTH
        EDIT_NOTIFICATIONS
      }
      advancedSettings {
        SIGN_EDITS_WITH_RELAYER
      }
    }
  }
`
