import { useState, useCallback } from 'react'

interface UseDisclosureOptions {
  defaultIsOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

const useDisclosure = (
  options: UseDisclosureOptions = {},
): UseDisclosureReturn => {
  const {
    defaultIsOpen = false,
    onOpen: externalOnOpen,
    onClose: externalOnClose,
  } = options

  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const onOpen = useCallback(() => {
    setIsOpen(true)
    externalOnOpen?.()
  }, [externalOnOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
    externalOnClose?.()
  }, [externalOnClose])

  const onToggle = useCallback(() => {
    setIsOpen((prevIsOpen) => {
      const newState = !prevIsOpen
      newState ? onOpen() : onClose()
      return newState
    })
  }, [onOpen, onClose])

  return { isOpen, onOpen, onClose, onToggle }
}

export default useDisclosure
