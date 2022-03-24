import { configureStore } from '@reduxjs/toolkit'
import {
  appReducer,
  messagesReducer,
  providerReducer,
  userReducer,
  wikiReducer,
} from '@/store/slices'
import { loadState } from '@/utils/browserStorage'
import { wikiApi } from '@/services/wikis'
import { categoriesApi } from '@/services/categories'
import { activitiesApi } from '@/services/activities'
import { navSearchApi } from '@/services/nav-search'

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    wiki: wikiReducer,
    providerNetwork: providerReducer,
    [wikiApi.reducerPath]: wikiApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [activitiesApi.reducerPath]: activitiesApi.reducer,
    [navSearchApi.reducerPath]: navSearchApi.reducer,
  },
  middleware: gDM =>
    gDM({ serializableCheck: true })
      .concat(wikiApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(activitiesApi.middleware)
      .concat(navSearchApi.middleware),
  preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
