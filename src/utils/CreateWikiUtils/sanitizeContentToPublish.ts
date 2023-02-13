import { EditorContentOverride } from '@everipedia/iq-utils'

export const sanitizeContentToPublish = (content: string) => {
  return content
    .replace(/\n/gm, '  \n')
    .replace(EditorContentOverride, '')
    .replace(/<\/?em>/gm, '*')
    .replace(/<\/?strong>/gm, '**')
    .replace(/<\/?del>/gm, '~~')
    .replace(/<li>/gm, '- ')
    .replace(/<\/li>/gm, '')
    .replace(/<\/?ul>/gm, '')
    .replace(/^(#+\s)(\*\*)(.+)(\*\*)/gm, '$1$3')
}
