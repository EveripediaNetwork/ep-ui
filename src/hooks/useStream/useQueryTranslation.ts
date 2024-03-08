import { Wiki } from '@everipedia/iq-utils'
import { useTranslation } from 'next-i18next'

export enum QueryType {
  AdditionalInfo = 'queryAdditionalInfo',
  ContentPageSummary = 'queryContentPageSummary',
  ExplainLikeFive = 'ELI5',
}

const useQueryTranslation = (query: string, wiki: Wiki) => {
  const { t } = useTranslation('wiki')

  switch (query) {
    case t(QueryType.AdditionalInfo):
      return `
        ${t('additionalInfoPrompt')} ${wiki.title}       
      `
    case t(QueryType.ContentPageSummary):
      return `
      ${t('summarizeContentPrompt')} ${wiki.title}
      `
    case QueryType.ExplainLikeFive:
      return `${t('eli5Prompt1')} ${wiki.title} ${t('eli5Prompt2')} ${
        wiki.title
      }, ${t('eli5Prompt3')} ${wiki.title} ${t('eli5Prompt4')}`
    default:
      return query
  }
}

export default useQueryTranslation
