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
  title: '',
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
  media: [],
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
    setContent(state, action) {
      const newState = {
        ...state,
        content: action.payload,
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
    addMedia(state, action) {
      if (state.media) {
        return {
          ...state,
          media: [...state.media, action.payload],
        }
      }
      return state
    },
    removeMedia(state, action) {
      if (state.media) {
        const updatedMedia = state.media.filter(
          media => media.id !== action.payload.id,
        )
        return {
          ...state,
          media: updatedMedia,
        }
      }
      return state
    },
    updateMediaDetails(state, action) {
      if (state.media) {
        const findMediaIndex = state.media.findIndex(
          media => media.id === action.payload.id,
        )
        const updatedMedia = [...state.media]
        updatedMedia[findMediaIndex] = {
          ...updatedMedia[findMediaIndex],
          ...action.payload,
        }
        return {
          ...state,
          media: updatedMedia,
        }
      }
      return state
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
