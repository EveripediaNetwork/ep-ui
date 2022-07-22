import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

const TelegramIcon = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 20 20" fill="currentcolor" {...props}>
      <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM6.89 11.17L6.903 11.163L7.773 14.033C7.885 14.344 8.039 14.4 8.226 14.374C8.414 14.349 8.513 14.248 8.636 14.13L9.824 12.982L12.374 14.87C12.84 15.127 13.175 14.994 13.291 14.438L14.948 6.616C15.131 5.888 14.811 5.596 14.246 5.828L4.513 9.588C3.849 9.854 3.853 10.226 4.393 10.391L6.89 11.171V11.17Z" />
    </Icon>
  )
}

export default TelegramIcon
