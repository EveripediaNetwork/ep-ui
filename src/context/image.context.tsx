import React, { ReactNode, useState, createContext } from 'react'

export enum ImageKey {
  IMAGE = 'image',
  IPFS_HASH = 'ipfsHash',
  IS_WIKI_BEING_EDITED = 'isWikiBeingEdited',
}

export type ImageStateType = {
  image: ArrayBuffer
  ipfsHash: string
  isWikiBeingEdited: boolean
  updateImageState: (
    key: ImageKey,
    value: ArrayBuffer | string | boolean,
  ) => void
}

const initialState = {
  image: new ArrayBuffer(0),
  ipfsHash: '',
  isWikiBeingEdited: false,
  updateImageState: () => {},
}

export const ImageContext = createContext<ImageStateType>(initialState)

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageState, setImageState] = useState<ImageStateType>({
    ...initialState,
    updateImageState: (
      key: ImageKey,
      value: ArrayBuffer | string | boolean,
    ) => {
      setImageState(prev => ({ ...prev, [key]: value }))
    },
  })

  return (
    <ImageContext.Provider value={imageState}>{children}</ImageContext.Provider>
  )
}
