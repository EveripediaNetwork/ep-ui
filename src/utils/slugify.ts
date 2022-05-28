import slugify from 'slugify'

export const slugifyText = (string: string) => {
  return slugify(string, {
    strict: true,
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  })
}
