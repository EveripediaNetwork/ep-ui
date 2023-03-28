export const getFounderName = (text: string) => {
  const names = text
    .split('-')
    .map(slug => slug.charAt(0).toUpperCase() + slug.slice(1))
    .join(' ')
  return `${names}`
}
