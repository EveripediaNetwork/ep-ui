import React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

const EmailIconColor = (props: IconProps) => {
  return (
    <Icon
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="currentcolor"
      {...props}
    >
      <path
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="#267CB5"
      />
      <path
        d="M16.0012 18.1L25.5512 9.925C25.4012 9.825 25.2012 9.75 25.0012 9.75H7.00117C6.80117 9.75 6.60117 9.825 6.45117 9.925L16.0012 18.1Z"
        fill="white"
      />
      <path
        d="M16.65 18.8506C16.275 19.1756 15.725 19.1756 15.35 18.8506L6 10.8756V21.2506C6 21.8006 6.45 22.2506 7 22.2506H25C25.55 22.2506 26 21.8006 26 21.2506V10.8506L16.65 18.8506Z"
        fill="white"
      />
    </Icon>
  )
}

export default EmailIconColor
