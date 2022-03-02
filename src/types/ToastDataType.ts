import { ToastPositionWithLogical } from '@chakra-ui/toast'
import { CSSProperties, ReactNode } from 'react'

export type ToastDataType = {
  description?: ReactNode
  title?: ReactNode
  status?: 'info' | 'warning' | 'success' | 'error'
  duration?: number | null
  isClosable?: boolean
  position?: ToastPositionWithLogical
  variant?: string
  containerSize?: CSSProperties
}
