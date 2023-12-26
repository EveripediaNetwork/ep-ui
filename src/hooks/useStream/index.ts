import {
  EventSourceMessage,
  fetchEventSource,
} from '@fortaine/fetch-event-source'
import { TGenerateInput, generateOutputSchema } from './schema'
import { useDispatch } from 'react-redux'
import {
  setIsError,
  setIsGenerating,
  setToCloseStream,
} from '@/store/slices/stream-slice'
import { addMessage, setAiMessage } from '@/store/slices/chatbot-slice'
import { z } from 'zod'
import logIntermediateSteps from '@/lib/logIntermediateSteps'
import { randomUUID } from 'crypto'

export const loadingMsgTypes = z.enum([
  'SENDING_REQUEST', // when the request is sent to the server
  'CHOOSING_PLUGIN', // when the agent is choosing the tool
  'QUERYING_PLUGIN', // when the agent is querying the tool
  'FILTERING_PLUGIN_RESPONSE', // when tool is filtering fetched data
])

export interface LoadingMsgType {
  type: z.infer<typeof loadingMsgTypes>
  input?: string
}

enum generateEventsSchema {
  FINAL_OUTPUT = 'Final Output',
  ANSWER_CHUNK = 'Answer Chunk',
  ACTION = 'Action',
}
const useStream = () => {
  // const { isLoading } = useAppSelector(state => state.stream)
  const dispatch = useDispatch()
  // const updateAiMessageRef = useRef()

  const handleMessage = (msg: EventSourceMessage) => {
    switch (msg.event) {
      case generateEventsSchema.ANSWER_CHUNK:
        const newChunk = msg.data
        const parsedChunk = JSON.parse(newChunk) as string[]
        if (!parsedChunk[0] || parsedChunk[0] === '\\') return
        dispatch(setAiMessage(parsedChunk.join('\n\n')))
        dispatch(setIsGenerating(true))
        break

      case generateEventsSchema.FINAL_OUTPUT:
        const {
          intermediateSteps,
          search,
          chat,
          answer,
          answerSources,
          messageId,
        } = generateOutputSchema.parse(JSON.parse(msg.data))
        if (intermediateSteps) logIntermediateSteps(intermediateSteps)

        if (chat) {
          // setCurrentChatId(chat.id)
          // addNewChat({ ...chat, userId: null })
        }
        dispatch(
          addMessage({
            id: String(messageId) || randomUUID(),
            answer: answer ?? 'Sorry, I could not find an answer to that.',
            search,
            answerSources,
          }),
        )
        // setLoadingMsg(null)
        setIsGenerating(false)
        break
    }
  }

  const fetchAnswer = async ({ search }: { search: string }) => {
    dispatch(setIsError(false))
    dispatch(setToCloseStream(false))

    if (!search) return

    const requestObject: TGenerateInput = {
      language: 'en',
      enableStream: true,
      search,
      isChat: true,
    }

    try {
      await fetchEventSource('https://iqgpt.com/api/generate', {
        method: 'POST',
        body: JSON.stringify(requestObject),
        openWhenHidden: true,
        onmessage: async msg => {
          handleMessage(msg)
        },
      })
    } catch (e) {
      console.log(`Could not fetch data. Error: ${e}`)
    }
  }

  return {
    fetchAnswer,
  }
}

export default useStream
