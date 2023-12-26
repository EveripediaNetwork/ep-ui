import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

const BackArrow = (props: IconProps) => {
  return (
    <Icon viewBox="0 0 22 16" fill="none" {...props}>
      <rect width="22" height="16" rx="4" fill="black" fill-opacity="0.8" />
      <g clip-path="url(#clip0_4404_18611)">
        <path
          d="M7.21883 8.00048L10.5188 11.3005L9.57616 12.2431L5.3335 8.00048L9.57616 3.75781L10.5188 4.70048L7.21883 8.00048Z"
          fill="white"
          fill-opacity="0.8"
        />
      </g>
      <g clip-path="url(#clip1_4404_18611)">
        <path
          d="M13.2188 8.00048L16.5188 11.3005L15.5762 12.2431L11.3335 8.00048L15.5762 3.75781L16.5188 4.70048L13.2188 8.00048Z"
          fill="white"
          fill-opacity="0.8"
        />
      </g>
      <defs>
        <clipPath id="clip0_4404_18611">
          <rect width="16" height="16" fill="white" />
        </clipPath>
        <clipPath id="clip1_4404_18611">
          <rect width="16" height="16" fill="white" transform="translate(6)" />
        </clipPath>
      </defs>
    </Icon>
  )
}

export default BackArrow
