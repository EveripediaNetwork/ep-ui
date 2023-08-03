export type BrandingAssetsType = {
  bg: { bg: string; download: string }
  updateSelectedAsset: () => void
  currentlyViewed: string
  dark?: string
  isBraindoa?: boolean
}

export type BrandingAssetBtnType = {
  text: string
  href: string
  closeDownloadOptions: () => void
}
