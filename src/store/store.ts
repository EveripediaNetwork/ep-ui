import { configureStore } from '@reduxjs/toolkit'
import {
  appReducer,
  messagesReducer,
  userReducer,
  wikiReducer,
  ensReducer,
  citeMarksReducer,
  tocReducer,
} from '@/store/slices'
import { wikiApi } from '@/services/wikis'
import { categoriesApi } from '@/services/categories'
import { activitiesApi } from '@/services/activities'
import { navSearchApi } from '@/services/search'
import { tokenStatsApi } from '@/services/token-stats'
import { profileApi } from '@/services/profile'
import { MirrorApi } from '@/services/blog'

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    wiki: wikiReducer,
    citeMarks: citeMarksReducer,
    toc: tocReducer,
    ens: ensReducer,
    [MirrorApi.reducerPath]: MirrorApi.reducer,
    [wikiApi.reducerPath]: wikiApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [activitiesApi.reducerPath]: activitiesApi.reducer,
    [navSearchApi.reducerPath]: navSearchApi.reducer,
    [tokenStatsApi.reducerPath]: tokenStatsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: gDM =>
    gDM({ serializableCheck: true })
      .concat(MirrorApi.middleware)
      .concat(wikiApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(activitiesApi.middleware)
      .concat(navSearchApi.middleware)
      .concat(tokenStatsApi.middleware)
      .concat(profileApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
