import { configureStore } from '@reduxjs/toolkit'
import {
  appReducer,
  messagesReducer,
  userReducer,
  wikiReducer,
  citeMarksReducer,
  tocReducer,
  blogReducer,
  leaderboardReducer,
  botReducer,
  streamReducer,
} from '@/store/slices'
import { wikiApi } from '@/services/wikis'
import { categoriesApi } from '@/services/categories'
import { glossaryApi } from '@/services/glossary'
import { activitiesApi } from '@/services/activities'
import { navSearchApi } from '@/services/search'
import { rankingAPI } from '@/services/ranking'
import { tokenStatsApi } from '@/services/token-stats'
import { profileApi } from '@/services/profile'
import { adminApi } from '@/services/admin'
import { ArweaveApi } from '@/services/blog'
import { tagsApi } from '@/services/tags'
import { ensApi } from '@/services/ens'
import { MirrorApi } from '@/services/blog/mirror'
import { nftLisitngAPI } from '@/services/nftlisting/index'
import { nftStatsApi } from '@/services/nft-stats'
import { editorApi } from '@/services/editor'
import { notificationSubscriptionApi } from '@/services/notification'
import { eventApi } from '@/services/event'
import { cgTokenDataApi } from '@/services/cgTokenDetails'
import { cmcTokenDataApi } from '@/services/cmcTokenDetails'
import { locationApi } from '@/services/location'

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    wiki: wikiReducer,
    citeMarks: citeMarksReducer,
    toc: tocReducer,
    blog: blogReducer,
    message: botReducer,
    stream: streamReducer,
    leaderboard: leaderboardReducer,
    [ArweaveApi.reducerPath]: ArweaveApi.reducer,
    [rankingAPI.reducerPath]: rankingAPI.reducer,
    [MirrorApi.reducerPath]: MirrorApi.reducer,
    [wikiApi.reducerPath]: wikiApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [glossaryApi.reducerPath]: glossaryApi.reducer,
    [activitiesApi.reducerPath]: activitiesApi.reducer,
    [navSearchApi.reducerPath]: navSearchApi.reducer,
    [tokenStatsApi.reducerPath]: tokenStatsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [ensApi.reducerPath]: ensApi.reducer,
    [nftLisitngAPI.reducerPath]: nftLisitngAPI.reducer,
    [nftStatsApi.reducerPath]: nftStatsApi.reducer,
    [editorApi.reducerPath]: editorApi.reducer,
    [notificationSubscriptionApi.reducerPath]:
      notificationSubscriptionApi.reducer,
    [cgTokenDataApi.reducerPath]: cgTokenDataApi.reducer,
    [cmcTokenDataApi.reducerPath]: cmcTokenDataApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
  },
  middleware: (gDM) =>
    gDM({ serializableCheck: true })
      .concat(MirrorApi.middleware)
      .concat(ArweaveApi.middleware)
      .concat(wikiApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(glossaryApi.middleware)
      .concat(activitiesApi.middleware)
      .concat(navSearchApi.middleware)
      .concat(tokenStatsApi.middleware)
      .concat(adminApi.middleware)
      .concat(profileApi.middleware)
      .concat(tagsApi.middleware)
      .concat(ensApi.middleware)
      .concat(nftLisitngAPI.middleware)
      .concat(nftStatsApi.middleware)
      .concat(editorApi.middleware)
      .concat(notificationSubscriptionApi.middleware)
      .concat(rankingAPI.middleware)
      .concat(eventApi.middleware)
      .concat(cgTokenDataApi.middleware)
      .concat(cmcTokenDataApi.middleware)
      .concat(locationApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
