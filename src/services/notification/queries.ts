import { gql } from 'graphql-request'

export const ADD_WIKI_SUBSCRIPTION = gql`
  mutation addWikiSubscription($userId: String!, $notificationType: String!, $auxiliaryId: String!, $email: String!) {
        addWikiSubscription(userId: $userId, notificationType: $notificationType, auxiliaryId: $auxiliaryId, email: $email)
    }
  }
`

export const REMOVE_WIKI_SUBSCRIPTION = gql`
  mutation removeWikiSubscription($userId: String!, $notificationType: String!, $auxiliaryId: String!, $email: String!) {
        removeWikiSubscription(userId: $userId, notificationType: $notificationType, auxiliaryId: $auxiliaryId, email: $email)
    }
  }
`

export const WIKI_SUBSCRIPTIONS = gql`
  query GetWikiSubscriptions($userId: String!) {
    wikiSubscriptions(userId: $userId) {
      auxiliaryId
      notificationType
    }
  }
`
