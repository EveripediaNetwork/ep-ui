export const hashToNum = (msg: string): number => {
  let hash = 0
  for (let i = 0; i < msg.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = msg.charCodeAt(i) * 2 + ((hash << 5) - hash)
  }
  if (hash < 0) hash = -hash
  return hash
}
