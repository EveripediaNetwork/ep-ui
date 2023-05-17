import { ValidatorCodes } from '@everipedia/iq-utils'

export const initialEditorValue = ' '
export const initialMsg =
  'Your Wiki is being processed. It will be available on the blockchain soon.'
export const defaultErrorMessage =
  'Oops, An Error Occurred. Wiki could not be created'
export const successMessage = 'Wiki has been created successfully.'
export const editedMessage = 'Wiki has been updated successfully'
export const ValidationErrorMessage = (type: string) => {
  switch (type) {
    case ValidatorCodes.CATEGORY:
      return 'Category must be a valid category name.'
    case ValidatorCodes.LANGUAGE:
      return 'Language linked to wiki must be a valid language name.'
    case ValidatorCodes.USER:
      return 'Transaction is not signed by the user.'
    case ValidatorCodes.WORDS:
      return 'Wiki must have at least 100 words.'
    case ValidatorCodes.IMAGE:
      return 'Images must be no more than 5 and no less than 1.'
    case ValidatorCodes.TAG:
      return 'Tags must be no more than 5'
    case ValidatorCodes.URL:
      return 'No External URL are allowed.'
    case ValidatorCodes.METADATA:
      return 'Wiki metadata is incorrect. Please check the wiki.'
    case ValidatorCodes.SUMMARY:
      return 'Summary must be no more than 128 characters.'
    case ValidatorCodes.ID_ERROR:
      return 'ID is incorrect. Please check the wiki.'
    case ValidatorCodes.MEDIA:
      return 'Invalid media data. Please check the media attached to wiki.'
    case ValidatorCodes.GLOBAL_RATE_LIMIT:
      return 'You have reached the rate limit. Please try again later'
    default:
      return 'An error occurred.'
  }
}
