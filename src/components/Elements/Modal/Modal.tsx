import React, { ReactNode } from 'react'
import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react'
import Button from '../Button/Button'

type ModalType = ModalProps & {
  title: string
  enableBottomCloseButton: boolean
  SecondaryButton: ReactNode
}

const Modal = ({
  children,
  title,
  onClose,
  enableBottomCloseButton = true,
  SecondaryButton,
  ...rest
}: ModalType) => (
  <ChakraModal onClose={onClose} {...rest}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>

      <ModalFooter gap={5}>
        {enableBottomCloseButton === true && (
          <Button onClick={onClose}>Close</Button>
        )}
        {SecondaryButton}
      </ModalFooter>
    </ModalContent>
  </ChakraModal>
)

export default Modal
