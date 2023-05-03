export const formatFoundersArray = (founders: string[]) => {
  if (founders.length > 2) {
    return founders.map((founder) => {
      const names = founder.split('-')
      if (names.length > 1) {
        const [firstName, lastName] = names
        return `${firstName.charAt(0).toUpperCase()}${firstName.slice(
          1,
        )} ${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`
      } else {
        return `${names[0].charAt(0).toUpperCase()}${names[0].slice(1)}`
      }
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
