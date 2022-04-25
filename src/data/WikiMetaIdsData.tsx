export enum CommonMetaIds {
  PageType = 'page-type',
  TwitterProfile = 'twitter-profile',
}

export enum EditSpecificMetaIds {
  commitMessage = 'commit-message',
  wordsChanged = 'words-changed',
  percentChanged = 'percent-changed',
  blocksChanged = 'blocks-changed',
}

export const AllMetaDataIds = [
  ...Object.values(EditSpecificMetaIds),
  ...Object.values(EditSpecificMetaIds),
]
