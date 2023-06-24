import { Wiki } from '@everipedia/iq-utils'

export type WikiImageObjectProps = {
  id: string
  type: ArrayBuffer | string | File | Blob
}

export type OverrideExistingWikiDialogType = {
  isOpen: boolean
  onClose: () => void
  publish: () => void
  getSlug: () => Promise<string>
  existingWikiData?: Wiki
}

export type WikiProcessType = {
  isOpen: boolean
  onClose: () => void
  activeStep: number
  state: 'loading' | 'error' | undefined
  wikiHash: string | undefined
  txHash: string | undefined
  msg: string
  wikiId: string
  isNewWiki: boolean
}
