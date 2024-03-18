import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

const SquareFill = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 14 14" fill="currentColor" {...props}>
      <g clipPath="url(#clip0_28625_11450)">
        <rect x="4" y="5" width="5" height="5" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_28625_11450">
          <rect width="14" height="14" />
        </clipPath>
      </defs>
    </Icon>
  )
}

export default SquareFill
