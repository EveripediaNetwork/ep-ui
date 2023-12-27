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

class RetriableError extends Error {}
class FatalError extends Error {}

const xAuthKey = 'ecbaacd0-7699-4074-a6c5-510f04ed4c0b'

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

      case generateEventsSchema.ACTION:
        const { input, type } = JSON.parse(msg.data) as LoadingMsgType
        if (input === 'CoingeckoTool') {
          console.log('Loading.QUERYING_COINGECKO')
        } else {
          console.log(`Loading.${type}`)
        }
        // setCurrentTool(input as Tool)
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

    console.log({ requestObject })

    try {
      await fetchEventSource('http://localhost:3000/api/generate', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Cookie: `x-auth-key=${xAuthKey}`,
        },
        body: JSON.stringify(requestObject),
        openWhenHidden: true,
        onmessage: async (msg) => {
          handleMessage(msg)
          // console.log(msg)
          if (msg.event === 'FatalError') {
            throw new FatalError(msg.data)
          }
        },
        onclose: () => {
          // if the server closes the connection unexpectedly, retry:
          throw new RetriableError()
        },
        onerror: (err) => {
          if (err instanceof FatalError) {
            throw err // rethrow to stop the operation
          } else {
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
            throw err
          }
        },
        mode: 'no-cors',
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
