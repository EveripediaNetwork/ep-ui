export const formatFoundersArray = (founders: string[]) => {
  if (founders.length > 2) {
    return founders.map((founder) => {
      const [firstName, lastName] = founder.split('-')
      return `${firstName
        .charAt(0)
        .toUpperCase()}${firstName.slice(1)} ${lastName[0].toUpperCase()}`
    })
  }

  return founders.map((founder) => {
    const names = founder
      .split('-')
      .map((slug) => slug.charAt(0).toUpperCase() + slug.slice(1))
      .join(' ')
    return `${names}`
  })
}
