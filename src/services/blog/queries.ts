import { gql } from 'graphql-request'

export const FETCH_PUBLICATIONS = gql`
  query PublicationInfo($publicationAddress: String!) {
    projectFeed(projectAddress: $publicationAddress) {
      displayName
      avatarURL
      domain
      headerImage {
        url
      }
      theme {
        colorMode
        accent
      }
      description
      mailingListURL
      members {
        address
        displayName
        avatarURL
      }
    }
  }
`
