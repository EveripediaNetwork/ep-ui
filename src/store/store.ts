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

export const store = configureStore({
  reducer: {
    app: appReducer,
    messages: messagesReducer,
    user: userReducer,
    wiki: wikiReducer,
    [wikiApi.reducerPath]: wikiApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: gDM =>
    gDM({ serializableCheck: true })
      .concat(wikiApi.middleware)
      .concat(categoriesApi.middleware),
  preloadedState: loadState(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
