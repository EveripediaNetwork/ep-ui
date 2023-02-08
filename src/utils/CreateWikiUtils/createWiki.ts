import { createContext } from '@chakra-ui/react-utils'
import { useCreateWikiState } from '@/hooks/useCreateWikiState'

export const MINIMUM_WORDS = 100

export const [CreateWikiProvider, useCreateWikiContext] =
  createContext<ReturnType<typeof useCreateWikiState>>()
