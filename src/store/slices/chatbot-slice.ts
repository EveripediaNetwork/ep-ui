import { createSlice } from '@reduxjs/toolkit'

type AnswerSources = {
  title: string
  url: string | null
  folderId: string | null
}

export type ChatMessage = {
  search: string
  answer: string
  id: string
  answerSources: AnswerSources[]
}

interface CurrentChatState {
  messages: ChatMessage[] | null
  currentAiMessage: string | null
  currentHumanMessage: string | null
}

const initialState: CurrentChatState = {
  messages: [],
  currentAiMessage: null,
  currentHumanMessage: null,
}
const botSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.currentHumanMessage = action.payload
      state.currentAiMessage = null
    },
    addMessage(state, action) {
      state.currentAiMessage = null
      state.currentHumanMessage = null
      state.messages?.push(action.payload)
    },
    setAiMessage(state, action) {
      state.currentAiMessage?.concat(action.payload)
    },
  },
})

export const { setMessage, setAiMessage, addMessage } = botSlice.actions

export default botSlice.reducer
