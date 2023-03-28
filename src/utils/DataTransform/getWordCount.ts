export const getWordCount = (str: string) =>
  str.split(' ').filter(n => n !== '').length
