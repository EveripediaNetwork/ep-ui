export type GetUrlQueriesType = {
  [key: string]: string
}
export const getUrlQueries = (query: GetUrlQueriesType) => {
  let url = '?'
  const queriesArray = Object.keys(query)
  queriesArray.forEach(param => {
    url = `${url + param}=${query[param]}&`
  })
  return url
}
