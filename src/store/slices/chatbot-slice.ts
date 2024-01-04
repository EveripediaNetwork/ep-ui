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

export interface CurrentChatState {
  messages: ChatMessage[] | null
  currentHumanMessage: string | null
  currentAIMessage: string | null
  currentChatId: string | null
}

const initialState: CurrentChatState = {
  messages: [],
  currentChatId: null,
  currentHumanMessage: null,
  currentAIMessage: null,
}
const botSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    setCurrentMessage(state, action) {
      state.currentHumanMessage = action.payload
    },
    setCurrentAIMessage(state, action) {
      state.currentAIMessage = action.payload
    },
    addMessage(state, action) {
      state.currentHumanMessage = null
      state.messages?.push(action.payload)
    },
    setMessages(state, action) {
      state.messages = action.payload
    },
    setCurrentChatId(state, action) {
      state.currentChatId = action.payload
    },
  },
})

export const {
  setCurrentMessage,
  setMessages,
  addMessage,
  setCurrentChatId,
  setCurrentAIMessage,
} = botSlice.actions

export default botSlice.reducer
