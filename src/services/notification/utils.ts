import { useGetAllWikiSubscriptionQuery } from '.'

export const useIsWikiSubscribed = (
  wikiId: string | undefined,
  userID: string,
) => {
  const { data } = useGetAllWikiSubscriptionQuery(userID)
  return data?.some(sub => sub.auxiliaryId === wikiId)
}
