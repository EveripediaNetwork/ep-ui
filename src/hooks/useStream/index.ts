import { generateEventsSchema, generateOutputSchema } from './schema'
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
import {
  EventStreamContentType,
  fetchEventSource,
} from '@fortaine/fetch-event-source'
import { env } from '@/env.mjs'

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
    const ctrl = new AbortController()
    if (!question) return

    if (question === 'Ask me about crypto') {
      dispatch(
        setCurrentAIMessage(
          'I can assist you with any questions about crypto. What would you like to ask?',
        ),
      )
    } else {
      try {
        const requestObject = {
          enableStream: true,
          search: query ? query : question,
          language: 'en',
          isChat: true,
        }
        dispatch(setCurrentMessage(question))
        dispatch(setIsLoading(true))
        dispatch(setIsError(false))
        await fetchEventSource('https://iqgpt.com/api/generate', {
          method: 'POST',
          signal: ctrl.signal,
          headers: {
            'Content-Type': 'application/json',
            'x-auth-key': `${env.NEXT_PUBLIC_BOT_API_KEY}`,
          },
          body: JSON.stringify(requestObject),
          openWhenHidden: true,
          async onopen(response) {
            if (response.status === 500) {
              throw new Error('Something Went Wrong')
            }
            if (
              response.ok &&
              response.headers.get('content-type') === EventStreamContentType
            ) {
              return
            }
          },
          onmessage: (event) => {
            if (event.event === generateEventsSchema.Enum.FINAL_OUTPUT) {
              const { chat, answer, answerSources, messageId } =
                generateOutputSchema.parse(JSON.parse(event.data))

              if (chat && !currentChatId) {
                dispatch(setCurrentChatId(chat.id))
              }

              dispatch(
                addMessage({
                  id: String(messageId) || randomUUID(),
                  answer:
                    answer ?? 'Sorry, I could not find an answer to that.',
                  search: question,
                  answerSources,
                }),
              )
            }
          },
          onclose() {
            ctrl.abort()
          },
          onerror(err) {
            setIsError(true)
            console.log(err)
            throw new Error(err)
          },
        })
      } catch (err) {
        console.log(err)
        dispatch(setIsError(true))
      } finally {
        dispatch(setIsLoading(false))
      }
    }
  }

  return {
    askQuestion,
  }
}

export default useStream
