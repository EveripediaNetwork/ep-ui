const shortenAccount = (
  account: string,
  firstTakeLength = 6,
  secondTakeLength = 4,
) => {
  const firstChunk = account.substring(0, firstTakeLength)
  const secondChunk = account.substring(account.length - secondTakeLength)

  return `${firstChunk}...${secondChunk}`
}

export default shortenAccount
