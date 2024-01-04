import { Wiki } from '@everipedia/iq-utils'

export enum QueryType {
  AdditionalInfo = 'Generate additional info for this page',
  ContentPageSummary = 'Content/page summary.',
  ExplainLikeFive = 'ELI5',
}

export const queryMapper = (query: string, wiki: Wiki) => {
  let newQuery = ''

  switch (query) {
    case QueryType.AdditionalInfo:
      newQuery = `${wiki.content} 

          Generate an additional information for the content above?        
        `
      break
    case QueryType.ContentPageSummary:
      newQuery = `${wiki.content} 

          Summarize the content above?        
        `
      break
    case QueryType.ExplainLikeFive:
      newQuery = `${wiki.content} 

          Explain the content above to me like I am a 5yr old?        
        `
      break

    default:
      newQuery = query
      break
  }

  return newQuery
}
