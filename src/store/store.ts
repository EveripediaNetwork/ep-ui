import { configureStore } from '@reduxjs/toolkit'
import {
  appReducer,
  messagesReducer,
  userReducer,
  wikiReducer,
  citeMarksReducer,
  tocReducer,
  blogReducer,
} from '@/store/slices'
import { wikiApi } from '@/services/wikis'
import { categoriesApi } from '@/services/categories'
import { activitiesApi } from '@/services/activities'
import { navSearchApi } from '@/services/search'
import { tokenStatsApi } from '@/services/token-stats'
import { profileApi } from '@/services/profile'
import { adminApi } from '@/services/admin'
import { ArweaveApi } from '@/services/blog'
import { tagsApi } from '@/services/tags'
import { ensApi } from '@/services/ens'
import { MirrorApi } from '@/services/blog/mirror'

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    wiki: wikiReducer,
    citeMarks: citeMarksReducer,
    toc: tocReducer,
    blog: blogReducer,
    [ArweaveApi.reducerPath]: ArweaveApi.reducer,
    [MirrorApi.reducerPath]: MirrorApi.reducer,
    [wikiApi.reducerPath]: wikiApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [activitiesApi.reducerPath]: activitiesApi.reducer,
    [navSearchApi.reducerPath]: navSearchApi.reducer,
    [tokenStatsApi.reducerPath]: tokenStatsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [ensApi.reducerPath]: ensApi.reducer,
  },
  middleware: gDM =>
    gDM({ serializableCheck: true })
      .concat(MirrorApi.middleware)
      .concat(ArweaveApi.middleware)
      .concat(wikiApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(activitiesApi.middleware)
      .concat(navSearchApi.middleware)
      .concat(tokenStatsApi.middleware)
      .concat(adminApi.middleware)
      .concat(profileApi.middleware)
      .concat(tagsApi.middleware)
      .concat(ensApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
