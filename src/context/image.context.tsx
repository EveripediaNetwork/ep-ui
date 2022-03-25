import { Image } from '@/types/Wiki'
import React, { ReactNode, useState, createContext } from 'react'

export enum ImageKey {
  IMAGE = 'image',
  IPFS_HASH = 'ipfsHash',
  IS_WIKI_BEING_EDITED = 'isWikiBeingEdited',
}

export type ImageStateType = {
  image: Image
  ipfsHash: string
  isWikiBeingEdited: boolean
  updateImageState: (key: ImageKey, value: Image | string | boolean) => void
}

const initialState = {
  image: { type: new ArrayBuffer(0), id: '' },
  ipfsHash: '',
  isWikiBeingEdited: false,
  updateImageState: () => {},
}

export const ImageContext = createContext<ImageStateType>(initialState)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageState, setImageState] = useState<ImageStateType>({
    ...initialState,
    updateImageState: (key: ImageKey, value: Image | string | boolean) =>
      setImageState(prev => ({ ...prev, [key]: value })),
  })

  return (
    <ImageContext.Provider value={imageState}>{children}</ImageContext.Provider>
  )
}
