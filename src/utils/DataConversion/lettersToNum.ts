export const lettersToNum = (str: string): number => {
  let out = 0
  const len = str.length
  for (let pos = 0; pos < len; pos += 1) {
    out += (str.charCodeAt(pos) - 64) * 26 ** (len - pos - 1)
  }
  return out
}
