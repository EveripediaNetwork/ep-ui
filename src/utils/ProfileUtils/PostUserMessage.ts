export const PostUserMessage = (postUserError: string | undefined) => {
  let toastTitle = 'Profile Settings Saved'
  let toastMessage =
    'Your profile settings have been saved. Refresh the page to see the changes.'
  let toastType: 'success' | 'error' = 'success'
  if (postUserError) {
    toastTitle = 'Profile Settings Failed'
    toastMessage = postUserError
      ? postUserError
      : "We couldn't save your profile settings. Refresh the page and try again."
    toastType = 'error'
  }

  return { toastMessage, toastTitle, toastType }
}
