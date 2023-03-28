import { SerializedError } from '@reduxjs/toolkit'
import { ClientError } from 'graphql-request'

export const PostUserMessage = (
  postUserError:
    | Pick<ClientError, 'name' | 'message' | 'stack'>
    | SerializedError
    | undefined,
) => {
  let toastTitle = 'Profile Settings Saved'
  let toastMessage =
    'Your profile settings have been saved. Refresh the page to see the changes.'
  let toastType: 'success' | 'error' = 'success'
  if (postUserError) {
    toastTitle = 'Profile Settings Failed'
    toastMessage =
      "We couldn't save your profile settings. Refresh the page and try again."
    toastType = 'error'
  }

  return { toastMessage, toastTitle, toastType }
}
