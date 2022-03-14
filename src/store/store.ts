import { configureStore } from '@reduxjs/toolkit'
import { wikiApi } from '@/services/wikis'
import {
  appReducer,
  messagesReducer,
  userReducer,
  wikiReducer,
} from '@/store/slices'
import { loadState } from '@/utils/browserStorage'
import { categoriesApi } from '@/services/categories'
import { navSearchApi } from '@/services/nav-search'

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    wiki: wikiReducer,
    [wikiApi.reducerPath]: wikiApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [navSearchApi.reducerPath]: navSearchApi.reducer,
  },
  middleware: gDM =>
    gDM({ serializableCheck: true })
      .concat(wikiApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(navSearchApi.middleware),
  preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
