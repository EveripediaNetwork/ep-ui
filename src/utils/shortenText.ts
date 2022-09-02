export const shortenText = (text: string, length: number) => {
  return text?.length > length ? `${text.substring(0, length)}...` : text
}

export const shortenMediaText = (name: string) => {
  const nameArray = name.split('.')
  return nameArray[0].length > 6
    ? `${nameArray[0].substring(0, 6)}....${nameArray[1]}`
    : name
}
