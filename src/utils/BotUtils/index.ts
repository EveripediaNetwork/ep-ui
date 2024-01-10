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
      newQuery = `
      Generate an additional information for the content below?  

      ${wiki.content}       
        `
      break
    case QueryType.ContentPageSummary:
      newQuery = ` Summarize the content below 

         ${wiki.content}        
        `
      break
    case QueryType.ExplainLikeFive:
      newQuery = `Explain the content below to me like I am a 5yr old?  

            ${wiki.content}     
        `
      break

    default:
      newQuery = query
      break
  }

  return newQuery
}
