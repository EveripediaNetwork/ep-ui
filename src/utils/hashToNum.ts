export const hashToNum = (msg: string): number => {
  let hash = 0
  for (let i = 0; i < msg.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = msg.charCodeAt(i) * 2 + ((hash << 5) - hash)
  }
  if (hash < 0) hash = -hash
  const hashString: string = hash.toString()
  hash = Number.parseInt(
    hashString.length < 6
      ? hashString.repeat(6).substring(hashString.length - 6, hashString.length)
      : hashString.substring(hashString.length - 6, hashString.length),
    10,
  )
  return hash
}
