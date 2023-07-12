import React from 'react'
import { Icon, IconProps, useColorModeValue } from '@chakra-ui/react'

const CopyIcon = (props: IconProps) => {
  const fill = useColorModeValue('#4A5568', 'whiteAlpha.700')
  const opacity = useColorModeValue('1', '0.64')
  return (
    <Icon viewBox="0 0 18 18" fill={fill} {...props}>
      <path
        d="M12 9.675V12.825C12 15.45 10.95 16.5 8.325 16.5H5.175C2.55 16.5 1.5 15.45 1.5 12.825V9.675C1.5 7.05 2.55 6 5.175 6H8.325C10.95 6 12 7.05 12 9.675Z"
        fill-opacity={opacity}
        fill={fill}
      />
      <path
        d="M12.8251 1.5H9.67507C7.36276 1.5 6.2783 2.32057 6.05237 4.30426C6.00511 4.71926 6.34881 5.0625 6.7665 5.0625H8.32507C11.4751 5.0625 12.9376 6.525 12.9376 9.675V11.2336C12.9376 11.6513 13.2808 11.995 13.6958 11.9477C15.6795 11.7218 16.5001 10.6373 16.5001 8.325V5.175C16.5001 2.55 15.4501 1.5 12.8251 1.5Z"
        fill-opacity={opacity}
        fill={fill}
      />
    </Icon>
  )
}

export default CopyIcon
