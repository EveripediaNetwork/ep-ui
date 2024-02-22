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
      return `
      ${t('explainLikeFivePrompt')} ${wiki.title}
      `
    default:
      return query
  }
}

export default useQueryTranslation
