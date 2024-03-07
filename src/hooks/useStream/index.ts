import { generateOutputSchema } from './schema'
import { useDispatch } from 'react-redux'
import { setIsError, setIsLoading } from '@/store/slices/stream-slice'
import {
  addMessage,
  setCurrentAIMessage,
  setCurrentChatId,
  setCurrentMessage,
} from '@/store/slices/chatbot-slice'
import { randomUUID } from 'crypto'
import { useAppSelector } from '@/store/hook'
import axios from 'axios'

const useStream = () => {
  const dispatch = useDispatch()
  const { currentChatId } = useAppSelector((state) => state.message)

  const askQuestion = async ({
    question,
    query,
  }: {
    question: string
    query?: string
  }) => {
    if (!question) return

    if (question === 'Ask me about crypto') {
      dispatch(
        setCurrentAIMessage(
          'I can assist you with any questions about crypto. What would you like to ask?',
        ),
      )
    } else {
      dispatch(setCurrentMessage(question))
      dispatch(setIsLoading(true))
      dispatch(setIsError(false))

      await axios
        .post('/api/generate', { question: query ? query : question })
        .then((res) => {
          const { search, answer, answerSources, chat, messageId } =
            generateOutputSchema.parse(res.data)
          if (chat && !currentChatId) {
            dispatch(setCurrentChatId(chat.id))
          }

          dispatch(
            addMessage({
              id: String(messageId) || randomUUID(),
              answer: answer ?? 'Sorry, I could not find an answer to that.',
              search: search,
              answerSources,
            }),
          )
        })
        .catch((err) => {
          dispatch(setIsError(true))
          console.log('Error:', err.response?.data)
        })
        .finally(() => {
          dispatch(setIsLoading(false))
        })
    }
  }

  return { askQuestion }
}

export default useStream
