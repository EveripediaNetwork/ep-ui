import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'

interface WikiPreviewHoverProps {
  href: string
  text: string
}

const WikiPreviewHover = ({ href, text }: WikiPreviewHoverProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  React.useEffect(() => {
    console.log(isOpen)
  }, [isOpen])

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      aria-label="Wiki preview"
    >
      <PopoverTrigger>
        <a
          onMouseOver={() => setIsOpen(true)}
          onMouseOut={() => setIsOpen(false)}
          onFocus={() => {}}
          onBlur={() => {}}
          href={href}
        >
          {text}
        </a>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Name Of Wiki</PopoverHeader>
        <PopoverBody>Wiki Summary</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default WikiPreviewHover
