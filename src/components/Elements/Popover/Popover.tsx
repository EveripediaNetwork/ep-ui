import React from 'react'
import {
  Button,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'

interface PopOverButtonProps extends ButtonProps {
  header?: React.ReactNode
  footer?: React.ReactNode
  buttonContents: React.ReactNode
  children: React.ReactNode
}

export const PopoverButton = ({
  header,
  footer,
  buttonContents,
  children,
  ...rest
}: PopOverButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button {...rest} onClick={onOpen}>
          {buttonContents}
        </Button>
      </PopoverTrigger>
      <PopoverContent m={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        {header && <PopoverHeader>{header}</PopoverHeader>}
        <PopoverBody>{children}</PopoverBody>
        {footer && <PopoverFooter>{footer}</PopoverFooter>}
      </PopoverContent>
    </Popover>
  )
}
