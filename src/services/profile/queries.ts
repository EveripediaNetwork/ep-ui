import { gql } from 'graphql-request'

export const GET_USER_SETTINGS = gql`
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
        lens
      }
      notifications {
        EVERIPEDIA_NOTIFICATIONS
      }
      wikiSubscriptions {
        id
      }
      advancedSettings {
        SIGN_EDITS_WITH_RELAYER
      }
    }
  }
`
export const GET_USER_PROFILE = gql`
  query getUserProfile($id: String!) {
    getProfile(id: $id) {
      id
      username
      bio
      banner
      avatar
      links {
        twitter
        website
        instagram
        lens
      }
    }
  }
`

export const GET_USER_EMAIL = gql`
  query getUserEmail($id: String!) {
    getProfile(id: $id) {
      email
    }
  }
`
export const POST_USER_SETTINGS = gql`
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
        lens
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

export const GET_USERNAME_TAKEN = gql`
  query getUsernameTaken($username: String!) {
    usernameTaken(username: $username)
  }
`

export const GET_USER_ADDRESS_FROM_USERNAME = gql`
  query getUserAddressFromUsername($username: String!) {
    getProfile(username: $username) {
      id
    }
  }
`

export const GET_USER_AVATAR = gql`
  query getUserAvatar($id: String!) {
    getProfile(id: $id) {
      avatar
    }
  }
`
