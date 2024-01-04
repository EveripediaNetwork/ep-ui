import { RefObject, useEffect } from 'react'

export const useScrollToBottom = (
  ref: RefObject<HTMLDivElement>,
  dependencies: any[],
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, dependencies)
}
