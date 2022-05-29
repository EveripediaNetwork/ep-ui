import slugify from 'slugify'

export const slugifyText = (text: string) => {
  return slugify(text.toLowerCase(), {
    strict: true,
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  })
}
