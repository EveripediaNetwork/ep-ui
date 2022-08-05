import { createSlice } from '@reduxjs/toolkit'

export type Blog = {
  slug: string
  digest: string
  cover_image: string
  contributor: string
  body: string
  image_sizes: number
  title: string
  timestamp?: number
  transaction: string
}

const initialState: Array<Blog> = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      const newState = {
        ...state,
        ...action.payload,
      }

      return newState
    },
  },
})

export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer
