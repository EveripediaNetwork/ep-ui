import { gql } from 'graphql-request'

export const ADD_WIKI_SUBSCRIPTION = gql`
  mutation addWikiSubscription(
    $userId: String!
    $subscriptionType: String!
    $auxiliaryId: String!
    $email: String!
  ) {
    addWikiSubscription(
      userId: $userId
      subscriptionType: $subscriptionType
      auxiliaryId: $auxiliaryId
    ) {
      id
      auxiliaryId
      subscriptionType
      userId
    }
  }
`

export const REMOVE_WIKI_SUBSCRIPTION = gql`
  mutation removeWikiSubscription(
    $userId: String!
    $subscriptionType: String!
    $auxiliaryId: String!
  ) {
    removeWikiSubscription(
      userId: $userId
      subscriptionType: $subscriptionType
      auxiliaryId: $auxiliaryId
    )
  }
`

export const WIKI_SUBSCRIPTIONS = gql`
  query GetWikiSubscriptions($userId: String!) {
    wikiSubscriptions(userId: $userId) {
      auxiliaryId
      subscriptionType
      wiki {
        id
        title
        summary
        updated
        user {
          id
          profile {
            username
            avatar
          }
        }
        categories {
          id
          title
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
  }
`
