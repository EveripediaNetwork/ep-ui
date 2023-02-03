import slugify from 'slugify'

export const lettersToNum = (str: string): number => {
  let out = 0
  const len = str.length
  for (let pos = 0; pos < len; pos += 1) {
    out += (str.charCodeAt(pos) - 64) * 26 ** (len - pos - 1)
  }
  return out
}

export const shortenAccount = (
  account: string,
  firstTakeLength = 6,
  secondTakeLength = 4,
) => {
  const firstChunk = account.substring(0, firstTakeLength)
  const secondChunk = account.substring(account.length - secondTakeLength)

  return `${firstChunk}...${secondChunk}`
}

export const shortenBalance = (balance: number | null) =>
  typeof balance === 'number' ? balance.toFixed(2) : balance

export const shortenText = (text: string, length: number) => {
  return text?.length > length ? `${text.substring(0, length)}...` : text
}

export const shortenMediaText = (name: string) => {
  const nameArray = name.split('.')
  return nameArray[0].length > 6
    ? `${nameArray[0].substring(0, 6)}....${nameArray[1]}`
    : name
}

export const slugifyText = (text: string) => {
  return slugify(text.toLowerCase(), {
    strict: true,
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  })
}
