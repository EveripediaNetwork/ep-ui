import { createSlice } from '@reduxjs/toolkit'
import { LanguagesISOEnum, Wiki, MData } from '@/types/Wiki'

const initialState: Wiki = {
  id: '',
  version: 1,
  language: LanguagesISOEnum.EN,
  title: 'Wiki title',
  content: '',
  categories: [],
  tags: [{ id: 'hello' }, { id: 'world' }],
  metadata: [
    {
      id: 'page-type',
      value: 'Place / Location',
    },
  ],
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
      console.log(action.payload)
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
    updateMetadata(state, action) {
      const ob = action.payload
      return {
        ...state,
        metadata: state.metadata.map((m: MData) =>
          m.id === ob.id ? { ...m, value: ob.value } : m,
        ),
      }
    },
  },
})

export const { setCurrentWiki } = wikiSlice.actions
export default wikiSlice.reducer
