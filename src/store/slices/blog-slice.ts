import { createSlice } from '@reduxjs/toolkit'
import { Blog } from '@/types/Blog'

const initialState: Array<Blog> = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(_, action) {
      const newState = [...action.payload]

      return newState
    },
  },
})

export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer
