export const TranformCategoryTitle = (categoryType: string) => {
  let title: string

  switch (categoryType) {
    case 'NFTs':
      title = 'NFT'
      break
    case 'Dapps':
      title = 'Dapp'
      break
    case 'Cryptocurrencies':
      title = 'Cryptocurrency'
      break
    case 'Exchanges':
      title = 'Exchange'
      break
    case 'DAOs':
      title = 'DAO'
      break
    default:
      title = categoryType
  }

  return title
}
