import { Wiki } from '@everipedia/iq-utils'

enum QueryType {
  AdditionalInfo = 'Generate additional info for this page',
  ContentPageSummary = 'Content/page summary.',
  ExplainLikeFive = 'ELI5',
}

export const queryMapper = (query: string, wiki: Wiki) => {
  let newQuery = ''

  switch (query) {
    case QueryType.AdditionalInfo:
      newQuery = `Generate additional information for the content delimited by backticks  ${wiki.content}`
      break
    case QueryType.ContentPageSummary:
      newQuery = `Summarize the content delimited by backticks  ${wiki.content}`
      break
    case QueryType.ExplainLikeFive:
      newQuery = `${wiki.content} 
          Explain the content delimited by backticks  ${wiki.content} like I am a 5yr old?        
        `
      break

    default:
      newQuery = query
      break
  }

  return newQuery
}
