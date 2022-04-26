import { createSlice } from '@reduxjs/toolkit'
import {
  LanguagesISOEnum,
  Wiki,
  MData,
  CommonMetaIds,
  EditSpecificMetaIds,
} from '@/types/Wiki'

const initialState: Wiki = {
  id: '',
  version: 1,
  language: LanguagesISOEnum.EN,
  title: 'Wiki title',
  content: '',
  summary: '',
  categories: [],
  tags: [],
  metadata: [
    ...Object.values(CommonMetaIds).map(mID => {
      let value = ''
      if (mID === CommonMetaIds.PAGE_TYPE) value = 'generic'
      return { id: mID, value }
    }),
    ...Object.values(EditSpecificMetaIds).map(mID => ({ id: mID, value: '' })),
  ],
  user: {
    id: '',
  },
}

const wikiSlice = createSlice({
  name: 'wiki',
  initialState,
  reducers: {
    setCurrentWiki(state, action) {
      const newState = {
        ...state,
        ...action.payload,
      }
      return newState
    },
    updateCategories(state, action) {
      return {
        ...state,
        categories: [action.payload],
      }
    },
    deleteCategories(state) {
      return {
        ...state,
        categories: [],
      }
    },
    addTag(state, action) {
      return {
        ...state,
        tags: [...state.tags, action.payload],
      }
    },
    setTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      }
    },
    updateMetadata(state, action) {
      const ob = action.payload
      return {
        ...state,
        metadata: state.metadata.map((m: MData) =>
          m.id === ob.id ? { ...m, value: ob.value } : m,
        ),
      }
    },
    reset() {
      return initialState
    },
  },
})

export const { setCurrentWiki } = wikiSlice.actions
export default wikiSlice.reducer
